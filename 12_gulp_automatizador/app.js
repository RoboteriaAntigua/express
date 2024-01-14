/*****************************************************************************************/
/*      Gulp (similar a grunt nodejs y a maven java)    */
/*****************************************************************************************/
var express = require('express');
var app = express();



////Le decimos que motor devistas usamos
app.set('view engine', 'ejs'); 

//Le decimos a donde estan las vistas
app.set('views', __dirname+'/views'); //o sino: app.set('views', './views');  

//para los estaticos
app.use(express.static('public'));


//ruta /
app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(3001,(req,res)=>{
    console.log('servidor corriendo en el 3001');
})

/*****************************************************************************************/
/*  
    Instalacion:
        Note que al instalar el gulp-cli estamos instalando 427 packetes, (el proyecto usa solo a unos 5 o 6)
            npm i gulp-cli  (descartado)
        instalacion correcta: 
            npm i gulp -g (por primera vez)
            npm i   gulp --save-dev   //no lo necesitamos en produccion solo en desarrollo
                    gulp-clean-css 
                    gulp-header 
                    gulp-less 
                    gulp-rename 

    Su uso:
        crear un archivo llamado gulpFile.js y en el alguna tarea.
        en el terminal poner gulp nombre-tarea, o solo gulp si la tarea es de nombre 'default'

    Metodos basicos de gulp:   
        gulp.task(), gulp.src(), gulp.dest() y gulp.watch().
        1-gulp.task() Define una tarea
                        Tiene 3 argumentos:
                            el nombre de la tarea
                            dependencias de otras tareas
                            la función a ejecutar
                Ejemplo: // Minify JS
                    gulp.task('nombre-tarea', [dependencias], function() {
                        return gulp.src('js/clean-blog.js')             //tarea
                            .pipe(uglify())                             //tarea
                            .pipe(header(banner, { pkg: pkg }))        //tarea
                            .pipe(rename({ suffix: '.min' }))        //tarea
                            .pipe(gulp.dest('js'))                  //destino
                    });

        2- gulp.src()
                Es la ruta adonde gulp toma los archivos que va a trabajar. 
                Puede ser una carpeta o un arreglo de carpetas.
                Utiliza comandos de unix(shell)
                Retorna un stream que puede ser “pipeado” a un plugin adicional ó hacia el método gulp.dest()

        3- gulp.det()
                    Adonde va a dejar los archivos con la tareas ya echas.


        4- gulp.watch()
                Observa archivos y realiza una acción cuando se modifica un archivo.
                Emite un evento.
                dos formas de uso:
                 1-   gulp.task('nombre-tarea', ()=>{
                         gulp.watch('public/css/*.css', ['nombre-de-otra-tarea] )
                     })
                 2-   gulp.task('nombre-tarea', ()=>{
                        gulp.watch('public/css/*.css', function(){} )
                    })
        5- gulp.series()
                    gulp.series('minificarCSS','otra-tarea')
                Realiza ejecución de tareas de manera secuencial
                (obligatorio para gulp 4 en mas)

        6- gulp.parallel()
                Realiza ejecución de tareas en paralelo
                Tiene de 2 argumentos:
                    El nombre de la/s tarea/s a ejecutar
                    Una función a ejecutar (opcional)



*/
/*****************************************************************************************/

/*      Conceptos previos 
                    funcionamiento:
        A diferencia de otras herramientas de este tipo, como Grunt, Gulp utiliza streams para la ejecución 
        de tareas y pipes para operaciones sobre streams. 
        Gestor para automatizar tareas como:

            Compilación de CSS y Javascript preprocesado
            Concatenación
            Minificación
            Lanzar un servidor para la recarga automática en el browser
            Creación de una build para despliegue
            Ejecución de tests unitarios
            Ejecución de herramientas para detectar errores en el código
            Gestionar el código en un repositorio

        
    Que es un Stream:
      Es un flujo de datos para el intercambio de información. Gulp utiliza el módulo Stream de Node.js. 
      
    PIPES:
        Tuberías(pipes) para realizar operaciones sobre un stream. 
        Las tuberías son un mecanismo para la comunicación y sincronización entre procesos.
        Basados en el patrón productor/consumidor
        Están implementadas de forma muy eficiente en los sistemas operativos
        Inician todos los procesos al mismo tiempo
        Atienden automáticamente los requerimientos de lectura de datos para cada proceso cuando los datos 
        son escritos por el proceso anterior
        */