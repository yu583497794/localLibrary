var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Response.render() 方法用某对象的某个变量值一同来渲染一个特定的模板，然后将结果作为响应发送
  // 该路由使用 'index' 模板和一个模板变量 title 来渲染响应
  res.render('index', { title: 'Express' });
});

module.exports = router;
