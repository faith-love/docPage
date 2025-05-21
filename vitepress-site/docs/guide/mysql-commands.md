# MySQL命令指南

## 目录
- [基本操作](#基本操作)
- [数据库操作](#数据库操作)
- [表操作](#表操作)
- [数据操作](#数据操作)
- [用户管理](#用户管理)
- [备份恢复](#备份恢复)

## 基本操作

### 1. 连接MySQL
```bash
# 命令行连接
mysql -u username -p
mysql -h hostname -u username -p

# 退出MySQL
exit
quit
```

### 2. 查看信息
```sql
-- 查看版本
SELECT VERSION();

-- 查看当前用户
SELECT USER();

-- 查看当前数据库
SELECT DATABASE();

-- 查看所有数据库
SHOW DATABASES;

-- 查看所有表
SHOW TABLES;
```

## 数据库操作

### 1. 创建数据库
```sql
-- 创建数据库
CREATE DATABASE database_name;

-- 创建数据库并指定字符集
CREATE DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE database_name;
```

### 2. 删除数据库
```sql
-- 删除数据库
DROP DATABASE database_name;

-- 删除数据库（如果存在）
DROP DATABASE IF EXISTS database_name;
```

## 表操作

### 1. 创建表
```sql
-- 基本创建表
CREATE TABLE table_name (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建表（带外键）
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2. 修改表
```sql
-- 添加列
ALTER TABLE table_name ADD column_name datatype;

-- 修改列
ALTER TABLE table_name MODIFY column_name new_datatype;

-- 删除列
ALTER TABLE table_name DROP COLUMN column_name;

-- 重命名表
RENAME TABLE old_name TO new_name;
```

### 3. 删除表
```sql
-- 删除表
DROP TABLE table_name;

-- 删除表（如果存在）
DROP TABLE IF EXISTS table_name;
```

## 数据操作

### 1. 插入数据
```sql
-- 插入单行数据
INSERT INTO table_name (column1, column2) VALUES (value1, value2);

-- 插入多行数据
INSERT INTO table_name (column1, column2) VALUES 
    (value1, value2),
    (value3, value4);

-- 从其他表插入数据
INSERT INTO table1 SELECT * FROM table2;
```

### 2. 更新数据
```sql
-- 更新数据
UPDATE table_name SET column1 = value1 WHERE condition;

-- 更新多个列
UPDATE table_name 
SET column1 = value1, 
    column2 = value2 
WHERE condition;
```

### 3. 删除数据
```sql
-- 删除数据
DELETE FROM table_name WHERE condition;

-- 清空表
TRUNCATE TABLE table_name;
```

### 4. 查询数据
```sql
-- 基本查询
SELECT column1, column2 FROM table_name WHERE condition;

-- 排序
SELECT * FROM table_name ORDER BY column_name ASC/DESC;

-- 限制结果
SELECT * FROM table_name LIMIT 10;

-- 分组
SELECT column1, COUNT(*) FROM table_name GROUP BY column1;

-- 连接查询
SELECT * FROM table1 
JOIN table2 ON table1.id = table2.id;
```

## 用户管理

### 1. 创建用户
```sql
-- 创建用户
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- 创建用户（允许远程访问）
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
```

### 2. 授权
```sql
-- 授予权限
GRANT permission ON database.table TO 'username'@'localhost';

-- 授予所有权限
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;
```

### 3. 撤销权限
```sql
-- 撤销权限
REVOKE permission ON database.table FROM 'username'@'localhost';

-- 撤销所有权限
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'localhost';
```

## 备份恢复

### 1. 备份
```bash
# 备份整个数据库
mysqldump -u username -p database_name > backup.sql

# 备份特定表
mysqldump -u username -p database_name table_name > backup.sql

# 备份所有数据库
mysqldump -u username -p --all-databases > all_databases.sql
```

### 2. 恢复
```bash
# 恢复数据库
mysql -u username -p database_name < backup.sql

# 恢复所有数据库
mysql -u username -p < all_databases.sql
```

## 性能优化

### 1. 索引操作
```sql
-- 创建索引
CREATE INDEX index_name ON table_name (column_name);

-- 创建唯一索引
CREATE UNIQUE INDEX index_name ON table_name (column_name);

-- 删除索引
DROP INDEX index_name ON table_name;
```

### 2. 查询优化
```sql
-- 使用EXPLAIN分析查询
EXPLAIN SELECT * FROM table_name WHERE condition;

-- 使用FORCE INDEX强制使用索引
SELECT * FROM table_name FORCE INDEX (index_name) WHERE condition;
```

## 事务管理

### 1. 事务操作
```sql
-- 开始事务
START TRANSACTION;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置自动提交
SET autocommit = 0;
```

### 2. 事务隔离级别
```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

## 常用函数

### 1. 字符串函数
```sql
-- 连接字符串
CONCAT(str1, str2)

-- 截取字符串
SUBSTRING(str, pos, len)

-- 替换字符串
REPLACE(str, from_str, to_str)
```

### 2. 日期函数
```sql
-- 当前日期时间
NOW()

-- 日期加减
DATE_ADD(date, INTERVAL expr unit)

-- 日期格式化
DATE_FORMAT(date, format)
```

### 3. 聚合函数
```sql
-- 计数
COUNT(expr)

-- 求和
SUM(expr)

-- 平均值
AVG(expr)

-- 最大值/最小值
MAX(expr)
MIN(expr)
``` 