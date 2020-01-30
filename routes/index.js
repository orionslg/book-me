const express = require('express');
const router = express.Router();
const routerGuest = require('./guest');
const IndexController = require('../controllers/index');
const hotelRouter = require('./hotel');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const registerRouter = require('./register');


router.get('/', IndexController.renderIndexPage);
router.use('/book', routerGuest);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/hotel', hotelRouter);
router.use('/register', registerRouter);

module.exports = router;