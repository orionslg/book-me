const { Guest, Hotel, Rating } = require('../models');
const Helper = require('../helpers/helper');
const { Op } = require('sequelize');

class GuestController {
    static renderCreatePage(req, res) {
        // mengambil data Hotels untuk list dan price
        // mengambil data Ratings untuk rating
        let guest;
        if (req.session.name) {
            Guest.findOne({
                where: {
                    name: req.session.name
                }
            })
                .then(data => {
                    guest = data;
                    return Hotel.findAll({
                        order: [['id', 'ASC']],
                        include: [Rating]
                    })

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
                        if (flag) hotel.avgRating = Math.round(sum / count);
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
                        error,
                        name: req.session.name,
                        admin: req.session.role,
                        guest
                    })

                })
                .catch(err => {
                    console.log(err); res.send(err);
                })
        } else {
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
                        if (flag) hotel.avgRating = Math.round(sum / count);
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
                        error,
                        admin: req.session.role,
                        guest: null
                    })

                })
                .catch(err => {
                    console.log(err); res.send(err);
                })
        }
    }

    static create(req, res) {
        // validasi total_room
        const newGuest = {
            name: req.body.name,
            total_room: req.body.total_room,
            checkout: false,
            password: req.session.password,
            email: req.session.email
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

    static findAllBooks(req, res) {
        let guest;
        Guest.findAll({
            where: {
                name: req.session.name
            }
        })
            .then(guests => {
                const tmp = guests.map(el => el.id)
                return Rating.findAll({
                    where: {
                        GuestId: {
                            [Op.in]: tmp
                        }
                    }
                })
            })
            .then(data => {
                guest = data.map(el => el.HotelId)
                return Hotel.findAll({
                    where: {
                        id: {
                            [Op.in]: guest
                        }
                    }
                })
            })
            .then(data => {
                res.render('findAllBooks', {
                    data
                })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static renderRateForm(req, res) {
        let guest;
        Guest.findAll({
            where: {
                name: req.session.name
            }
        })
            .then(guests => {
                const tmp = guests.map(el => el.id)
                return Rating.findAll({
                    where: {
                        GuestId: {
                            [Op.in]: tmp
                        },
                        rating: null
                    }
                })
            })
            .then(data => {
                guest = data.map(el => el.HotelId)
                return Hotel.findAll({
                    where: {
                        id: {
                            [Op.in]: guest
                        }
                    }
                })
            })
            .then(data => {
                res.render('rate', {
                    data,
                    guestId: req.params.id
                })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static rate(req, res) {
        Guest.findAll({
            where: {
                name: req.session.name
            }
        })
            .then(data => {
                const tmp = data.map(el => el.id);
                return Rating.update({
                    rating: req.body.rating
                }, {
                    where: {
                        GuestId: {
                            [Op.in]: tmp
                        },
                        HotelId: +req.body.hotelId
                    }
                })
            })
            .then(data => {
                res.redirect('/book');
            })
            .catch(err => {
                res.send(err); console.log(err);
            })
    }
}

module.exports = GuestController;