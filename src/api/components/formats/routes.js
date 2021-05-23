const express = require('express');

const router = express.Router({ mergeParams: true });
const controller = require('./controller');

router.post('/', controller.create);
router.get('/', controller.read);
router.patch('/', controller.update);
router.delete('/', controller.delete_);

module.exports = router;
