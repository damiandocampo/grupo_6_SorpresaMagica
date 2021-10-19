const express = require('express');
const router = express.Router();
const { login, registro, registre} = require('../controllers/userController')

/* GET users listing. */

router.get('/login', login);

router.get('/registro', registro);
router.post('/registro', registre)

module.exports = router;


// const guestCheck = require('../middlewares/guestCheck')

//router.get('/login', guestCheck, login);

//router.get('/registro', guestCheck, registro);