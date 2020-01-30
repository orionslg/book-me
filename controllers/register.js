const { Guest } = require('../models');

class RegisterController {
    static renderRegisterPage(req, res) {
        res.render('register')
    }

    static register(req, res) {
        Guest.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(data => {
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err); res.send(err);
            })
    }
}

module.exports = RegisterController;