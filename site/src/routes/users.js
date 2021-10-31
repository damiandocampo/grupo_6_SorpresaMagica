const express = require('express');
const router = express.Router();
const path = require('path');

const { login, registro, registre, logear, logout, perfil} = require('../controllers/userController');
const guestCheck = require('../middlewares/guestCheck');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/validateRegister')

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images/usuarios')
    },
    filename: function (req, file, callback) {
      callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
    }
});
  
const upload = multer({ storage: storage });

/* GET users listing. */

router.get('/login', guestCheck, login);
router.post('/login', loginValidator, logear);

router.get('/registro',guestCheck, registro);
router.post('/registro', upload.single('image'), registerValidator, registre);

router.get('/logout', logout);

router.get('/perfil', perfil);

module.exports = router;
