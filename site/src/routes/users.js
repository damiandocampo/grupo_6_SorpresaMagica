const express = require('express');
const router = express.Router();
const { login, registro, registre} = require('../controllers/userController');
const guestCheck = require('../middlewares/guestCheck');

/* GET users listing. */

router.get('/login', guestCheck, login);

router.get('/registro', guestCheck, registro);
router.post('/registro', registre);

module.exports = router;
