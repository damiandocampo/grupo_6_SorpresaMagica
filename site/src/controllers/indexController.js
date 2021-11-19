const db = require('../database/models');
const sequelize = db.Sequelize;
const session = require('express-session');

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    index: (req, res, next) => {
        const products = db.Products.findAll({
            where: {featured_product: 1},
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        Promise.all([products, categories])

        .then(({products, categories}) => {
            res.render('index', {products, categories, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;