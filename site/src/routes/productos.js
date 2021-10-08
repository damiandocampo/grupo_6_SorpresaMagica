const express = require('express');
const router = express.Router();
const {detalle} = require('../controllers/productosController')

router.get('/detalle', detalle);

module.exports = router;