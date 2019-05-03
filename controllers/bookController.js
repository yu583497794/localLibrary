const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance');
const async = require('async');

// async  function countTask (req,  res) {
//   let bookCount = new Promise ((resolve, reject) => {
//     Book.count({}, (err, count) => {
//       err ? reject(err) : resolve(count);
//     })
//   })
//   let authorCount = new Promise((resolve, reject) => {
//     Author.count({}, (err, count) => {
//       err ? reject(err) : resolve(count);
//     })
//   })
//   let genreCount = new Promise((resolve, reject) => {
//     Genre.count({}, (err, count) => {
//       err ? reject(err) : resolve(count);
//     })
//   })
//   let bookInstanceCount = new Promise ((resolve, reject) => {
//     BookInstance.count({}, callback);  
//   })
//   let bookInstanceAvailableCount = new Promise ((resolve, reject) => {
//     BookInstance.count({
//       status: '可供借阅'
//     }, (err, count) => {
//       err ? reject(err) : resolve(count);
//     })
//   })
//   await Promise.all([bookCount, authorCount, genreCount, bookInstanceCount]).then((results) => {
//     res.render('index', {
//       title: '主页',
//       error: null,
//       data: results
//     });
//   }).catch((err) => {
//     res.render('index', {
//       title: '主页',
//       error: err,
//       data: null
//     });
//   }) 
// }
// exports.index = countTask;
exports.index = (req, res) => {
  async.parallel({
    book_count: function (callback) {
      Book.count({}, callback);
    },
    author_count: function (callback) {
      Author.count({}, callback);
    },
    genre_count: function (callback) {
      Genre.count({}, callback);
    },
    book_instance_count: function (callback) {
      BookInstance.count({}, callback);
    },
    book_instance_available_count: function (callback) {
      BookInstance.count({
        status: '可供借阅'
      }, callback);
    }
  }, function (err, results) {
    res.render('index', {title: '主页', error: err, data: results});
  })
}
// 显示完整的藏书列表
exports.book_list = (req, res) => {
  res.send('未实现：藏书列表');
};

// 为每位藏书显示详细信息的页面
exports.book_detail = (req, res) => {
  res.send('未实现：藏书详细信息：' + req.params.id);
};

// 由 GET 显示创建藏书的表单
exports.book_create_get = (req, res) => {
  res.send('未实现：藏书创建表单的 GET');
};

// 由 POST 处理藏书创建操作
exports.book_create_post = (req, res) => {
  res.send('未实现：创建藏书的 POST');
};

// 由 GET 显示删除藏书的表单
exports.book_delete_get = (req, res) => {
  res.send('未实现：藏书删除表单的 GET');
};

// 由 POST 处理藏书删除操作
exports.book_delete_post = (req, res) => {
  res.send('未实现：删除藏书的 POST');
};

// 由 GET 显示更新藏书的表单
exports.book_update_get = (req, res) => {
  res.send('未实现：藏书更新表单的 GET');
};

// 由 POST 处理藏书更新操作
exports.book_update_post = (req, res) => {
  res.send('未实现：更新藏书的 POST');
};