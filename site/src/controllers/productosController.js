const db = require('../database/models');
const sequelize = db.Sequelize;

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
                res.render('detalleDeProductos', {product, relatedProducts, categories, finalPrice});
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

        let orden
        
        if(req.query.orderBy && req.query.orderBy === 'za') {
            orden = [['title', 'DESC']]
        } else if(req.query.orderBy && req.query.orderBy === 'menorPrecio') {
            orden = [['price', 'ASC']]
        } else if(req.query.orderBy && req.query.orderBy === 'mayorPrecio') {
            orden = [['price', 'DESC']]
        } else {
            orden = [['title', 'ASC']]
        }
        
        const products = db.Products.findAll({
                include: [{association: 'brand'}],
                order: orden,
        })

        const categories = db.Categories.findAll()

        const brands = db.Brands.findAll()

        Promise.all([products, categories, brands])

        .then(([products, categories, brands]) => {

            const productosDesc = products.filter(producto => producto.discount!==0)
            const descuentos = productosDesc.map(producto => producto.discount)
            const discounts = [...new Set(descuentos)]

            //filtros
            let productos = []

            if(req.query.c) {
                const categorias = Array.isArray(req.query.c)? req.query.c : [req.query.c];
                categorias.forEach(categoria => {
                    let producto = products.filter(product => product.category_id === +categoria)
                    productos = productos.concat(producto)
                })
                products = productos
            }

            if(req.query.m) {
                const marcas = Array.isArray(req.query.m)? req.query.m : [req.query.m];
                marcas.forEach(marca => {
                    let producto = products.filter(product => product.brand_id === +marca)
                    productos = productos.concat(producto)
                })
                products = productos
            }

            if(req.query.d) {
                const descuentos = Array.isArray(req.query.d)? req.query.d : [req.query.d];
                descuentos.forEach(descuento => {
                    let producto = products.filter(product => product.discount === +descuento)
                    productos = productos.concat(producto)
                })
                products = productos
            }

            if(req.query.c && req.query.m || req.query.c && req.query.d || req.query.m && req.query.d) {
                products = productos.filter((producto, index) => {
                    return productos.indexOf(producto) !== index;
                })
            }

            if(req.query.c && req.query.m && req.query.d) {
                productos = productos.filter((producto, index) => {
                    return productos.indexOf(producto) !== index;
                })
                products = productos.filter((producto, index) => {
                    return productos.indexOf(producto) !== index;
                })
            }

            res.render('productos', {products, categories, brands, discounts, finalPrice});
        })

        .catch(err => {
            res.send(err)
        })
    },
}

module.exports = controller;
