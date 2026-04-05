---
title: 在 Ubuntu 安装 Qv2ray
date: 2023-02-04 10:00:00
tags: [Ubuntu]
---

## 1. 下载 Qv2ray.AppImage

下载地址：[https://github.com/Qv2ray/Qv2ray/releases/tag/v2.7.0](https://github.com/Qv2ray/Qv2ray/releases/tag/v2.7.0)

## 2. 下载 v2ray-core

下载地址：[https://github.com/v2fly/v2ray-core/releases](https://github.com/v2fly/v2ray-core/releases)

下载 v4.45.2 版本并解压。

## 3. 配置 Qv2ray

- 给 Qv2ray.AppImage 添加执行权限
- 打开 Qv2ray.AppImage - 首选项 - 内核设置
- “V2Ray核心可执行文件路径”填写刚刚解压的目录中 v2ray 的路径
- “V2Ray资源目录”填写刚刚解压的目录的路径
- 点击“检查V2Ray核心设置”，配置检查通过即可使用了

## 4. 或许你想

根据 [“关于我想在侧边栏打开AppImage这件事”](https://gnehsizum.github.io/2022/12/12/blog/20221212_appimage_desktop/) 创建 Desktop 文件后打开就方便多了。