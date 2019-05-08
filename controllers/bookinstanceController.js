const BookInstance = require('../models/bookinstance');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody }  = require('express-validator/filter');
const Book = require('../models/book')
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
  Book.find({}, 'title')
    .exec((err, results) => {
      if(err) return next(err);
      res.render('bookinstance_form', {title: 'Create Book Instance', book_list: results})
    })
};

// 由 POST 处理藏书范本创建操作
exports.book_instance_create_post = [
  body('book', 'Book must be specified').isLength({
    min: 1
  }).trim(),
  body('imprint', 'Imprint must be specified').isLength({
    min: 1
  }).trim(),
  body('due_back', 'Invalid date').optional({
    checkFalsy: true
  }).isISO8601(),
  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),
  (req, res, next) => {
     const errors = validationResult(req);
     var bookinstance = new BookInstance({
       book: req.body.book,
       imprint: req.body.imprint,
       status: req.body.status,
       due_back: req.body.due_back
     });
     if(!errors.isEmpty()) {
      Book.find({}, 'title')
        .exec((err, results) => {
          if (err) return next(err)
          res.render('bookinstance_form', {title: 'Create Book Instance', book_list: results, errors: errors.array(), selected_book: bookinstance.book._id, bookinstance: bookinstance})
        })
     } else {
      bookinstance.save(err => {
        if(err) return next(err);
        res.redirect(bookinstance.url);
      })
     }
  }
]

// 由 GET 显示删除藏书范本的表单
exports.book_instance_delete_get = (req, res) => {
  BookInstance.findById(req.params.id)
    .populate('book', 'title')
    .exec((err, result) => {
      if (err) return next(err)
      if (!result) {
        res.redirect('/catalog/bookinstances');
      } else {
        res.render('bookinstance_delete', {
          title: 'Delete Book Copy',
          book_instance: result
        })
      }
    })
};

// 由 POST 处理藏书范本删除操作
exports.book_instance_delete_post = (req, res) => {
  BookInstance.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.redirect('/catalog/bookinstances');
  })
};
async function findBookInstanceBooks(id) {
  let bookinstancePromise = new Promise((resolve,  reject) => {
    BookInstance.findById(id, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  let bookPromise = new Promise((resolve, reject) => {
    Book.find((err, results) => {
      if (err) reject(err);
      resolve(results);
    })
  });
  return {
    book_instance: await bookinstancePromise,
    book_list: await bookPromise
  }
}
// 由 GET 显示更新藏书范本的表单
exports.book_instance_update_get = (req, res, next) => {
  findBookInstanceBooks(req.params.id).then(result => {
    if (!result.book_instance) res.redirect('/catalog/bookinstances');
    res.render('bookinstance_form', {title: 'Update Book Instance', bookinstance: result.book_instance, book_list: result.book_list});
  })
};

// 由 POST 处理藏书范本更新操作
exports.book_instance_update_post = [
  body('book', 'Book must be specified').isLength({min: 1}).trim(),
  body('imprint', 'Imprint must be specified').isLength({min: 1}).trim(),
  body('due_back', 'Invalid date').optional({checkFalsy: true}).isISO8601(),
  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),
  (req, res, next) => {
    let errors = validationResult(req);
    if (req.body.due_back === null) {
      req.body.due_back  = new Date()
    }
    let book_instance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      due_back: req.body.due_back,
      status: req.body.status,
      _id: req.params.id
    })
    if (!errors.isEmpty()) {
      findBookInstanceBooks(req.params.id).then(result => {
        res.render('bookinstance_form', {
          title: 'Update Book Instance',
          bookinstance: result.book_instance,
          book_list: result.book_list,
          errors: errors.array()
        })
      }).catch(err => next(err))
      return;
    } else {
      BookInstance.findByIdAndUpdate(req.params.id, book_instance, {}, (err, result) => {
        if(err) return next(err);
        res.redirect(result.url);
      })
    }
  }
];