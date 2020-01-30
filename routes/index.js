const express = require('express');
const router = express.Router();
const routerGuest = require('./guest');
const IndexController = require('../controllers/index');

router.get('/', IndexController.renderIndexPage);
router.use('/book', routerGuest);

module.exports = router;