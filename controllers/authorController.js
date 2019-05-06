const Author = require('../models/author');
const Book = require('../models/book')
const { body, validationResult }  = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 显示完整的作者列表
exports.author_list = (req, res,  next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if (err) next(err)
      res.render('author_list', {title: 'Author List', author_list: list_authors});
    });
};

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => {
  async function findAuthor() {
    let authorPromise = new Promise((resolve, reject) => {
      Author.findById(req.params.id, (err, result) => {
        if (!err) resolve(result)
        else reject(err)
      })
    });
    let authorBookPromise = new Promise((resolve, reject) => {
      Book.find({author: req.params.id}, 'title summary')
        .exec((err, results) => {
          if (!err) resolve(results)
          else reject(err)
        })
    })
    return {
      author: await authorPromise,
      author_books: await authorBookPromise
    }
  }
  findAuthor().then((result) => {
    if (result.author == null) {
      let err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    res.render('author_detail', {title: 'Author Detail', author: result.author,  author_books: result.author_books});
  }).catch(err => next(err));
};

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => {
  res.render('author_form', {title: 'Create Author'})
};

// 由 POST 处理作者创建操作
exports.author_create_post = [
  // Validate fields.
  // 使用withMessage() 指定在前一个验证方法失败时， 显示的错误消息
  // body([fields, message]), only checking req.body
  body('first_name').isLength({
    min: 1
  }).trim().withMessage('First name must be specified.'),
  // isAlphanumeric(str [, locale]) : 检查字符串是否只包含字母和数字
  //.isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({
    min: 1
  }).trim().withMessage('Family name must be specified.'),
  //.isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  // 使用optional()函数，仅在输入字段时运行后续验证（这允许我们验证可选字段）
  // checkFalsy 旗标，表示我们接受空字符串或null作为空值
  body('date_of_birth', 'Invalid date of birth').optional({
    checkFalsy: true
  }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({
    checkFalsy: true
  }).isISO8601(),
  // Sanitize fields.
  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('family_name').trim().escape(),
  // 参数从请求中作为字符串接收。我们可以使用toDate()（或toBoolean()等）将这些转换为正确的JavaScript类型。
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),
  
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())  {
      res.render('author_form', {title: 'Create Author', author: req.body, errors: errors.array()});
      return;
    }
    let author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    })
    author.save(err => {
      if (err) return next(err);
      res.redirect(author.url);
    })
  }
];

async function findAuthorBooks(id) {
    let authorPromise = new Promise((resolve, reject) => {
      Author.findById(id, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
    let authorBooksPromise = new Promise((resolve, reject) => {
      Book.find({author: id}, (err, results) => {
        if (err) reject(err);
        resolve(results);
      })
    })
    return {
      author: await authorPromise,
      author_books: await authorBooksPromise
    }
  }  

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res, next) => {
  findAuthorBooks(req.params.id).then(result => {
    if (!result.author) res.redirect('/catalog/authors')
    res.render('author_delete', {title: 'Delete Author', author: result.author, author_books: result.author_books});
  }).catch(err => next(err))
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res, next) => {
  findAuthorBooks(req.params.id).then(result => {
    if (result.author_books.length > 0) {
      res.render('author_delete', {
        title: 'Delete Author',
        author: result.author,
        author_books: result.author_books
      });
      return;
    } else {
      Author.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.redirect('/catalog/authors')
      })
    }
  }).catch(err => next(err));
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET');
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST');
};