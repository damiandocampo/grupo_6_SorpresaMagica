const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    detalle: (req,res) => {
        const {id} = req.params
        const product = products.find(element => element.id === +id)

        res.render('detalleDeProductos', {product, products});
    },
}

module.exports = controller;