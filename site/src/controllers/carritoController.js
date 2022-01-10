const db = require('../database/models')

const controller = {
    carrito: (req,res) => {
        
        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([categories, brands])

        .then(([categories, brands]) => {
            res.render('carritoDeCompras', {categories, brands});
        })

        .catch(err => {
            res.send(err)
        })
        
    },
}

module.exports = controller;