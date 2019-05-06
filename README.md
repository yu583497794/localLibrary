# 概述

本项目是利用[Express框架](http://expressjs.com.cn/)搭建的本地图书馆服务器

## 运用到的技术

### Express应用生成器

（全局的）Express 应用生成器，可用于创建遵循 MVC模式 的 Express 应用框架。它不是必备的，因为无需这个工具就可以创建 Express 应用（或相同架构布局或依赖的 Express 应用）。但我们还是会使用它，因为它更容易上手，还有助于应用结构的模块化管理。

```
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

### Moment.js

JavaScript 日期处理类库

1. 日期格式化

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // 五月 6日 2019, 11:23:17 上午
moment().format('dddd');                    // 星期一
moment().format("MMM Do YY");               // 5月 6日 19
moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
moment().format();                          // 2019-05-06T11:23:17+08:00
```

2. 相对时间

```
moment("20111031", "YYYYMMDD").fromNow(); // 8 年前
moment("20120620", "YYYYMMDD").fromNow(); // 7 年前
moment().startOf('day').fromNow();        // 11 小时前
moment().endOf('day').fromNow();          // 13 小时内
moment().startOf('hour').fromNow();       // 25 分钟前
```

### 表单验证 [express-validator](https://express-validator.github.io/docs/)

该验证器作为express.js的中间件，包含了validator.js 验证器和sanitizer清除器函数

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

# 模板的使用

不同的模板语言使用不同的方法，来定义布局和标记数据的占位符 —  一些使用 HTML 来定义布局，而另一些则使用可以编译为 HTML 的不同标记格式。Pug 是第二种类型；它使用 HTML 的表示形式，其中任何行中的第一个单词，通常表示HTML元素，后续行中的缩进，用于表示嵌套在这些元素中的任何内容。结果是一个页面定义直接转换为 HTML，但可以说更简洁，更容易阅读。

## Pug模板语法

文件映射典型 HTML 文件的结构，其中（几乎）每一行中的第一个单词是 HTML 元素，并且缩进用于指示嵌套元素。

元素属性被定义在其关联元素之后的括号中。在括号内，属性定义在以逗号或空格分隔的属性名称和属性值对的列表中

```pug
script(type='text/javascript'), link(rel='stylesheet', href='/stylesheets/style.css')

meta(name='viewport' content='width=device-width initial-scale=1')
```

所有属性的值都被转义（例如 “>” 等字符转换为 HTML 代码等效项，如“&gt;”），以防止注入 JavaScript 或跨站点脚本攻击。

如果标记后跟着等号，则以下文本将被视为 JavaScript 表达式。

```pug
h1= title
p= 'Evaluated and <em>escaped expression</em>:' + title
```

# 表单处理

## 表单处理流程

1. 路由将请求发送到控制器函数；
2. 控制器函数执行所需的任何数据库操作，包括从模型中读取数据
3. 服务器还需要能够处理用户提供的数据，并在出现任何问题时，重新显示带有错误信息的表单。
4. 生成并返回HTML页面

![表单处理流程](https://mdn.mozillademos.org/files/14478/Web%20server%20form%20handling.png)

构成处理代码所需要做的主要是：

1. 在用户第一次请求时显示默认表单。
  
* 表单可能包含空白字段（例如，如果您正在创建新记录），或者可能预先填充了初始值（例如，如果您要更改记录，或者具有有用的默认初始值）。

2. 接收用户提交的数据，通常是在HTTP POST请求中。
3. 验证并清理数据。
4. 如果任何数据无效，请重新显示表单 - 这次使用用户填写的任何值，和问题字段的错误消息。
5. 如果所有数据都有效，请执行所需的操作（例如，将数据保存在数据库中，发送通知电子邮件，返回搜索结果，上传文件等）
6. 完成所有操作后，将用户重定向到另一个页面。

表格处理代码，通常使用GET路由，以实现表单的初始显示，以及POST路由到同一路径，以处理表单数据的验证和处理。

## 验证和清理

[express-validator](https://www.npmjs.com/package/express-validator)
[express-validator document](https://express-validator.github.io/docs/)

```js
const { check, validationResult } = require('express-validator/check');

app.post('/user', [
  // username must be an email
  check('username').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});
```