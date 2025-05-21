# MySQL 命令指南

## 目录
- [基本操作](#基本操作)
- [数据库操作](#数据库操作)
- [表操作](#表操作)
- [数据操作](#数据操作)
- [用户管理](#用户管理)
- [备份恢复](#备份恢复)
- [常用查询](#常用查询)

## 基本操作

### 1. 连接MySQL
```sql
mysql -u [用户名] -p                 # 连接MySQL（提示输入密码）
mysql -u [用户名] -p[密码]           # 连接MySQL（直接输入密码，不推荐）
mysql -h [主机名] -u [用户名] -p     # 连接远程MySQL服务器
```

### 2. 基本命令
```sql
SHOW DATABASES;                      # 显示所有数据库
USE [数据库名];                      # 选择数据库
SHOW TABLES;                         # 显示当前数据库中的所有表
DESCRIBE [表名];                     # 显示表结构
SHOW COLUMNS FROM [表名];            # 显示表结构（同DESCRIBE）
```

## 数据库操作

### 1. 创建和删除数据库
```sql
CREATE DATABASE [数据库名];          # 创建数据库
CREATE DATABASE [数据库名] CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;  # 创建指定字符集的数据库
DROP DATABASE [数据库名];            # 删除数据库
```

### 2. 数据库属性
```sql
SHOW CREATE DATABASE [数据库名];     # 显示数据库创建语句
ALTER DATABASE [数据库名] CHARACTER SET utf8mb4;  # 修改数据库字符集
```

## 表操作

### 1. 创建表
```sql
CREATE TABLE [表名] (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 修改表
```sql
ALTER TABLE [表名] ADD [列名] [数据类型];     # 添加列
ALTER TABLE [表名] DROP COLUMN [列名];        # 删除列
ALTER TABLE [表名] MODIFY [列名] [新数据类型]; # 修改列数据类型
ALTER TABLE [表名] RENAME TO [新表名];        # 重命名表
DROP TABLE [表名];                           # 删除表
```

### 3. 索引操作
```sql
CREATE INDEX [索引名] ON [表名] (列名);      # 创建索引
CREATE UNIQUE INDEX [索引名] ON [表名] (列名); # 创建唯一索引
DROP INDEX [索引名] ON [表名];               # 删除索引
SHOW INDEX FROM [表名];                     # 显示表的索引
```

## 数据操作

### 1. 插入数据
```sql
INSERT INTO [表名] (列1, 列2) VALUES (值1, 值2);  # 插入单行数据
INSERT INTO [表名] VALUES (值1, 值2, ...);        # 插入所有列的数据
INSERT INTO [表名] (列1, 列2) VALUES 
    (值1, 值2), 
    (值3, 值4);                                  # 插入多行数据
```

### 2. 查询数据
```sql
SELECT * FROM [表名];                            # 查询所有列
SELECT 列1, 列2 FROM [表名];                     # 查询指定列
SELECT * FROM [表名] WHERE [条件];               # 条件查询
SELECT * FROM [表名] ORDER BY [列名] ASC/DESC;   # 排序查询
SELECT * FROM [表名] LIMIT [数量] OFFSET [偏移量]; # 分页查询
```

### 3. 更新数据
```sql
UPDATE [表名] SET 列1 = 值1 WHERE [条件];        # 更新数据
UPDATE [表名] SET 列1 = 值1, 列2 = 值2 WHERE [条件]; # 更新多列
```

### 4. 删除数据
```sql
DELETE FROM [表名] WHERE [条件];                 # 删除数据
TRUNCATE TABLE [表名];                          # 清空表数据
```

## 用户管理

### 1. 创建用户
```sql
CREATE USER '用户名'@'主机' IDENTIFIED BY '密码';  # 创建用户
```

### 2. 授权
```sql
GRANT ALL PRIVILEGES ON [数据库名].* TO '用户名'@'主机'; # 授予所有权限
GRANT SELECT, INSERT ON [数据库名].* TO '用户名'@'主机'; # 授予特定权限
FLUSH PRIVILEGES;                               # 刷新权限
```

### 3. 撤销权限
```sql
REVOKE ALL PRIVILEGES ON [数据库名].* FROM '用户名'@'主机'; # 撤销所有权限
DROP USER '用户名'@'主机';                      # 删除用户
```

## 备份恢复

### 1. 备份
```bash
mysqldump -u [用户名] -p [数据库名] > backup.sql  # 备份数据库
mysqldump -u [用户名] -p --all-databases > backup.sql  # 备份所有数据库
```

### 2. 恢复
```bash
mysql -u [用户名] -p [数据库名] < backup.sql     # 恢复数据库
```

## 常用查询

### 1. 连接查询
```sql
SELECT * FROM 表1 
INNER JOIN 表2 ON 表1.id = 表2.id;              # 内连接
SELECT * FROM 表1 
LEFT JOIN 表2 ON 表1.id = 表2.id;               # 左连接
SELECT * FROM 表1 
RIGHT JOIN 表2 ON 表1.id = 表2.id;              # 右连接
```

### 2. 聚合函数
```sql
SELECT COUNT(*) FROM [表名];                    # 计数
SELECT SUM(列名) FROM [表名];                   # 求和
SELECT AVG(列名) FROM [表名];                   # 平均值
SELECT MAX(列名) FROM [表名];                   # 最大值
SELECT MIN(列名) FROM [表名];                   # 最小值
```

### 3. 分组查询
```sql
SELECT 列1, COUNT(*) FROM [表名] 
GROUP BY 列1;                                   # 分组统计
SELECT 列1, COUNT(*) FROM [表名] 
GROUP BY 列1 HAVING COUNT(*) > 1;               # 分组过滤
```

## 性能优化提示
1. 合理使用索引
2. 避免使用SELECT *
3. 使用EXPLAIN分析查询性能
4. 适当使用分区表
5. 定期优化表：`OPTIMIZE TABLE [表名]`
6. 定期分析表：`ANALYZE TABLE [表名]`

## 注意事项
1. 在执行重要操作前先备份数据
2. 注意SQL注入安全问题
3. 使用事务来保证数据一致性
4. 定期维护和优化数据库
5. 注意字符集和排序规则的设置 