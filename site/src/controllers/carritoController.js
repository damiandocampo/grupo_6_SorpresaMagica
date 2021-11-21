const db = require('../database/models')

const controller = {
    carrito: (req,res) => {
        
        db.Categories.findAll()

        .then(categories => {
            res.render('carritoDeCompras', {categories});
        })

        .catch(err => {
            res.send(err)
        })
        
    },
}

module.exports = controller;