const express = require('express');
const router = express.Router();

const book_controller = require('../controllers/bookController');

router.get('/create', book_controller.book_create_get);
router.post('/create', book_controller.book_create_post);
router.get('/:id/delete', book_controller.book_delete_get);
router.post('/:id/delete', book_controller.book_delete_post);
router.get('/:id/update', book_controller.book_update_get);
router.post('/:id/update', book_controller.book_update_post);
router.get('/:id', book_controller.book_detail);
// /catalog/book/books 会跳转到、catalog/book/:id 也就是图书详情页
// router.get('/books', book_controller.book_list);

module.exports = router;