var express = require('express');
var router = express.Router();
const multer  = require('multer');
const { login, registro, registre} = require('../controllers/userController')

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

router.get('/registro', registro);
router.post('/registro', upload.single('image'), registre)
module.exports = router;
