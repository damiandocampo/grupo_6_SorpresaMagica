var express = require('express');
var router = express.Router();
const { login, registro, registre} = require('../controllers/userController')

/* GET users listing. */

























router.get('/login', login);

router.get('/registro', registro);
router.post('/registro', registre)
module.exports = router;
