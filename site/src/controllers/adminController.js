const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    list: function(req, res, next) {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./admin/admin', {products, finalPrice});
    },

    create: function(req, res, next) {
        res.render('./admin/create');
    },

    store: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const product = req.body;
            product.id = products.length + 1;
            product.image = req.file ? req.file.filename : 'defaultImage.png';
            product.price = +req.body.price;
            product.descuento = +req.body.descuento;

            products.push(product);

            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

            res.redirect(`/productos/detalle/${product.id}`);
        } else {
            res.render('./admin/create', {errors: errors.mapped(), old: req.body});
        };
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
    },
    
    destroy: (req,res) => {
    let productosBorrados = products.filter(producto => producto.id !== +req.params.id)
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productos.json'),JSON.stringify(productosBorrados, null, 2), 'utf-8')
        return res.redirect('/admin')
    }
};

module.exports = controller;