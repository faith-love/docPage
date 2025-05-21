# Linux服务器部署指南

## 目录
- [基础环境准备](#基础环境准备)
- [应用部署方式](#应用部署方式)
- [容器化部署](#容器化部署)
- [自动化部署](#自动化部署)
- [监控与维护](#监控与维护)

## 基础环境准备

### 1. 系统更新
```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
sudo yum update -y  # CentOS/RHEL
```

### 2. 安装基础工具
```bash
# 安装常用工具
sudo apt install -y vim curl wget git net-tools  # Ubuntu/Debian
sudo yum install -y vim curl wget git net-tools  # CentOS/RHEL
```

### 3. 配置防火墙
```bash
# Ubuntu/Debian (UFW)
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# CentOS/RHEL (Firewalld)
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 应用部署方式

### 1. 传统部署

#### Node.js应用部署
```bash
# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2进程管理器
sudo npm install -g pm2

# 部署应用
cd /path/to/your/app
npm install
pm2 start app.js --name "myapp"
pm2 save
pm2 startup
```

#### Java应用部署
```bash
# 安装JDK
sudo apt install openjdk-11-jdk  # Ubuntu/Debian
sudo yum install java-11-openjdk  # CentOS/RHEL

# 部署Spring Boot应用
java -jar your-application.jar

# 使用systemd管理服务
sudo vim /etc/systemd/system/myapp.service

[Unit]
Description=My Java Application
After=network.target

[Service]
User=myapp
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/java -jar your-application.jar
SuccessExitStatus=143
Restart=always

[Install]
WantedBy=multi-user.target

# 启动服务
sudo systemctl enable myapp
sudo systemctl start myapp
```

### 2. 数据库部署

#### MySQL部署
```bash
# 安装MySQL
sudo apt install mysql-server  # Ubuntu/Debian
sudo yum install mysql-server  # CentOS/RHEL

# 配置MySQL
sudo mysql_secure_installation

# 启动服务
sudo systemctl enable mysql
sudo systemctl start mysql
```

#### MongoDB部署
```bash
# 添加MongoDB源
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# 安装MongoDB
sudo apt update
sudo apt install -y mongodb-org

# 启动服务
sudo systemctl enable mongod
sudo systemctl start mongod
```

## 容器化部署

### 1. Docker部署

#### 安装Docker
```bash
# 安装Docker
curl -fsSL https://get.docker.com | sh

# 启动Docker服务
sudo systemctl enable docker
sudo systemctl start docker

# 添加用户到docker组
sudo usermod -aG docker $USER
```

#### 使用Docker Compose
```bash
# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 创建docker-compose.yml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  app:
    image: node:16
    working_dir: /app
    volumes:
      - ./app:/app
    command: npm start
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: your_database
```

### 2. Kubernetes部署

#### 安装Kubernetes
```bash
# 安装kubeadm
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
```

## 自动化部署

### 1. 使用CI/CD工具

#### Jenkins部署
```bash
# 安装Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins

# 启动Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 2. 使用Ansible自动化部署
```bash
# 安装Ansible
sudo apt install ansible  # Ubuntu/Debian
sudo yum install ansible  # CentOS/RHEL

# 创建inventory文件
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[databases]
db1 ansible_host=192.168.1.20
```

## 监控与维护

### 1. 系统监控
```bash
# 安装Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.30.0/prometheus-2.30.0.linux-amd64.tar.gz
tar xvfz prometheus-*.tar.gz
cd prometheus-*

# 安装Grafana
wget https://dl.grafana.com/oss/release/grafana_8.2.0_amd64.deb
sudo dpkg -i grafana_8.2.0_amd64.deb
```

### 2. 日志管理
```bash
# 安装ELK Stack
# Elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.14.0-amd64.deb
sudo dpkg -i elasticsearch-7.14.0-amd64.deb

# Logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-7.14.0-amd64.deb
sudo dpkg -i logstash-7.14.0-amd64.deb

# Kibana
wget https://artifacts.elastic.co/downloads/kibana/kibana-7.14.0-amd64.deb
sudo dpkg -i kibana-7.14.0-amd64.deb
```

## 最佳实践建议

1. 安全性
   - 定期更新系统和软件包
   - 使用防火墙限制访问
   - 配置SSH密钥认证
   - 禁用root远程登录

2. 备份策略
   - 定期备份重要数据
   - 使用自动化备份工具
   - 测试备份恢复流程

3. 性能优化
   - 监控系统资源使用
   - 优化应用配置
   - 使用缓存机制
   - 配置负载均衡

4. 故障恢复
   - 制定灾难恢复计划
   - 定期测试恢复流程
   - 保持文档更新
   - 建立监控告警机制 