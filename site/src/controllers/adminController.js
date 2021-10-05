const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    list: function(req, res, next) {
        res.render('./admin/admin', {products});
    },
    create: function(req, res, next) {
        res.render('./admin/create');
    },
    store: (req, res) => {
		const product = req.body;
		product.id = products.length + 1;
		product.image = req.file ? req.file.filename : 'defaultImage.png';

		products.push(product);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect('/productos')
	},
    edit: function(req, res, next) {
        res.render('./admin/edit');
    },
};

module.exports = controller;