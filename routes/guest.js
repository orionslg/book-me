const router = require('express').Router();
const GuestController = require('../controllers/guest');
const Auth = require('../middlewares/auth');

// create and read
router.get('/', Auth.isLogin, GuestController.renderCreatePage);
router.post('/', Auth.isLogin, GuestController.create);

module.exports = router;