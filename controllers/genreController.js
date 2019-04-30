const Genre = require('../models/genre');

// 显示完整的题材列表
exports.genre_list = (req, res) => {
  res.send('未实现：题材列表');
};

// 为每位题材显示详细信息的页面
exports.genre_detail = (req, res) => {
  res.send('未实现：题材详细信息：' + req.params.id);
};

// 由 GET 显示创建题材的表单
exports.genre_create_get = (req, res) => {
  res.send('未实现：题材创建表单的 GET');
};

// 由 POST 处理题材创建操作
exports.genre_create_post = (req, res) => {
  res.send('未实现：创建题材的 POST');
};

// 由 GET 显示删除题材的表单
exports.genre_delete_get = (req, res) => {
  res.send('未实现：题材删除表单的 GET');
};

// 由 POST 处理题材删除操作
exports.genre_delete_post = (req, res) => {
  res.send('未实现：删除题材的 POST');
};

// 由 GET 显示更新题材的表单
exports.genre_update_get = (req, res) => {
  res.send('未实现：题材更新表单的 GET');
};

// 由 POST 处理题材更新操作
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新题材的 POST');
};