const {Hotel, Rating, Guest} = require('../models');

class HotelController {
    static renderUpdatePage(req, res) {
        Hotel.findByPk(+req.params.hotelId)
            .then(data => {
                const error = req.query.error
                res.render('updateHotel', {data, error})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        Hotel.update({
            name: req.body.name,
            room_stock: req.body.room_stock,
            address: req.body.address,
            price: req.body.price
        }, {
            where: {
                id: req.params.hotelId
            }
        })
            .then(data => {
                res.redirect('/book');
            })
            .catch(err => {
                const error = err.errors[0].message
                res.redirect(`/hotel/${req.params.hotelId}/edit?error=${error}`)
            })
    }

    static destroy(req, res) {
        Hotel.destroy({
            where: {
                id: req.params.hotelId
            }
        })
            .then(data => {
                return Rating.destroy({
                    where: {
                        HotelId: req.params.hotelId
                    }
                })

            })
            .then(data => {
                res.redirect('/book');
            })
            .catch(err => {
                res.send(err)
            })
    }

    static create(req, res) {
        Hotel.create({
            name: req.body.name,
            room_stock: req.body.room_stock,
            address: req.body.address,
            price: req.body.price
        })
            .then(data => {
                res.redirect('/book');
            })
            .catch(err => {
                const error = err.errors[0].message
                res.redirect(`/book?error=${error}`);
            })
    }
}

module.exports = HotelController;