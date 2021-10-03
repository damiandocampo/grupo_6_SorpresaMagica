const express = require('express');
const router = express.Router();
const {detalle, listado} = require('../controllers/productosController');

router.get('/detalle', detalle);
router.get('/', listado)

module.exports = router;