const {Admin} = require('../models');

class LoginController {
    static renderLoginForm(req, res) {
        const error = req.query.error
        res.render('login', {error})
    }

    static login(req, res) {
        Admin.findOne({
            where: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
        })
            .then(data => {
                if(data) {
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
    }
}

module.exports = LoginController;