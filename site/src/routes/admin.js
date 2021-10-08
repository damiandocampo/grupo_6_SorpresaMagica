const express = require('express');
const router = express.Router();
const {list, create, edit, update, destroy} = require('../controllers/adminController')


router.get('/', list);
router.get('/create', create);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit);
router.put('/edit/:id', update)
router.delete('/delete/:id', destroy);

module.exports = router;