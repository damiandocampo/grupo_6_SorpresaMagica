var express = require('express');
var router = express.Router();
const { login, registro, registre, logear} = require('../controllers/userController')

const loginValidator = require('../validations/loginValidator')
const registroValidator = require('../validations/registroValidator')

/* GET users listing. */

router.get('/login', login);
router.post('/login', loginValidator, logear)

router.get('/registro', registro);
router.post('/registro', registroValidator, registre)


/*router.get('/perfil', perfil)
router.get('/logout', logout)*/


module.exports = router;
