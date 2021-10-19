module.exports = (req, res, next) => {
    if(!req.session.usuarioLogin) {
        next()
    } else {
        res.redirect('/users/login')
    }
}
