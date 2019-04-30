const BookInstance = require('../models/bookinstance');

// 显示完整的藏书范本列表
exports.book_instance_list = (req, res) => {
  res.send('未实现：藏书范本列表');
};

// 为每位藏书范本显示详细信息的页面
exports.book_instance_detail = (req, res) => {
  res.send('未实现：藏书范本详细信息：' + req.params.id);
};

// 由 GET 显示创建藏书范本的表单
exports.book_instance_create_get = (req, res) => {
  res.send('未实现：藏书范本创建表单的 GET');
};

// 由 POST 处理藏书范本创建操作
exports.book_instance_create_post = (req, res) => {
  res.send('未实现：创建藏书范本的 POST');
};

// 由 GET 显示删除藏书范本的表单
exports.book_instance_delete_get = (req, res) => {
  res.send('未实现：藏书范本删除表单的 GET');
};

// 由 POST 处理藏书范本删除操作
exports.book_instance_delete_post = (req, res) => {
  res.send('未实现：删除藏书范本的 POST');
};

// 由 GET 显示更新藏书范本的表单
exports.book_instance_update_get = (req, res) => {
  res.send('未实现：藏书范本更新表单的 GET');
};

// 由 POST 处理藏书范本更新操作
exports.book_instance_update_post = (req, res) => {
  res.send('未实现：更新藏书范本的 POST');
};