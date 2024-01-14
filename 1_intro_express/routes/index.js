var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', { title: 'Con plantillas ', variable:'abc'}); //Mando dos variables
  //otra forma:
  //res.render('interpolacion', {title: 'Con plantillas', variable:'abc'});
});

var interpolo=123;
router.get('/interpolacion', function(req, res, next) {
  res.render('interpolacion', { interpolo}); //Mando variable
});
module.exports = router;
