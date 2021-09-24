const express = require('express');
const router = express.Router();
const {list, create, edit} = require('../controllers/adminController')


router.get('/', list);
router.get('/create', create);
router.get('/edit', edit);

module.exports = router;