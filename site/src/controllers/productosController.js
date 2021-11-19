const db = require('../database/models');
const sequelize = db.Sequelize;

const finalPrice = (price, discount) => price - (price * discount / 100);

const controller = {
    detalle: (req,res) => {
        db.Product.findByPk(+req.params.id)

        .then(product => {
            db.Product.findAll()
            .then(products => {
                res.render('detalleDeProductos', {product, products});
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
        db.Product.findAll()

        .then(products => {
            res.render('productos', {products})
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;
