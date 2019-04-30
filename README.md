# 概述

本项目是利用Express框架搭建的本地图书馆服务器

## 运用到的技术

### Express应用生成器

（全局的）Express 应用生成器，可用于创建遵循 MVC模式 的 Express 应用框架。它不是必备的，因为无需这个工具就可以创建 Express 应用（或相同架构布局或依赖的 Express 应用）。但我们还是会使用它，因为它更容易上手，还有助于应用结构的模块化管理。

```cli
$ sudo npm install express-generator -g
```

### 视图引擎
[Pub](https://pugjs.org/api/getting-started.html)

使用 --view 选择视图（模板）引擎，并且/或者使用 --css 选择 CSS 生成引擎。

```shell
express -view=pug
```

### nodemon

nodemon 是最简便的自动化工具之一, 可实现webpack-dev-tool类似的功能

```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
}
```

### 数据库

#### 模型

![UML](https://mdn.mozillademos.org/files/15645/Library%20Website%20-%20Mongoose_Express.png)

#### 与数据库交互有两种方法：

1. 使用数据库的原生查询语言（例如SQL）
2. 使用对象数据模型（Object Data Model，简称 ODM）或对象关系模型（Object Relational Model，简称 ORM）。 ODM / ORM 能将网站中的数据表示为 JavaScript 对象，然后将它们映射到底层数据库。一些 ORM 只适用某些特定数据库，还有一些是普遍适用的。

### [Mongoose](https://mongoosejs.com/docs/guide.html)

[MongoDB](https://cloud.mongodb.com/)的前端

#### 运行数据库连接

1. MongoDB Shell

```shell
mongo "mongodb+srv://cluster0-u9usk.mongodb.net/test" --username ybq
```

2. app

Node.js

> Replace \<password\> with the password for the ybq user.

```shell
mongodb+srv://ybq:<password>@cluster0-u9usk.mongodb.net/test?retryWrites=true
```

#### 定义模型

1. 藏书模型
2. 藏书实例模型
3. 作者模型
4. 题材模型Genre

#### 定义模型方法

1. 引入mongoose, mogoose.Schema
2. 创建Schema实例
3. 设置Schema实例虚拟属性
4. 导出模型mongoose.model('Xxx', XxxSchema)

#### 遇到的问题

密码中带有url的关键字符?, 造成解析失败

### [node async 模组](http://caolan.github.io/async/docs.html)

* async.parallel() 执行必须并行执行的任何操作。
* async.series() 用于当需要确保异步操作是序列执行的。
* async.waterfall() 用于必须序列运行的操作，每个操作取决于前面操作的结果。

# 文件结构

## package.json

定义了应用依赖和其他信息

## www文件

文件 /bin/www 是应用入口,  require()应用入口app.js中module.exports的对象

为app设置端口, 创建http服务器, 监听请求, 报告错误和连接信息.

## app.js

# [路由和控制器](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/routes)

![路由-控制器-视图](https://mdn.mozillademos.org/files/16453/Express_MVC.png)

* 路由：把需要支持的请求（以及请求 URL 中包含的任何信息）转发到适当的控制器函数。
* 控制器：从模型中获取请求的数据，创建一个 HTML 页面显示出数据，并将页面返回给用户，以便在浏览器中查看。
* 视图（模板）：供控制器用来渲染数据。

## URL列表

* catalog/: 主页
* catalog/\<objects\>/: 模型（藏书、藏书副本、藏书种类、作者）的完整列表（例如 /catalog/books/、/catalog/genres/ 等）
* catalog/\<objects\>/\<id\>: 具有 _id 字段值的特定模型的详细信息页面（例如 /catalog/book/584493c1f4887f06c0e67d37）。
* catalog/\<object\>/create: 添加新模型的表单（例如 /catalog/book/create）
* catalog/\<object\>/<id>/update：更新具有 _id 字段值的特定模型的表单（例如 /catalog/book/584493c1f4887f06c0e67d37/update）。
* catalog/\<object\>/<id>/delete：删除具有 _id 字段值的特定模型的表单（例如 /catalog/book/584493c1f4887f06c0e67d37/delete）。