/*****************************************************************************************/
/*
    -> Parametros por rutas en routes/ej_query_url

    -> Ejemplos de recuperacion de datos a travez de los verbos get y post:
        Para get es nesario
            var url = require('url');
            luego:
                (req,res)=>{
                var parseada =url.parse(req.url,true);
                var query_obj = parseada.query;
                	var Nombre =query_obj.Nombre;
                	var Email = query_obj.Email;

        Para post es nesesario:
            router o 
            const bodyParser = require('body-parser');
            app.use(bodyParser.urlencoded({ extended: false })) //false dice que solo string, no imagenes ni multimedia
            luego:
                (req,res)=>{
                let nombre = req.body.Nombre;
                let email = req.body.Email;
                                                                                        ***/
/******************************************************************************************/

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ejemploRouter = require('./routes/ej_query_url');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', usersRouter);
app.use('/ej_query_url',ejemploRouter);

/* traigo el modulo que creamos con el objeto js cuyo atributo es key */
const keys = require('./settings/keys');

/* establecemos */
app.set('clave',keys.clave);

module.exports = app;
