const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const categorias = require('../data/categorias.json')

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    index: function(req, res, next) {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('index', {products, categorias, finalPrice});
    },
}

module.exports = controller;