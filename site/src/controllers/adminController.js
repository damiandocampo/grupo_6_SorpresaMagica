const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.Sequelize;
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');

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
    list: function(req, res, next) {
        const products = db.Products.findAll({
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        Promise.all([products, categories])

        .then(([products, categories]) => {
            res.render('./admin/admin', {products, categories, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },

    create: function(req, res, next) {

        db.Categories.findAll()

        .then(categories => {
            res.render('./admin/create', {categories});
        })

        .catch(err => {
            res.send(err)
        })
        
    },

    store: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Brands.findAll()

            .then(brands => {
                //crear marca si no existe
                if(!(brands.find(brand => brand.name === req.body.marca))) {

                    db.Brands.create({
                        name: req.body.marca
                    })

                    .then(brand => {
                        //crear producto con la nueva marca
                        db.Products.create({
                            title: req.body.title,
                            brand_id: brand.id,
                            price: req.body.price,
                            discount: req.body.descuento? req.body.descuento : 0,
                            category_id: req.body.categoria? req.body.categoria : 0,
                            featured_product: req.body.destacado,
                            description: req.body.descripcion,
                            image: req.file ? req.file.filename : 'defaultImage.png',
                        })

                        .then(product => {
                            res.redirect(`/admin#${product.id}`);
                        })

                        .catch(err => {
                            res.send(err)
                        })

                    })

                    .catch(err => {
                        res.send(err)
                    })

                } else {
                    //encontrar la marca que coincida
                    db.Brands.findOne({
                        where: {name: req.body.marca}
                    })

                    .then(brand => {
                        //crear producto con la marca existente
                        db.Products.create({
                            title: req.body.title,
                            brand_id: brand.id,
                            price: req.body.price,
                            discount: req.body.descuento? req.body.descuento : 0,
                            category_id: req.body.categoria? req.body.categoria : 0,
                            featured_product: req.body.destacado,
                            description: req.body.descripcion,
                            image: req.file ? req.file.filename : 'defaultImage.png',
                        })

                        .then(product => {
                            res.redirect(`/admin#${product.id}`);
                        })

                        .catch(err => {
                            res.send(err)
                        })

                    })

                    .catch(err => {
                        res.send(err)
                    })

                }
            })

            .catch(err => {
                res.send(err)
            })

        } else {

            db.Categories.findAll()

            .then(categories => {
                res.render('./admin/create', {categories, errors: errors.mapped(), old: req.body});
            })

            .catch(err => {
                res.send(err)
            })
        };
	},

    edit: function(req, res, next) {

        const product = db.Products.findOne({
            where: {id: req.params.id},
            include: [{association: 'brand'}]
        })

        const categories = db.Categories.findAll()

        Promise.all([product, categories])

        .then(([product, categories]) => {
            res.render('./admin/edit', {product, categories});
        })

        .catch(err => {
            res.send(err)
        })
    },

    update: (req, res) =>{
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Brands.findAll()

            .then(brands => {
                //crear marca si no existe
                if(!(brands.find(brand => brand.name === req.body.marca))) {

                    const product = db.Products.findOne({
                        where: {id: req.params.id},
                    })
        
                    const brand = db.Brands.create({
                        name: req.body.marca
                    })
        
                    Promise.all([product, brand])

                    .then(([product, brand]) => {

                        //editar producto con la nueva marca

                        db.Products.update({
                            title: req.body.title,
                            brand_id: brand.id,
                            price: req.body.price,
                            discount: req.body.descuento? req.body.descuento : 0,
                            category_id: req.body.categoria,
                            featured_product: req.body.destacado,
                            description: req.body.descripcion,
                            image: req.file ? req.file.filename : product.image,
                        },{
                            where: {id: req.params.id}
                        })

                        .then(product => {
                            res.redirect(`/admin#${req.params.id}`);
                        })

                        .catch(err => {
                            res.send(err)
                        })

                    })

                    .catch(err => {
                        res.send(err)
                    })

                } else {
                    //encontrar la marca que coincida

                    const product = db.Products.findOne({
                        where: {id: req.params.id},
                    })
        
                    const brand = db.Brands.findOne({
                        where: {name: req.body.marca}
                    })
        
                    Promise.all([product, brand])

                    .then(([product, brand]) => {

                        //editar producto con la marca existente
                        
                        db.Products.update({
                            title: req.body.title,
                            brand_id: brand.id,
                            price: req.body.price,
                            discount: req.body.descuento? req.body.descuento : 0,
                            category_id: req.body.categoria,
                            featured_product: req.body.destacado,
                            description: req.body.descripcion,
                            image: req.file ? req.file.filename : product.image,
                        },{
                            where: {id: req.params.id}
                        })

                        .then(product => {
                            res.redirect(`/admin#${req.params.id}`);
                        })

                        .catch(err => {
                            res.send(err)
                        })

                    })

                    .catch(err => {
                        res.send(err)
                    })

                }
            })

            .catch(err => {
                res.send(err)
            })

        }else{

            const product = db.Products.findOne({
                where: {id: req.params.id},
                include: [{association: 'brand'}]
            })

            const categories = db.Categories.findAll()

            Promise.all([product, categories])

            .then(([product, categories]) => {
                res.render('./admin/edit', {product, categories, errors: errors.mapped()})
            })

            .catch(err => {
                res.send(err)
            })
        }
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
            res.render('./admin/admin', {products, categories, brands, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
    
    destroy: (req,res) => {

        db.Products.findOne({
            where: {id: req.params.id}
        })

        .then(product => {

            if(product.image !== 'defaultImage.png') {
                fs.unlink(`public/images/productos/${product.image}`, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('La imágen fue eliminada');
                    }
                })
            }

            db.Products.destroy({
                where: {id: +req.params.id}
            })

            .then(result => {
                res.redirect('/admin')
            })

            .catch(err => {
                res.send(err)
            })

        })

        .catch(err => {
            res.send(err)
        })
        
    }
};

module.exports = controller;