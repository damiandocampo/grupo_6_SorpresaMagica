const products = require('../data/productos.json');
const categorias = require('../data/categorias.json')

const controller = {
    index: function(req, res, next) {
        res.render('index', {products, categorias});
    },
}

module.exports = controller;