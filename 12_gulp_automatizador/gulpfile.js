var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

//Minificar css (ver en public/css/styles.css que hay varias clases que no se usan)
gulp.task('minificarCSS', ()=>{
    console.log('minificando css');
    return gulp.src('./public/css/*.css')                               //ignora el set de carpeta public
                            .pipe(cleanCSS({ compatibility: 'ie8' }))
                            .pipe(rename({ suffix: '.min' }))
                            .pipe(gulp.dest('dist/css'));  
})

gulp.task('otra-tarea',()=>{
    console.log('otra tarea');
})

//run all tareas en gulp <4 (en version 4 cambia)
/*gulp.task('default', ['minificarCSS','otra-tarea'], ()=>{
    console.log('corriendo todas las tareas');
    //gulp.watch('public/css', ['minificarCSS'])
});
*/

//Run all tareas en gulp 4 
gulp.task("default", gulp.series('minificarCSS','otra-tarea'));

//faltaria sincronizar con el navegador y gulp.watch() para supervisar cierta carpeta a cambios