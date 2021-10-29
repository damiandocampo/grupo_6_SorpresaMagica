module.exports = (req, res, next) => {
    if(req.session.usuarioL && req.session.usuarioL.rol === 'Admin') {
        next()
    } else {
        res.redirect('/')
    }
}
