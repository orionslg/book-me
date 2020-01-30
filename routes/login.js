const router = require('express').Router();
const LoginController = require('../controllers/login')

router.get('/', LoginController.renderLoginForm);
router.post('/', LoginController.login);

module.exports = router;