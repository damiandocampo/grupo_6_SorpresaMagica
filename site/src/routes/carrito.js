var express = require('express');
var router = express.Router();
const { carrito } = require('../controllers/carritoController')

router.get('/carrito', carrito);

module.exports = router;