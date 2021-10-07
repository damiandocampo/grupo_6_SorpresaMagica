const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    list: function(req, res, next) {
        res.render('./admin/admin', {products, finalPrice});
    },
    create: function(req, res, next) {
        res.render('./admin/create');
    },
    store: (req, res) => {
		const product = req.body;
		product.id = products.length + 1;
		product.image = req.file ? req.file.filename : 'defaultImage.png';
        product.price = +req.body.price;
        product.descuento = +req.body.descuento;

		products.push(product);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect(`/productos/detalle/${product.id}`)
	},
    edit: function(req, res, next) {
        res.render('./admin/edit');
    },
};

module.exports = controller;