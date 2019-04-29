# 使用应用生成器

（全局的）Express 应用生成器，可用于创建遵循 MVC模式 的 Express 应用框架。它不是必备的，因为无需这个工具就可以创建 Express 应用（或相同架构布局或依赖的 Express 应用）。但我们还是会使用它，因为它更容易上手，还有助于应用结构的模块化管理。

```cli
$ sudo npm install express-generator -g
```

# 视图引擎
[Pub](https://pugjs.org/api/getting-started.html)

使用 --view 选择视图（模板）引擎，并且/或者使用 --css 选择 CSS 生成引擎。

```shell
express -view=pug
```

# nodemon

nodemon 是最简便的自动化工具之一

# 数据库

## 模型

![UML](https://mdn.mozillademos.org/files/15645/Library%20Website%20-%20Mongoose_Express.png)

## 与数据库交互有两种方法：

1. 使用数据库的原生查询语言（例如SQL）
2. 使用对象数据模型（Object Data Model，简称 ODM）或对象关系模型（Object Relational Model，简称 ORM）。 ODM / ORM 能将网站中的数据表示为 JavaScript 对象，然后将它们映射到底层数据库。一些 ORM 只适用某些特定数据库，还有一些是普遍适用的。

## [Mongoose](https://mongoosejs.com/docs/guide.html)

MongoDB的前端

### 运行数据库连接

1. MongoDB Shell

```shell
mongo "mongodb+srv://cluster0-u9usk.mongodb.net/test" --username ybq
```

2. Driver

Node.js

> Replace \<password\> with the password for the ybq user.

```shell
mongodb+srv://ybq:<password>@cluster0-u9usk.mongodb.net/test?retryWrites=true
```

### 定义模型

1. 藏书模型
2. 藏书实例模型
3. 作者模型
4. 题材模型Genre

### 定义模型方法

1. 引入mongoose, mogoose.Schema
2. 创建Schema实例
3. 设置Schema实例虚拟属性
4. 导出模型mongoose.model('Xxx', XxxSchema)

### 遇到的问题

密码中带有url的关键字符?, 造成解析失败

# 文件

## package.json

定义了应用依赖和其他信息

## www文件

文件 /bin/www 是应用入口,  require()应用入口app.js中module.exports的对象

为app设置端口, 创建http服务器, 监听请求, 报告错误和连接信息.

## app.js

# [路由和控制器](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/routes)