module.exports = (req, res, next) => {
    if(req.session.usuarioLogin) {
        res.locals.usuario = req.session.usuarioLogin
        next()
    } else {
        res.redirect('/')
    }
}
