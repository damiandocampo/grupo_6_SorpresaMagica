module.exports = (req, res, next) => {
    if(req.session.usuarioLogin && req.session.usuarioLogin.Rol === 'Admin') {
        next()
    } else {
        res.redirect('/users/login')
    }
}
