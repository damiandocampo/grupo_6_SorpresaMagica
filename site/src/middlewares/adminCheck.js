module.exports = (req, res, next) => {
    if(req.session.usuarioL && req.session.usuarioL.rolId === 1) {
        next()
    } else {
        res.redirect('/')
    }
}
