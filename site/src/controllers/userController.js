const controller = {
    login: (req,res) => {
        res.render('login');
    },
    registro: (req,res) => {
        res.render('registro');
    },
    carrito: (req,res) => {
        res.render('carritoDeCompras');
    },
}

module.exports = controller;