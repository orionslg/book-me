const { Admin, Guest } = require('../models');

class LoginController {
    static renderLoginForm(req, res) {
        const error = req.query.error
        res.render('login', { error })
    }

    static login(req, res) {
        console.log(req.body);
        if (req.body.role === 'admin') {
            Admin.findOne({
                where: {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                }
            })
                .then(data => {
                    if (data) {
                        req.session.login = true;
                        req.session.role = 'admin';
                        res.redirect('/book');
                    } else {
                        res.redirect('/login?error=Email or Password or Username is wrong');
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Guest.findOne({
                where: {
                    email: req.body.email,
                    name: req.body.username,
                    password: req.body.password
                }
            })
                .then(data => {
                    if (data) {
                        req.session.login = true;
                        req.session.role = 'user';
                        req.session.name = req.body.username;
                        req.session.password = req.body.password;
                        req.session.email = req.body.email;
                        res.redirect('/book');
                    } else {
                        res.redirect('/login?error=Email or Password or Username is wrong');
                    }

                })
        }
    }
}

module.exports = LoginController;