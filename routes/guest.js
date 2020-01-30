const router = require('express').Router();
const GuestController = require('../controllers/guest');
const Auth = require('../middlewares/auth');

// create and read
router.get('/', Auth.isLogin, GuestController.renderCreatePage);
router.post('/', Auth.isLogin, GuestController.create);

router.get('/:id/view', Auth.isLogin, GuestController.findAllBooks);

router.get('/:id/rate', Auth.isLogin, GuestController.renderRateForm);
router.post('/:id/rate', Auth.isLogin, GuestController.rate);

module.exports = router;