const Author = require('../models/author');
const Book = require('../models/book')
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
  res.send('未实现：作者创建表单的 GET');
};

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => {
  res.send('未实现：创建作者的 POST');
};

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => {
  res.send('未实现：作者删除表单的 GET');
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {
  res.send('未实现：删除作者的 POST');
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET');
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST');
};