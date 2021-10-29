module.exports = (req, res, next) => {
    if(!req.session.usuarioL) {
        next()
    } else {
        res.redirect('/')
    }
}
