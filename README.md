# Mu Blog

基于 Docusaurus 3 的个人博客与学习笔记。Node.js 20 或更高版本。

## 本地查看

在本项目目录执行：

```bash
npm ci
npm start
```

开发预览地址：http://127.0.0.1:3000 。默认只监听本机。

查看正式构建的本地效果（包括旧链接跳转）：

```bash
npm run build
npm run serve -- --port 3000
```

中文页面位于 `/`，英文界面位于 `/en/`。顶栏语言按钮会保留当前页面路径、查询参数和锚点；手机端位于菜单顶部、主题按钮左侧。博客和笔记正文共用原文，界面译文位于 `i18n/en/`。
开发时 `npm start` 仅启动中文，`npm start -- --locale en` 仅启动英文；如需在两种语言之间切换，请使用上面的正式构建预览命令。

开发预览和正式构建预览不能同时占用同一端口。

## 发布到 GitHub Pages

`deploy.sh` 沿用本仓库的分支结构：`source` 保存源码，`main` 保存构建后的静态网站。脚本在本地构建，不需要新增 GitHub Actions 构建工作流。

首次使用时，在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中，将 Source 设置为 **Deploy from a branch**，选择 **main / (root)**，点击 Save。如果此前选了 GitHub Actions，需要改为此设置；仓库里若另有旧的发布工作流，应先停用，避免重复部署。

本机需安装 Node.js 20 或更高版本、npm、Git，并配置好 Git 的 `user.name` / `user.email`。当前 `origin` 使用 SSH，需能通过本机的 SSH Key 向该仓库推送。脚本不保存密码或 Token。

在项目目录执行：

```bash
./deploy.sh
```

也可以指定本次源码提交说明：

```bash
./deploy.sh "更新博客和关于页面"
```

等价的 npm 命令：

```bash
npm run deploy
npm run deploy -- "更新博客和关于页面"
```

仅验证、不发布：

```bash
./deploy.sh --check
```

脚本会先执行 `npm ci` 和 `npm run build`，构建全部语言并检查关键页面。正式发布时会提交所有未被 `.gitignore` 忽略的新增、修改和删除（包含已有暂存内容）；`node_modules/`、`build/`、`.docusaurus/` 不会进入源码分支。运行前可用 `git status --short` 查看将要提交的改动。

静态网站在临时克隆中准备，保留远端 `main` 的提交历史，自动加入 `.nojekyll`；不会切换当前工作分支，也不会使用本地 `main` 的未推送提交。源码和网站通过一次原子推送更新，任一分支推送被拒绝时，两者都不更新。无改动时跳过空提交。

若构建失败或远端 `source` 有本地未包含的提交，脚本会停止；先解决问题后重新运行。推送失败时本地可能已经生成提交，修复权限或网络问题后可直接重试。脚本不会自动合并或强制覆盖远端。

推送成功后，等待 GitHub Pages 完成上线，在仓库 Actions 页面查看状态，访问 https://gnehsizum.github.io/ 。`--check` 只安装依赖并构建，不创建提交、不推送、不发布。


## 内容目录

- `blog/`：博客文章，保留原发布时间和标签。
- `docs/`：学习笔记，访问路径为 `/note/`，章节由侧边栏自动组织。
- `src/pages/`：首页与 About 页面。
- `src/data/about.json`：个人资料、技能、友链和照片墙。
- `static/images/`：本地头像。
- `src/css/custom.css`：样式与本地 KaTeX 样式导入。
- `redirects.json`：旧 Hexo 地址到新页面的映射，仅在正式构建中生效。

公式使用 remark-math 与 KaTeX，在构建时渲染，字体随站点打包。
第3讲中原先单行的块公式改为独立的 `$$` 起止行，公式内容保持不变。
友链头像和照片墙保留原 OSS 地址，查看这些图片仍需要联网。

## 迁移与生成文件

旧 Hexo 源目录、主题、模板、配置、缓存和部署产物已清理。后续文章与笔记请编辑 `blog/`、`docs/`，个人资料请编辑 `src/data/about.json`。
旧文章包含的 Hexo 命令属于历史正文，不是当前项目的使用说明。

- `node_modules/`：当前项目依赖，由 `npm ci` 安装。
- `.docusaurus/`：Docusaurus 自动生成的路由和缓存。
- `build/`：正式构建产物，本地 `npm run serve` 预览使用该目录。

迁移将旧文章、标签及归档入口加入客户端跳转。其中旧日期归档统一跳转到博客归档；学习笔记单独在 `/note/` 浏览。
