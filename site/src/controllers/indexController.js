const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categorias = require('../data/categorias.json')

const controller = {
    index: function(req, res, next) {
        res.render('index', {products, categorias});
    },
}

module.exports = controller;