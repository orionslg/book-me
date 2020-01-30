const router = require('express').Router();
const GuestController = require('../controllers/guest');

// create and read
router.get('/', GuestController.renderCreatePage);
router.post('/', GuestController.create);

module.exports = router;