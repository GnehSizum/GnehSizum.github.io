---
title: 联想小新 Pro 14 在 Ubuntu 中键盘失效的问题修复
date: 2023-01-09 10:00:00
tags: [Ubuntu]
---

> 特别鸣谢 cyy 学姐与 mj 学长的帮助。

本文方法可能同样适用于 yoga 14s。

## 方法1：买个键盘外接使用

在实际解决这个问题之前 我一直是用这个办法_(:з」∠)_

## 方法2：更新内核

一般情况下，更新内核可解决大部分问题。具体方法可自行上网查找教程，这里给出我的：

检查内核版本：

```bash
uname -rs
```

下载 ubuntu-mainline-kernel 脚本：

```bash
wget https://raw.githubusercontent.com/pimlie/ubuntu-mainline-kernel.sh/master/ubuntu-mainline-kernel.sh
```

将脚本放在可执行路径中：

```bash
sudo install ubuntu-mainline-kernel.sh /usr/local/bin/
```

检查最新的可用内核版本：

```bash
ubuntu-mainline-kernel.sh -c
```

获得最新版本并确认这就是你想要安装在系统上的版本后，运行：

```bash
sudo ubuntu-mainline-kernel.sh -i
```

最后重启系统，并检查内核版本：

```bash
uname -rs
```

## 方法3：修改 grub

方法2对我无效，最终通过方法3解决问题。

```bash
sudo gedit /etc/default/grub
```

将文件中的 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"` 修改为 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash i8042.dumbkbd"` 。

保存关闭后：

```bash
sudo update-grub
```

最后重启系统，键盘就可以使用了。