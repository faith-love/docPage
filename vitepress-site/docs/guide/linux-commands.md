# Linux命令指南

## 目录
- [基本命令](#基本命令)
- [文件操作](#文件操作)
- [系统信息](#系统信息)
- [进程管理](#进程管理)
- [网络操作](#网络操作)
- [用户管理](#用户管理)

## 基本命令

### 1. 目录操作
```bash
# 查看当前目录
pwd

# 切换目录
cd /path/to/directory
cd ..  # 返回上级目录
cd ~   # 返回家目录

# 列出目录内容
ls
ls -l  # 详细信息
ls -a  # 显示隐藏文件
ls -h  # 人类可读的文件大小
```

### 2. 文件操作
```bash
# 创建文件
touch filename

# 创建目录
mkdir directory_name
mkdir -p parent/child  # 创建多级目录

# 复制文件/目录
cp source destination
cp -r source_dir destination_dir  # 复制目录

# 移动/重命名
mv source destination

# 删除
rm filename
rm -r directory  # 删除目录
rm -f filename   # 强制删除
```

## 文件操作

### 1. 文件查看
```bash
# 查看文件内容
cat filename
less filename
more filename

# 查看文件头部/尾部
head filename
tail filename
tail -f filename  # 实时查看文件更新
```

### 2. 文件编辑
```bash
# 使用vim编辑
vim filename

# 基本vim命令
i     # 进入插入模式
ESC   # 退出插入模式
:w    # 保存
:q    # 退出
:wq   # 保存并退出
:q!   # 强制退出不保存
```

## 系统信息

### 1. 系统状态
```bash
# 系统信息
uname -a
cat /etc/os-release

# 内存使用
free -h

# 磁盘使用
df -h
du -sh directory  # 查看目录大小

# CPU信息
top
htop  # 需要安装
```

### 2. 系统监控
```bash
# 进程状态
ps aux
ps -ef

# 系统负载
uptime
```

## 进程管理

### 1. 进程控制
```bash
# 启动进程
command &

# 查看进程
ps aux | grep process_name

# 终止进程
kill pid
kill -9 pid  # 强制终止

# 后台任务
jobs
fg %n  # 将后台任务调到前台
bg %n  # 将任务放到后台运行
```

### 2. 服务管理
```bash
# systemd服务管理
systemctl start service_name
systemctl stop service_name
systemctl restart service_name
systemctl status service_name
systemctl enable service_name
systemctl disable service_name
```

## 网络操作

### 1. 网络配置
```bash
# 查看网络接口
ifconfig
ip addr

# 网络连接
ping host
traceroute host
netstat -tulpn
```

### 2. 网络工具
```bash
# 下载文件
wget url
curl url

# SSH连接
ssh user@host
scp file user@host:path
```

## 用户管理

### 1. 用户操作
```bash
# 创建用户
useradd username
passwd username

# 删除用户
userdel username
userdel -r username  # 同时删除家目录

# 切换用户
su username
sudo command  # 以root权限执行命令
```

### 2. 权限管理
```bash
# 修改权限
chmod 755 filename
chmod u+x filename

# 修改所有者
chown user:group filename
chown -R user:group directory  # 递归修改
```

## 实用技巧

### 1. 管道和重定向
```bash
# 管道
command1 | command2

# 重定向
command > file    # 输出重定向
command >> file   # 追加输出
command < file    # 输入重定向
```

### 2. 通配符
```bash
*    # 匹配任意字符
?    # 匹配单个字符
[]   # 匹配字符集
```

### 3. 历史命令
```bash
history
!n    # 执行历史命令
!!    # 执行上一条命令
```

## 系统维护

### 1. 包管理
```bash
# Debian/Ubuntu
apt update
apt upgrade
apt install package
apt remove package

# CentOS/RHEL
yum update
yum install package
yum remove package
```

### 2. 日志查看
```bash
# 系统日志
tail -f /var/log/syslog
journalctl

# 应用日志
tail -f /var/log/application.log
``` 