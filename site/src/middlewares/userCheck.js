//si el usuario no está logueado no puede ingresar a la vista de perfil

module.exports = (req, res, next) => {
    if(!req.session.usuarioL) {
        res.redirect('/')
    }
    next()
}
