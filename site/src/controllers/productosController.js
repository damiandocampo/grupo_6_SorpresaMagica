const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    detalle: (req,res) => {
        const {id} = req.params
        const product = products.find(element => element.id === +id)

        res.render('detalleDeProductos', {product, products});
    },
    listado: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productos', {products, finalPrice});
    },
}

module.exports = controller;
