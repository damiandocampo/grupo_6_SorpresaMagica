const express = require('express');
const router = express.Router();
const {detalle} = require('../controllers/productosController')

router.get('/detalle', detalle);
























/*router.delete('/delete/:id', productosBorrados);*/



module.exports = router;