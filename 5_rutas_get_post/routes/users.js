var express = require('express');
var router = express.Router();

/* traigo el modulo jsonwebtokens */
var jwt = require('jsonwebtoken');


/* /login  pero llegamos con get */
router.get('/', function(req, res, next) {
  res.render('login_vista', {title:"login"});
});


//Faltaria verificar el token y ver como es el proceso, quizas traducir pagina oficial
/* /login  esta vez con post*/
router.post('/', function(req, res, next) {
  if( req.body.user == 'admin' && req.body.password =='12345'){

    //genero el token en su forma mas simple
    const payload = { check:true};
    const token = jwt.sign(payload,"clave secreta");
    res.json({
      un_mensaje: 'Ingresado correcatamente',
      token: token 
    });
  }else {
    res.send('COntraseña invalida')
  }
  
});

module.exports = router;
