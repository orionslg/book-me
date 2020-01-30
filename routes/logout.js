const router = require('express').Router();
const LogoutController = require('../controllers/logout');
const Auth = require('../middlewares/auth');

router.get('/', Auth.isLogin, LogoutController.logout);


module.exports = router;