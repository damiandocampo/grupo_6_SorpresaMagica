const productos = require('../data/productos.json')

const controller = {
    detalle: (req,res) => {
        res.render('detalleDeProductos');
    },
    listado: (req, res) => {
        res.render('productos', {productos});
    },
}

module.exports = controller;