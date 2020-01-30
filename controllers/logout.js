class LogoutController {

    static logout(req, res) {
        req.session.login = false;
        res.redirect('/');
    }
}

module.exports = LogoutController;