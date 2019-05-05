const express = require('express');
const router = express.Router();

const book_instance_controller = require('../controllers/bookinstanceController');

router.get('/create', book_instance_controller.book_instance_create_get);
router.post('/create', book_instance_controller.book_instance_create_post);
router.get('/:id/delete', book_instance_controller.book_instance_delete_get);
router.post('/:id/delete', book_instance_controller.book_instance_delete_post);
router.get('/:id/update', book_instance_controller.book_instance_update_get);
router.post('/:id/update', book_instance_controller.book_instance_update_post);
router.get('/:id', book_instance_controller.book_instance_detail);
// router.get('/book_instances', book_instance_controller.book_instance_list);

module.exports = router;