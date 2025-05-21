# 数据库连接指南

本文档提供了各种数据库的连接方法和最佳实践。

## MySQL 连接

### 基本连接

```bash
mysql -h hostname -u username -p
```

### 连接参数说明

- `-h`: 主机名或IP地址
- `-u`: 用户名
- `-p`: 密码（交互式输入）

### 常用连接选项

```bash
# 指定端口
mysql -h hostname -P 3306 -u username -p

# 指定数据库
mysql -h hostname -u username -p database_name

# 使用配置文件
mysql --defaults-file=/path/to/config.cnf
```

## PostgreSQL 连接

### 基本连接

```bash
psql -h hostname -U username -d database_name
```

### 连接参数说明

- `-h`: 主机名或IP地址
- `-U`: 用户名
- `-d`: 数据库名
- `-p`: 端口号（默认5432）

## MongoDB 连接

### 基本连接

```bash
mongosh "mongodb://hostname:27017/database_name"
```

### 带认证的连接

```bash
mongosh "mongodb://username:password@hostname:27017/database_name"
```

## Redis 连接

### 基本连接

```bash
redis-cli -h hostname -p 6379
```

### 带密码的连接

```bash
redis-cli -h hostname -p 6379 -a password
```

## 连接池配置

### 最佳实践

1. 设置合适的连接池大小
2. 配置连接超时时间
3. 实现连接重试机制
4. 监控连接状态

### 示例配置

```javascript
// Node.js 连接池配置示例
const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});
```

## 安全建议

1. 使用强密码
2. 限制数据库访问IP
3. 定期更新密码
4. 使用SSL/TLS加密连接
5. 最小权限原则

## 故障排除

### 常见问题

1. 连接超时
   - 检查网络连接
   - 验证防火墙设置
   - 确认数据库服务状态

2. 认证失败
   - 验证用户名和密码
   - 检查用户权限
   - 确认认证方式

3. 连接数过多
   - 检查连接池配置
   - 优化连接管理
   - 考虑增加连接限制

## 性能优化

1. 使用连接池
2. 实现连接复用
3. 设置合理的超时时间
4. 监控连接状态
5. 定期清理空闲连接

## 相关资源

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
- [MongoDB 官方文档](https://docs.mongodb.com/)
- [Redis 官方文档](https://redis.io/documentation) 