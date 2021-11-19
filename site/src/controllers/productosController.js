const db = require('../database/models');
const sequelize = db.Sequelize;

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    detalle: (req,res) => {
        const product = db.Product.findOne({
            where: {id: req.params.id},
            include: [{association: 'brand'}]
        })

        const relatedProducts = db.Product.findAll({
            where: {category_id: product.category_id},
            limit: 3
        })

        Promise.all([product, relatedProducts])

        .then(({product, relatedProducts}) => {
            res.render('detalleDeProductos', {product, relatedProducts});
        })

        .catch(err => {
            res.send(err)
        })
    },

    listado: (req, res) => {
        db.Products.findAll({
            include: [{association: 'brand'}]
        })

        .then(products => {
            res.render('productos', {products, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;
