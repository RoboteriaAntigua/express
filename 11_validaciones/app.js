/*****************************************************************************************************/
/*                  Validaciones con express                                                        **/
/*
        -> instancia del express validator
                const {body,validationResult} = require('express-validator');

        ->en el ruteo le agrego un arreglo con las validaciones:
            app.post(ruta, [arreglo de validacion],(req,res)=>{})

        ->el arreglo de validaciones:
            body('campo','mensaje de error').metodos_de_validacion()

        ->recupero el resultado de la validacion:
            const errors= validationResult(req);
            
        ->proceso la validacion (en esta pagina app.js y en la vista index.ejs se ve claro)
*/
/*****************************************************************************************************/


const express = require('express');
const app = express();

/* Para acceder a metodos post sin el router de express hace falta body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })) //false dice que solo string, no imagenes ni multimedia


//instancia del express validator
const {body,validationResult} = require('express-validator');

//Establesco ejs para las vistas    (set)
app.set('view engine','ejs');

//home (el formulario)

app.get('/',(req,res,next)=>{
    console.log('raiz')
    res.render('index',{mensaje:""});       //mando mensaje vacio que luego sera utilizado
})


//Un arreglo para la validacion
app.post('/registrar', [
    body('nombre','Error en el nombre, debe ser de 8 caracteres')
        .exists()                                       //valida que se halla ingresado algo
        .isLength({min:8}),                             //valida Un tamaño
    body('email','Ingrese el email correctamente')                                    
        .isEmail()                                     //Controla que sea de tipo email y exista
],
(req,res)=>{
    //La validacion en si
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        const   errores= errors.array();
        var mensaje="";
        //Por cada error cargado en el arreglo guardo en la variable mensaje y luego recargo la pagina, mostrando los errores
        errores.forEach(element => {
            console.log(element);
            mensaje += element.msg;
            console.log(mensaje);
        });
        res.render('index',{mensaje})               //renderizo pero esta vez con el mensaje de error lleno
    }

    //Recupero los datos
   var nombre = req.body.nombre;
   var email = req.body.email;
    console.log("Datos obtenidos: "+nombre+" "+email);
})



app.listen(3000,()=>{
    console.log('servidor iniciado en el 3000')
})