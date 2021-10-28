module.exports = (req, res, next) => {
    if(!req.session.usuarioLogin) {
        next()
    } else {
        res.render('error', {errorMsg: 'No puedes acceder a esta pagina porque ya estas logueado.'})
    }
}
