const router = require('express').Router();

const HotelController = require('../controllers/hotel');
const Auth = require('../middlewares/auth');

router.get('/:hotelId/edit', Auth.isLogin, Auth.isAdmin, HotelController.renderUpdatePage);
router.post('/:hotelId/edit', Auth.isLogin, Auth.isAdmin, HotelController.update);
router.get('/:hotelId/delete', Auth.isLogin, Auth.isAdmin,  HotelController.destroy);
router.post('/add', Auth.isLogin, Auth.isAdmin, HotelController.create);

module.exports = router;