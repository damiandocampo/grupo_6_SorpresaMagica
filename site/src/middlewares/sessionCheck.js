module.exports = (req, res, next) => {
    if(req.session.usuarioL) {
        res.locals.usuarioL = req.session.usuarioL
    }
    next()
}