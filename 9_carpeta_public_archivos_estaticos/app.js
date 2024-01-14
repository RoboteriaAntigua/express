/*******************************************************************************************/
/*              Sobre los archivos estaticos (images,css)
                    carpeta public predefinida:         
                      
                    -> app.use(express.static('ruta'));
                        Digo que en 'ruta' estaran disponibles los css, las imagenes y los js 
                        se define asi:
                              <link href="css/styles.css" rel="stylesheet">
                              o
                                <img src="images/mami_java.jpg" class="imagenes">
                        
                    -> En realidad la forma correcta es la ruta absoluta: 
                         app.use('/nombre_eleccion',express.static(__dirname+'/public'));
                         y se accede:
                         <link href="nombre_eleccion/css/styles.css">
                
                    ->__dirname retorna la carpeta actual del proyecto (en cualquier maquina)
    
                                                                                             */
/*********************************************************************************************/

const express = require('express');
const app = express();

//Usamos el motor de plantillas ejs
app.set('view engine', 'ejs');

//Para poder usar los archivos estaticos en la carpeta public, express.static('ruta'):
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.ejs');    //extencion opcional
})

app.listen(3000, () => {
    console.log('servidor corriendo en el 3000');
})