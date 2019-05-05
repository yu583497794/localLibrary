const express = require('express');
const router = express.Router();

const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');

const bookRouter = require('./book');
const bookInstanceRouter = require('./bookinstance');
const authorRouter = require('./author');
const genreRouter = require('./genre');

router.get('/', book_controller.index);
router.use('/book', bookRouter);
router.use('/bookinstance', bookInstanceRouter);
router.use('/genre', genreRouter);
router.use('/author', authorRouter);
router.get('/books', book_controller.book_list);
router.get('/authors', author_controller.author_list);
router.get('/genres', genre_controller.genre_list);
router.get('/bookinstances', book_instance_controller.book_instance_list);
module.exports = router;