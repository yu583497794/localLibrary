var createError = require('http-errors');
var express = require('express');
// 用于解析文件和目录的核心 node 库
var path = require('path');
// 用于解析 cookie 头来填充 req.cookies
var cookieParser = require('cookie-parser');
// node 专用 HTTP 请求记录器中间件。
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup 设置视图（模板）引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 中间件为错误和 HTTP 404 响应添加处理方法。
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // 渲染出错页面
  res.render('error');
});

module.exports = app;
