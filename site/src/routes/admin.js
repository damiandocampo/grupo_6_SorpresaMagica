const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');

const {list, create, store, edit, update, destroy} = require('../controllers/adminController');
const adminCheck = require('../middlewares/adminCheck');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images/productos')
    },
    filename: function (req, file, callback) {
      callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
    }
});
  
const upload = multer({ storage: storage });

router.get('/', adminCheck, list);

router.get('/create', adminCheck, create);
router.post('/create', upload.single('image'), store);

router.get('/edit/:id', adminCheck, edit);
router.put('/edit/:id', update)

router.delete('/delete/:id', destroy);

module.exports = router;
