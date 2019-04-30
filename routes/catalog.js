const express = require('express');
const router = express.Router();

const book_controller = require('../controllers/bookController');

const bookRouter = require('./book');
const bookInstanceRouter = require('./bookinstance');
const authorRouter = require('./author');
const genreRouter = require('./genre');

router.get('/', book_controller.index);
router.use('/book', bookRouter);
router.use('/bookinstance', bookInstanceRouter);
router.use('/genre', genreRouter);
router.use('/author', authorRouter);

module.exports = router;