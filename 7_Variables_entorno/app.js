/**********************************************************************************************************/
/*  Variables de entorno (el famoso .env)                                                                 */
/*           

    -> Usar las variables del .env 
        con el modulu dotenv indicando a donde esta el .env:
        require('dotenv').config({path:'./.env'});
    
    -> luego usar con process.env.VARIABLE
                                                                                                        ***/
/**********************************************************************************************************/

const express = require('express');
const app = express();
/* Usaremos el modulo dotenv    */
require('dotenv').config({path:'./.env'});

/* Traemos las variables de esta forma */
const puerto = process.env.PORT;
const variable_rara = process.env.VARIABLE_RARA;

// Si la variable no existe che ponele el 3000
const puerto2= process.env.PORT || 3000;

/* usamos las variables de entorno */
app.get('/aver',(req,res,next)=>{
    res.send('el puerto es: '+puerto+' la variable es: '+variable_rara);
})

app.listen(puerto,(req,res,next)=>{
    console.log('escuchando en el puerto: '+puerto);
})
