var express = require('express');
var router = express.Router();
var url = require('url');

/******************* Ejemplos de recuperacion de form
 *                         POST y get               ********************* */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* La ruta del formulario get*/
router.get('/form-get', function(req, res, next) {
  res.render('Form_ejemplo', { title: 'Express' });
});

/* Hacia adonde va el formulario get */
router.get('/devolucion-get', function(req, res, next) {
  //parseamos la url
  var parseada =url.parse(req.url,true);
  var query_obj = parseada.query;

  //Proceso los datos obtenidos
	var Nombre =query_obj.Nombre;
	var Email = query_obj.Email;
	var Pais = query_obj.Pais;
  res.send("Datos obtenidos: "+Nombre+" "+Email+" "+Pais);
});

/* La ruta del formulario POST */
router.get('/form-post', function(req, res, next) {
  res.render('Form_ejemplo_post', { title: 'Express' });
});

/* Los datos de un form post van a la misma ruta pero otro metodo */
router.post('/form-post', function(req, res, next) {
    let nombre = req.body.Nombre;
    let email = req.body.Email;
    let pais =req.body.Pais;
    res.send("recuperado de post: "+nombre+" "+email+" "+pais);
  });

module.exports = router;


