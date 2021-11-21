const db = require('../database/models');
const sequelize = db.Sequelize;

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    detalle: (req,res) => {
        const product = db.Products.findOne({
            where: {id: +req.params.id},
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        Promise.all([product, categories])

        .then(([product, categories]) => {

            db.Products.findAll( {
                include: [{association: 'brand'}],
                where: {category_id: product.category_id},
                limit: 3
            })

            .then(relatedProducts => {
                res.render('detalleDeProductos', {product, relatedProducts, categories});
            })

            .catch(err => {
                res.send(err)
            })
        })

        .catch(err => {
            res.send(err)
        })
    },

    listado: (req, res) => {
        const products = db.Products.findAll({
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([products, categories, brands])

        .then(([products, categories, brands]) => {
            res.render('productos', {products, categories, brands, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;
