// no ingresa el usuario que ya esté logueado (páginas de login y register)

module.exports = (req, res, next) => {
    if(!req.session.usuarioL) {
        next()
    } else {
        res.redirect('/')
    }
}
