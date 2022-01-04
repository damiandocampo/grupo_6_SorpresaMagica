const db = require('../database/models');
const sequelize = db.Sequelize;
const session = require('express-session');
const { Op } = require("sequelize");

const finalPrice = (price, discount) => {
    let precio = price - (price * discount / 100)
    let precioString = precio.toString()
    if(precioString.indexOf('.')>=0) {
        let fin = precioString.indexOf('.')
        return +precioString.slice(0, fin)
    } else {
        return precio
    }
}

const controller = {
    index: (req, res, next) => {
        
        const products = db.Products.findAll({
            where: {featured_product: 1},
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        Promise.all([products, categories])

        .then(([products, categories]) => {
            res.render('index', {products, categories, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },

    buscar: (req, res) => {

        const keywords = req.query.keywords.toLowerCase().trim();

        const products = db.Products.findAll({
            where: {
                [Op.or]: [
                    {title:
                        {[Op.substring]: keywords}
                    },
                    {description:
                        {[Op.substring]: keywords}
                    },
                    {brand_id:
                        {[Op.substring]: keywords}
                    }
                ]
            },
            include: [{association: 'brand'}]
        })

        const brands = db.Brands.findAll()

        const categories = db.Categories.findAll()

        Promise.all([products, categories, brands])

        .then(([products, categories, brands]) => {
            res.render('resultadosDeBusqueda', {products, categories, brands, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;