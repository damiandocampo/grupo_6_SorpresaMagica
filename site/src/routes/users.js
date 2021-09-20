var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/login',(req,res) => {
  res.send('login');
});

router.get('/registro',(req,res) => {
  res.send('registro');
});

module.exports = router;
