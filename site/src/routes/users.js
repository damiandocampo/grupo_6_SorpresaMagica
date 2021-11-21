const express = require('express');
const router = express.Router();
const path = require('path');

const { login, registro, register, logear, logout, perfil, editarDatos } = require('../controllers/userController');
const guestCheck = require('../middlewares/guestCheck');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/validateRegister');
//const userEditValidator = require('../validations/editUserValidator');

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

// login
router.get('/login', guestCheck, login);
router.post('/login', loginValidator, logear);

// registr0
router.get('/registro',guestCheck, registro);
router.post('/registro', upload.single('image'), registerValidator, register);

// perfil
router.get('/perfil', perfil);
router.put('/edit', editarDatos)

// logout
router.get('/logout', logout);

module.exports = router;
