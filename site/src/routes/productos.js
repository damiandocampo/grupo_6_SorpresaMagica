const express = require('express');
const router = express.Router();

router.get('/detalle',(req,res) => {
    res.send('detalleDeProductos');
});

router.get('/carritoDeCompras',(req,res) => {
    res.send('carritoDeCompras');
});
