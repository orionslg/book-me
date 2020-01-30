class LogoutController {

    static logout(req, res) {
        req.session.login = false;
        req.session.name = null;
        res.redirect('/');
    }
}

module.exports = LogoutController;