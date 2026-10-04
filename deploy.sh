#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
cd "$project_dir"

check_only=false
if [[ "${1:-}" == '--check' ]]; then
  check_only=true
  shift
elif [[ "${1:-}" == '--help' || "${1:-}" == '-h' ]]; then
  printf '%s\n' '用法：./deploy.sh [提交说明]' '      ./deploy.sh --check' '发布会提交所有未被 .gitignore 忽略的改动，并推送源码 source 和网站 main。' '--check 仅安装依赖、构建和检查，不提交、不推送。'
  exit 0
fi
if [[ $# -gt 1 || ( "$check_only" == true && $# -ne 0 ) || "${1:-}" == --* ]]; then
  printf '%s\n' '参数不正确，请运行 ./deploy.sh --help。' >&2
  exit 1
fi
commit_message="${1:-Update blog: $(date '+%Y-%m-%d %H:%M:%S')}"

for command_name in git node npm; do
  command -v "$command_name" >/dev/null || { printf '缺少命令：%s\n' "$command_name" >&2; exit 1; }
done
if [[ "$(git rev-parse --show-toplevel)" != "$project_dir" || "$(git branch --show-current)" != source ]]; then
  printf '%s\n' '请在本项目的 source 分支上执行发布。' >&2
  exit 1
fi
for operation in MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD rebase-merge rebase-apply; do
  if [[ -e "$(git rev-parse --git-path "$operation")" ]]; then
    printf '%s\n' '存在尚未完成的 Git 合并、变基或其他操作，请先处理后再发布。' >&2
    exit 1
  fi
done
if [[ -n "$(git ls-files -u)" ]]; then
  printf '%s\n' '存在未解决的合并冲突，请先处理后再发布。' >&2
  exit 1
fi

printf '%s\n' '安装依赖并构建中英文网站……'
npm ci
npm run build
for page in build/index.html build/en/index.html build/404.html; do
  [[ -s "$page" ]] || { printf '构建缺少必要页面：%s\n' "$page" >&2; exit 1; }
done
if [[ "$check_only" == true ]]; then
  printf '%s\n' '检查通过。未创建提交，未推送或发布。' '待提交改动：'
  git status --short
  exit 0
fi

remote_url="$(git remote get-url --push origin)"
author_name="$(git config user.name || true)"
author_email="$(git config user.email || true)"
[[ -n "$author_name" && -n "$author_email" ]] || { printf '%s\n' '请先配置 Git 的 user.name 和 user.email。' >&2; exit 1; }

git fetch --quiet "$remote_url" source
if ! git merge-base --is-ancestor FETCH_HEAD HEAD; then
  printf '%s\n' '远端 source 有本地未包含的提交。请先同步并处理冲突，再重新发布；脚本不会强制覆盖。' >&2
  exit 1
fi

deploy_dir="$(mktemp -d "${TMPDIR:-/tmp}/mu-blog-deploy.XXXXXX")"
cleanup() {
  node -e 'require("node:fs").rmSync(process.argv[1], {recursive: true, force: true})' "$deploy_dir"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

printf '%s\n' '准备独立的网站发布目录……'
git clone --quiet --single-branch --branch main "$remote_url" "$deploy_dir"
git -C "$deploy_dir" config user.name "$author_name"
git -C "$deploy_dir" config user.email "$author_email"
git -C "$deploy_dir" rm -r --quiet --ignore-unmatch .
cp -R "$project_dir/build/." "$deploy_dir/"
touch "$deploy_dir/.nojekyll"

printf '%s\n' '提交网站源码……'
git add --all
if ! git diff --cached --quiet; then
  git commit -m "$commit_message"
fi
source_commit="$(git rev-parse HEAD)"

git -C "$deploy_dir" add --all
if ! git -C "$deploy_dir" diff --cached --quiet; then
  git -C "$deploy_dir" commit -m "Publish site from $source_commit"
fi
# 取回发布提交，一次性推送两个分支，并更新本地远端跟踪引用。
deploy_commit="$(git -C "$deploy_dir" rev-parse HEAD)"
git fetch --quiet "$deploy_dir" main
printf '%s\n' '推送源码 source 和网站 main……'
git push --atomic origin "$source_commit:refs/heads/source" "$deploy_commit:refs/heads/main"
printf '%s\n' '两个分支已推送成功。等待 GitHub Pages 完成上线：https://gnehsizum.github.io/' '发布源应设置为 Deploy from a branch → main → /(root)。'
