const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');

const {list, create, edit, store} = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images/productos')
    },
    filename: function (req, file, callback) {
      callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
    }
});
  
const upload = multer({ storage: storage });

router.get('/', list);
router.get('/create', create);
router.post('/create', upload.single('image'), store);
router.get('/edit', edit);

module.exports = router;