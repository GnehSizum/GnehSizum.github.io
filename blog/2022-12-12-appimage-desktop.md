---
title: 关于我想在侧边栏打开 AppImage 这件事
description: '为 AppImage 配置执行权限和 Desktop 文件，将应用添加到 Ubuntu 启动器。'
date: 2022-12-12T10:00:00+08:00
authors:
  - gnehsizum
tags:
  - Ubuntu
slug: 2022/12/12/appimage-desktop
---

其实很简单，也写过很多遍了，但突然就想放到这里来充数:D

<!-- truncate -->

以 groot2 为例。

## 1. 赋予 AppImage 执行权限

```bash
chmod +x groot2-x86_64.AppImage
```

## 2. 创建 Desktop 文件

```bash
cd /usr/share/applications
sudo gedit groot2.desktop
```

写入：

```
[Desktop Entry]
Name=groot2
Exec=/home/mumu/groot2-x86_64.AppImage
Icon=/home/mumu/Pictures/icon/groot2.png
Type=Application
StartupNotify=true
```

icon 没有的话可以不填，删去这一行。

修改权限：

```bash
sudo chmod a+x groot2.desktop
```

好了，完事儿。
