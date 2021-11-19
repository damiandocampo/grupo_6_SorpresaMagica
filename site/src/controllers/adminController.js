const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.Sequelize;

const { validationResult } = require('express-validator');

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    list: function(req, res, next) {
        db.Products.findAll({
            include: [{association: 'brand'}]
        })

        .then(products => {
            res.render('./admin/admin', {products, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },

    create: function(req, res, next) {
        res.render('./admin/create');
    },

    store: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Products.create({
                title: req.body.title,
                brand_id: req.body.marca,
                price: req.body.price,
                discount: req.body.descuento,
                category_id: req.body.categoria,
                featured_product: req.body.destacado,
                image: req.file ? req.file.filename : 'defaultImage.png',
            })
    
            .then(product => {
                res.redirect(`/productos/detalle/${product.id}`);
            })
    
            .catch(err => {
                res.send(err)
            })

        } else {
            res.render('./admin/create', {errors: errors.mapped(), old: req.body});
        };
	},

    edit: function(req, res, next) {
        db.Products.findOne({
            where: {id: req.params.id},
            include: [{association: 'brand'}]
        })

        .then(product => {
            res.render('./admin/edit', {product});
        })

        .catch(err => {
            res.send(err)
        })
    },

    update: (req, res) =>{
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Products.update({
                title: req.body.title,
                brand_id: req.body.marca,
                price: req.body.price,
                discount: req.body.descuento,
                category_id: req.body.categoria,
                featured_product: req.body.destacado,
                image: req.file ? req.file.filename : 'defaultImage.png',
            },{
                where: {id: +req.params.id}
            })
    
            .then(product => {
                res.redirect(`/productos/detalle/${req.params.id}`)
            })
    
            .catch(err => {
                res.send(err)
            })

        }else{
            res.render('./admin/edit', {errors: errors.mapped()})
        }
    },
    
    destroy: (req,res) => {
        db.Products.destroy({
            where: {id: +req.params.id}
        })

        .then(result => {
            res.redirect('/admin')
        })

        .catch(err => {
            res.send(err)
        })
    }
};

module.exports = controller;