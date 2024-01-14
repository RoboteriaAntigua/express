/**************************************************************************************/
/*
/*
  *     Cookies y sesiones
            Cookies -> lado cliente
            sesion  -> lado servidor
        
        Operadores ternarios:
            //Si esto existe le sumamos 1, si no existe decimos que vale 1
            esto = esto ? ++ esto : 1;
            //Lo mismo que decir:    
            if(esto>0){esto++;}else{esto=1;} 

    vamos a usar las sesiones y cookies, de dos formas, con y sin base de datos:
        1) Simple:
        Como funcionan las cookies y sesiones:
            En este ejemplo no guardamos en una tabla, se guarda en memoria en el server y en el navegador del cliente.
            Por defecto express crea una cookie en el cliente llamada: connect.sid.
            Cada vez que entramos en esta pagina, el navegador(cliente) manda al server 
            toda la info de cookies (req.session)
            Pero de esta forma, si cortamos el servidor y reanudamos se pierden las cookies.

        2) Para guardar la sesion en sql:
            -> instalar: npm i express-mysql-session
            ->crear una base de datos en sql
            -> El modulo se encarga de crear las tablas, hay que definir un
                objeto con las opciones de conexion y configurar (ver mas abajo)
            ->const mysqlstore=require('express-mysql-session')(session);
            ->const sesionStore = new mysqlstore(options);  
            ->app.use(cosas ver abajo)

            Listo se crea automaticamente tabla en la db y en la columna data le guardamos un objeto 
            con todo la infor asociada que quisieramos (ver req.session.algo), ademas se guarda un tocken y otras cosas

**************************************************************************************/

const express = require('express');
const app = express();

//Modulo para las sesiones
const session = require('express-session');

//************************** */  1) Ejemplo simple  **************************************************  
//Usamos la sesion

app.use(session({
    secret:'cualquiera',
    resave:'true',
    saveUninitialized:'true'
}))

//Ejemplo de contador de visitas
//Ejemplo simple de contador de visitas (sin base de datos)
app.get('/',(req,res)=>{
    //Para el coockie connect.sid (generado auto) le asigno estos atributos (.usuario y .roll y .visitas)
    req.session.usuario='juan';             //guardo en memoria en el server estos datos
    req.session.roll='admin';               
    //Operadores ternarios
    //Si esto existe le sumamos 1, si no existe decimos que vale 1
    req.session.visitas = req.session.visitas ? ++ req.session.visitas : 1;
    res.send(`Recuperado del cookie del navegador, usuario: ${req.session.usuario} ha visitado la pagina: ${req.session.visitas} veces`);
})

/**********fin ejemplo simple ***********************************************************************/


/************************************************************************************************** */
//2) Ejemplo con persistencia de datos (tabla sql) en lado servidor
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host:'localhost',
    port:3306,
    user:'tete',
    password:'123',
    database:'prueba_sesion'
}

//Esta instancia crea la tabla automaticamente con estos parametros de conexion
const sessionStore = new MySQLStore(options);  

//Usamos la sesion pero en mysql
app.use(session({
    key:'profesorx',         //nombre de la cookie a guardar
    secret:'cualquiera2',
    store:sessionStore,
    resave:false,
    saveUninitialized:false
}))


app.get('/consql',(req,res)=>{
    //Info asociada a la cookie que creamos, y guardada en la tabla en la columna 'data' como un objeto js
    req.session.usuario='juan';     
    req.session.roll='admin';
    //Operadores ternarios
    //Si esto existe le sumamos 1, si no existe decimos que vale 1
    req.session.visitas = req.session.visitas ? ++ req.session.visitas : 1;
    res.send(`Recuperado del cookie del navegador, usuario: ${req.session.usuario} ha visitado la pagina: ${req.session.visitas} veces`);
})

/*************************************Fin ejemplo con sql********************************** */
app.listen(3001,()=>{
    console.log('corriendo');
})