module.exports = (req, res, next) => {
    if(req.session.usuarioLogin && req.session.usuarioLogin.Rol === 'Admin') {
        next()
    } else {
        res.render('error', {errorMsg: 'No puedes acceder a esta página porque no eres administrador.'})
    }
}
