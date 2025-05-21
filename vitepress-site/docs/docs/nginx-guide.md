# Nginx配置指南

## 目录
- [Nginx简介](#nginx简介)
- [安装Nginx](#安装nginx)
- [基本配置](#基本配置)
- [常用配置场景](#常用配置场景)
- [性能优化](#性能优化)

## Nginx简介

Nginx是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP代理服务器。它具有以下特点：

1. 高性能
   - 采用事件驱动架构
   - 支持高并发连接
   - 内存占用少

2. 主要功能
   - 静态文件服务
   - 反向代理
   - 负载均衡
   - HTTP缓存
   - SSL终端

## 安装Nginx

### Ubuntu/Debian系统
```bash
# 安装Nginx
sudo apt update
sudo apt install nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

### CentOS/RHEL系统
```bash
# 安装Nginx
sudo yum install epel-release
sudo yum install nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

## 基本配置

### 1. 配置文件结构
```bash
/etc/nginx/
├── nginx.conf          # 主配置文件
├── conf.d/             # 子配置文件目录
├── sites-available/    # 可用站点配置
└── sites-enabled/      # 已启用站点配置
```

### 2. 主配置文件示例
```nginx
# /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    multi_accept on;
}

http {
    # 基本设置
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # MIME类型
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志设置
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # 包含其他配置
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 3. 虚拟主机配置示例
```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
    }
}
```

## 常用配置场景

### 1. 反向代理配置
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. 负载均衡配置
```nginx
upstream backend {
    server backend1.example.com:8080;
    server backend2.example.com:8080;
    server backend3.example.com:8080;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend;
    }
}
```

### 3. SSL配置
```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### 4. 静态文件服务
```nginx
server {
    listen 80;
    server_name static.example.com;
    root /var/www/static;

    location / {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }
}
```

## 性能优化

### 1. 基本优化
```nginx
# 在http块中添加
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
gzip_comp_level 6;

# 缓存设置
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```

### 2. 安全配置
```nginx
# 在server块中添加
# 隐藏版本号
server_tokens off;

# 防止点击劫持
add_header X-Frame-Options "SAMEORIGIN";

# XSS保护
add_header X-XSS-Protection "1; mode=block";

# 内容安全策略
add_header Content-Security-Policy "default-src 'self';";
```

### 3. 访问控制
```nginx
# 在location块中添加
location /admin {
    allow 192.168.1.0/24;
    deny all;
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

## 常用命令

```bash
# 测试配置文件
sudo nginx -t

# 重新加载配置
sudo nginx -s reload

# 停止Nginx
sudo nginx -s stop

# 查看Nginx版本
nginx -v

# 查看编译参数
nginx -V
```

## 故障排查

1. 检查错误日志
```bash
sudo tail -f /var/log/nginx/error.log
```

2. 检查访问日志
```bash
sudo tail -f /var/log/nginx/access.log
```

3. 检查配置文件语法
```bash
sudo nginx -t
```

4. 检查端口占用
```bash
sudo netstat -tulpn | grep nginx
``` 