var express = require('express');
var router = express.Router();

// 建立连接
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://ybq:qing9627@cluster0-u9usk.mongodb.net/test?retryWrites=true'
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接失误'));


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('你好酷');
})
module.exports = router;
