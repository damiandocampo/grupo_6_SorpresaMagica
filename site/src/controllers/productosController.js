const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    detalle: (req,res) => {
        res.render('detalleDeProductos');
    },
    listado: (req, res) => {
        productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productos', {productos});
    },
}

module.exports = controller;