const express = require('express');
const router = express.Router();
const {index, buscar, contacto} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index);
router.get('/buscar', buscar);

//contacto
router.get('/contacto', contacto);

module.exports = router;
