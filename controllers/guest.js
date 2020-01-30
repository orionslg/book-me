const { Guest, Hotel, Rating } = require('../models');
const Helper = require('../helpers/helper');

class GuestController {
    static renderCreatePage(req, res) {
        // mengambil data Hotels untuk list dan price
        // mengambil data Ratings untuk rating
        Hotel.findAll({
            order: [['id', 'ASC']],
            include: [Rating]
        })
            .then(data => {
                // average rating
                data.forEach(hotel => {
                    let sum = 0;
                    let count = 0;
                    let flag = false;
                    hotel.Ratings.forEach(rating => {
                        if (rating.rating) {
                            sum += rating.rating
                            count++;
                            flag = true;
                        }
                    })
                    if (flag) hotel.avgRating = sum / count;
                    else hotel.avgRating = 0;
                })
                const error = req.query.error;
                const sortType = req.query.sortType;
                switch (req.query.sortBy) {
                    case "price":
                        if (sortType === 'asc') data.sort((a, b) => a.price - b.price);
                        else data.sort((a, b) => b.price - a.price)
                        break;
                    case "room":
                        if (sortType === 'asc') data.sort((a, b) => a.room_stock - b.room_stock);
                        else data.sort((a, b) => b.room_stock - a.room_stock)
                        break;
                    case "rating":

                        if (sortType === 'asc') data.sort((a, b) => a.avgRating - b.avgRating);
                        else data.sort((a, b) => b.avgRating - a.avgRating)
                        break;

                }
                res.render('book', {
                    data,
                    currencyFormat: Helper.currencyFormat,
                    optionFormat: Helper.optionFormat,
                    error
                })

            })
            .catch(err => {
                console.log(err); res.send(err);
            })
    }

    static create(req, res) {
        // validasi total_room
        const newGuest = {
            name: req.body.name,
            total_room: req.body.total_room,
            checkout: false
        }

        // create gues
        Guest.create(newGuest)
            .then(guest => {
                // create rating
                return Rating.create({
                    GuestId: guest.id,
                    HotelId: req.body.HotelId
                })
            })
            .then(data => {
                return Hotel.findOne({
                    where: {
                        id: req.body.HotelId
                    }
                })
            })
            .then(hotel => {
                console.log('INI HOTEL=>>', hotel);
                // update hotel room_stock
                return Hotel.update({
                    room_stock: hotel.room_stock - req.body.total_room
                }, {
                    where: {
                        id: hotel.id
                    }
                })
            })
            .then(data => {
                res.redirect('/book')
            })
            .catch(err => {
                const error = err.errors[0].message;
                res.redirect(`/book?error=${error}`);
            })
    }
}

module.exports = GuestController;