var express = require('express');
var router = express.Router();
const path = require('path')
const multer  = require('multer');
const { login, registro, registre, logear} = require('../controllers/userController')

const loginValidator = require('../validations/loginValidator')
const registroValidator = require('../validations/registroValidator')

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

router.get('/login', login);
router.post('/login', loginValidator, logear)

router.get('/registro', registro);
router.post('/registro', upload.single('image'), registroValidator, registre)

module.exports = router;
