const express = require('express');
const router = express.Router();
const {detalle} = require('../controllers/productosController')

router.get('/detalle/:id', detalle);

module.exports = router;