const router = require('express').Router();
const RegisterController = require('../controllers/register')

router.get('/', RegisterController.renderRegisterPage);
router.post('/', RegisterController.register);

module.exports = router;