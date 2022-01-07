// no se deja ingresar al usuario que NO sea administrador (páginas de admin)

module.exports = (req, res, next) => {
    if(req.session.usuarioL && req.session.usuarioL.rolId === 1) {
        next()
    } else {
        res.redirect('/')
    }
}
