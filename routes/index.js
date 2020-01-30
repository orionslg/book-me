const express = require('express');
const router = express.Router();
const routerGuest = require('./guest');
const IndexController = require('../controllers/index');
const hotelRouter = require('./hotel');
const loginRouter = require('./login');
const logoutRouter = require('./logout');


router.get('/', IndexController.renderIndexPage);
router.use('/book', routerGuest);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/hotel', hotelRouter);

module.exports = router;