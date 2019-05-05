const Genre = require('../models/genre');
const Book = require('../models/book');
// var async = require('async');
// 显示完整的题材列表
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genres) => {
      if (err) {return next(err)}
      res.render('genre_list', {title: 'Author List', genre_list: list_genres})
    })
};

// 为每位题材显示详细信息的页面
exports.genre_detail = (req, res, next) => {
  async function findGenreBooks() {
    let genrePromise = new Promise((resolve, reject) => {
      Genre.findById(req.params.id, (err, genreItem) => {
        if (!err) resolve(genreItem);
        else reject(err);
      });
    });
    let genreBooksPromise = new Promise((resolve, reject) => {
      Book.find({
        'genre': req.params.id
      }, (err, bookList) => {
        if (!err) resolve(bookList);
        else reject(err)
      });
    });
    return {
      genre: await genrePromise,
      genre_books: await genreBooksPromise
    }
  }
  findGenreBooks().then((results) => {
    if (results.genre == null) {
      var err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }
    res.render('genre_detail', {
      title: 'Genre Detail',
      genre: results.genre,
      genre_books: results.genre_books
    });
  }).catch(err => {
    next(err);
  })
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