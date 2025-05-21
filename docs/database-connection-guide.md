# 数据库连接操作指南

## 目录
- [Node.js 数据库操作](#nodejs-数据库操作)
- [Java 数据库操作](#java-数据库操作)

## Node.js 数据库操作

### MySQL 连接与操作

#### 1. 安装依赖
```bash
npm install mysql2
```

#### 2. 基本连接配置
```javascript
const mysql = require('mysql2');

// 创建连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 转换为Promise方式
const promisePool = pool.promise();
```

#### 3. 基本操作示例
```javascript
// 查询数据
async function queryData() {
  try {
    const [rows] = await promisePool.query('SELECT * FROM users');
    console.log(rows);
  } catch (error) {
    console.error('查询错误:', error);
  }
}

// 插入数据
async function insertData(user) {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [user.name, user.email]
    );
    console.log('插入成功:', result);
  } catch (error) {
    console.error('插入错误:', error);
  }
}

// 更新数据
async function updateData(id, user) {
  try {
    const [result] = await promisePool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [user.name, user.email, id]
    );
    console.log('更新成功:', result);
  } catch (error) {
    console.error('更新错误:', error);
  }
}

// 删除数据
async function deleteData(id) {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    console.log('删除成功:', result);
  } catch (error) {
    console.error('删除错误:', error);
  }
}
```

### MongoDB 连接与操作

#### 1. 安装依赖
```bash
npm install mongodb
```

#### 2. 基本连接配置
```javascript
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'your_database';

async function connectDB() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('连接错误:', error);
    throw error;
  }
}
```

#### 3. 基本操作示例
```javascript
// 查询数据
async function findData() {
  const { client, db } = await connectDB();
  try {
    const collection = db.collection('users');
    const result = await collection.find({}).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

// 插入数据
async function insertData(user) {
  const { client, db } = await connectDB();
  try {
    const collection = db.collection('users');
    const result = await collection.insertOne(user);
    console.log('插入成功:', result);
  } finally {
    await client.close();
  }
}

// 更新数据
async function updateData(id, user) {
  const { client, db } = await connectDB();
  try {
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { _id: id },
      { $set: user }
    );
    console.log('更新成功:', result);
  } finally {
    await client.close();
  }
}

// 删除数据
async function deleteData(id) {
  const { client, db } = await connectDB();
  try {
    const collection = db.collection('users');
    const result = await collection.deleteOne({ _id: id });
    console.log('删除成功:', result);
  } finally {
    await client.close();
  }
}
```

## Java 数据库操作

### MySQL 连接与操作

#### 1. 添加依赖
```xml
<!-- Maven -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.27</version>
</dependency>
```

#### 2. 基本连接配置
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/your_database";
    private static final String USER = "root";
    private static final String PASSWORD = "your_password";
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
```

#### 3. 基本操作示例
```java
import java.sql.*;

public class DatabaseOperations {
    // 查询数据
    public void queryData() {
        String sql = "SELECT * FROM users";
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Name: " + rs.getString("name"));
                System.out.println("Email: " + rs.getString("email"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 插入数据
    public void insertData(String name, String email) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            int result = pstmt.executeUpdate();
            System.out.println("插入成功: " + result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 更新数据
    public void updateData(int id, String name, String email) {
        String sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setInt(3, id);
            int result = pstmt.executeUpdate();
            System.out.println("更新成功: " + result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 删除数据
    public void deleteData(int id) {
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            int result = pstmt.executeUpdate();
            System.out.println("删除成功: " + result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### MongoDB 连接与操作

#### 1. 添加依赖
```xml
<!-- Maven -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.4.0</version>
</dependency>
```

#### 2. 基本连接配置
```java
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoConnection {
    private static final String CONNECTION_STRING = "mongodb://localhost:27017";
    private static final String DATABASE_NAME = "your_database";
    
    public static MongoDatabase getDatabase() {
        MongoClient mongoClient = MongoClients.create(CONNECTION_STRING);
        return mongoClient.getDatabase(DATABASE_NAME);
    }
}
```

#### 3. 基本操作示例
```java
import com.mongodb.client.*;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class MongoOperations {
    private final MongoDatabase database;
    
    public MongoOperations() {
        this.database = MongoConnection.getDatabase();
    }
    
    // 查询数据
    public void findData() {
        MongoCollection<Document> collection = database.getCollection("users");
        FindIterable<Document> documents = collection.find();
        
        for (Document doc : documents) {
            System.out.println(doc.toJson());
        }
    }
    
    // 插入数据
    public void insertData(String name, String email) {
        MongoCollection<Document> collection = database.getCollection("users");
        Document document = new Document()
            .append("name", name)
            .append("email", email);
            
        collection.insertOne(document);
        System.out.println("插入成功");
    }
    
    // 更新数据
    public void updateData(String id, String name, String email) {
        MongoCollection<Document> collection = database.getCollection("users");
        Document filter = new Document("_id", id);
        Document update = new Document("$set", 
            new Document("name", name)
                .append("email", email));
                
        collection.updateOne(filter, update);
        System.out.println("更新成功");
    }
    
    // 删除数据
    public void deleteData(String id) {
        MongoCollection<Document> collection = database.getCollection("users");
        Document filter = new Document("_id", id);
        
        collection.deleteOne(filter);
        System.out.println("删除成功");
    }
}
```

## 最佳实践建议

### 1. 连接池管理
- Node.js: 使用连接池而不是单个连接
- Java: 使用HikariCP等连接池框架

### 2. 错误处理
- 始终使用try-catch处理异常
- 记录详细的错误日志
- 实现适当的重试机制

### 3. 资源管理
- 及时关闭数据库连接
- 使用try-with-resources（Java）
- 使用async/await（Node.js）

### 4. 安全性
- 使用参数化查询防止SQL注入
- 加密敏感数据
- 使用环境变量存储配置信息

### 5. 性能优化
- 使用适当的索引
- 批量操作时使用批处理
- 合理设置连接池大小 