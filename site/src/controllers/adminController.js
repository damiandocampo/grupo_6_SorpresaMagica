const products = require('../data/productos.json');

const controller = {
    list: function(req, res, next) {
        res.render('./admin/admin', {products});
    },
    create: function(req, res, next) {
        res.render('./admin/create');
    },
    edit: function(req, res, next) {
        res.render('./admin/edit');
    },
};

module.exports = controller;