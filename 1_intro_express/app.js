/*************************************************************************************************/
/*     
        Motor de vistas ejs,
        como renderizar vistas desde routes/index.js
        Interpolacion de variables
                                                                                                */
/************************************************************************************************/
/* indice:
  1-Ruteo:
          ver en /routes/index.js.
          En app.js solamente decimos cual es la url base
  
  2-Interpolacion:
          Vease como desde el router /routes/index.js le pasamos variables a la ruta y a
          la vista llamada interpolacion.ejs

  3- Archivos estaticos Aqui vemos un ejemplo de como llamar al metodo express.static
     para su posterior uso sin problemas

  4- Motor de vistas: ejs veace en las vistas varios ejemplos

  5- Variables de entorno:
        Como en php se guardan en el .env (crearlo manualmente).
        Variables utiles para conectarce a base de datos y otras cuestiones.
        Instalar el dotenv: npm i dotenv
        Definir variable en el .env asi: 
                                        variable1=algo
        usar:
            require ('dotenv').config({path:'./.env'}); 
            let variable_traida = process.env.variable1;
  */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//---------------- El motor de vistas ejs -------------------------------------------//
////Le decimos que motor usamos
app.set('view engine', 'ejs');  
//Le decimos a donde estan las vistas
app.set('views', __dirname+'/views'); //o sino: app.set('views', './views');  
//-------------------------------------------------------------------------------------//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Los archivos estaticos como .html, .css, imagenes 
//se definen con estos metodos para su correcto uso
app.use(express.static(path.join(__dirname, 'public')));

//Le pasamos una url base al router
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Le dicemos a donde estan nuestras variables de entorno (.env)
require ('dotenv').config({path:'./.env'});

//Me traigo la variable de entorno que definimos en el .env llamada variable1
let variable_traida = process.env.variable1;
console.log('la variable de entorno es: '+ variable_traida);

module.exports = app;

