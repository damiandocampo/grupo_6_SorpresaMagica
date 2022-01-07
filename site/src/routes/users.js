const express = require('express');
const router = express.Router();
const path = require('path');

const { login, registro, register, logear, logout, perfil, editarDatos, newPass } = require('../controllers/userController');
const guestCheck = require('../middlewares/guestCheck');
const userCheck = require('../middlewares/userCheck');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/validateRegister');
const userEditValidator = require('../validations/editUserValidator');
const newPassValidator = require('../validations/newPassValidator');

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


// login
router.get('/login', guestCheck, login);
router.post('/login', loginValidator, logear);

// registro
router.get('/registro',guestCheck, registro);
router.post('/registro', upload.single('image'), registerValidator, register);

// perfil
router.get('/perfil', userCheck, perfil);
router.put('/edit', userEditValidator, editarDatos);
router.put('/newPassword', newPassValidator, newPass);

// logout
router.get('/logout', logout);

module.exports = router;
