const db = require('../database/models');
const sequelize = db.Sequelize;
const session = require('express-session');

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    index: (req, res, next) => {
        db.Products.findAll()

        .then(products => {
            db.Categories.findAll()

            .then(categorias => {
                res.render('index', {products, categorias, finalPrice});
            })

            .catch(err => {
                res.send(err)
            })
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;