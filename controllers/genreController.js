const Genre = require('../models/genre');
const Book = require('../models/book');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
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
exports.genre_create_get = (req, res,next) => {
  res.render('genre_form', {title: 'Create Genre'})
};

// 由 POST 处理题材创建操作
// 指定一组中间件函数。数组传递给路由器函数，并按顺序调用每个方法。
exports.genre_create_post = [
  // 定义了一个验证器（body），来检查 name 字段是否为空（在执行验证之前调用trim()，以删除任何尾随/前导空格）。
  body('name', 'Genre name require').isLength({min: 1}).trim(),
  // 创建一个清理程序来调用trim()修剪名称字段和调用escape()转义任何危险的 HTML 字符。
  sanitizeBody('name').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    var genre = new Genre({
      name: req.body.name
    })
    if (!errors.isEmpty()) {
      res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
      return;
    } else {
      Genre.findOne({'name': req.body.name}, (err, found_genre) => {
        if (err) return next(err);
        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save(function(err) {
            if (err) {
              return next(err);
            } else {
              res.redirect(genre.url);
            }
          });
        }
      })
    }
  }
];
async function findGenreBooks(id) {
  let genrePromise = new  Promise((resolve, reject) => {
    Genre.findById(id, (err, result) => {
      if(err) reject(err);
      resolve(result);
    })
  })
  let genreBooksPromise = new Promise((resolve, reject) => {
    Book.find({genre: id}, (err, results) => {
      if (err) reject(err);
      resolve(results);
    })
  })
  return {
    genre: await genrePromise,
    genre_books: await genreBooksPromise
  }
}
// 由 GET 显示删除题材的表单
exports.genre_delete_get = (req, res, next) => {
  findGenreBooks(req.params.id).then(result => {
    if (!result.genre) {
      res.redirect('/catalog/genres');
      return;
    }
    res.render('genre_delete', {title: 'Delete Genre', genre: result.genre, genre_books: result.genre_books});
  }).catch(err => next(err))
};

// 由 POST 处理题材删除操作
exports.genre_delete_post = (req, res) => {
  findGenreBooks(req.params.id).then(result => {
    if(result.genre_books.length > 0) {
      res.render('genre_delete', {
        title: 'Delete Genre',
        genre: result.genre,
        genre_books: result.genre_books
      });
      return;
    } else {
      Genre.findByIdAndRemove(req.params.id, (err)=> {
        if (err) return next(err);
        res.redirect('/catalog/genres');
      })
    }
  }).catch(err => next(err));
};

// 由 GET 显示更新题材的表单
exports.genre_update_get = (req, res) => {
  res.send('未实现：题材更新表单的 GET');
};

// 由 POST 处理题材更新操作
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新题材的 POST');
};