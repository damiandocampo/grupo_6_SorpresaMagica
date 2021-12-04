const express = require('express');
const router = express.Router();
const {index, buscar} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index);
router.get('/buscar', buscar);

module.exports = router;
