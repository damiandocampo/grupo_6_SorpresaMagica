const express = require('express');
const router = express.Router();
const {detalle, listado} = require('../controllers/productosController');

router.get('/', listado);
router.get('/detalle/:id', detalle);

module.exports = router;