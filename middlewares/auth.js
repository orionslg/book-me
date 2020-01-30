class Auth {
    static isLogin(req, res, next) {
        if(!req.session.login) {
            res.redirect('/login?error=Anda belum login')
        } else {
            next()
        }
    }

    static isAdmin(req, res, next) {
        if (req.session.role !== 'admin') {
            res.redirect('/login?error=Anda tidak memiliki akses')
        } else {
            next()
        }
    }
}

module.exports = Auth;