const controller = {
    detalle: (req,res) => {
        res.render('detalleDeProductos');
    },
}

module.exports = controller;






















/*
const fs = require('fs)
const path = require('path')


const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','productos.json'),'utf-8'));

//let producto = {
    id: ...}

delete : (req,res) =>{
    let productosBorrados = productos.filter(producto => producto.id !== +req.params.id)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productos.json'),JSON.stringify(productosBorrados, null, 2), 'utf-8')

        return res.redirect('/admin')
*/