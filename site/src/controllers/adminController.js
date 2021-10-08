const fs = require('fs');
const path = require('path');
const router = require('../routes/admin');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    list: function(req, res, next) {
        res.render('./admin/admin', {products});
    },
    create: function(req, res, next) {
        res.render('./admin/create');
    },
    edit: function(req, res, next) {
        const product = products.find(e => e.id === +req.params.id)
        res.render('./admin/edit', {product});
    },
    update: (req, res) =>{
        const productUpdate = products.find(product => product.id === +req.params.id)
        const { marca, title, price, categoria, descuento,} = req.body
        if(productUpdate) {
            productUpdate.marca = marca
            productUpdate.title = title
            productUpdate.price = +price
            productUpdate.categoria = categoria
            productUpdate.descuento = +descuento

            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

            res.redirect(`/productos/detalle/${req.params.id}`)
        }else{
            res.redirect('/')
        }
    }
};

module.exports = controller;