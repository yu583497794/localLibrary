const BookInstance = require('../models/bookinstance');

// 显示完整的藏书范本列表
exports.book_instance_list = (req, res) => {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) {return next(err);}
      res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
    });
};

// 为每位藏书范本显示详细信息的页面
exports.book_instance_detail = (req, res) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) return next(err);
      if (bookinstance  == null) {
        let err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      res.render('bookinstance_detail', {title: 'Book', bookinstance: bookinstance});
    })
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