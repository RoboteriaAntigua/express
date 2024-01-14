/**********************************************************************************************************/
/*          Conectarse a mysql, uar el orm (todo de forma manual).  5 pasos                 */
/**********************************************************************************************************/

const express = require('express');

//1- traigo el modulo
const Sequelize_clase = require('sequelize');
const app = express();

//2- Instancio el modulo, en el constructor los parametros de conexion a la db
const instancia_seq = new Sequelize_clase('postres_db','tete','123', 
                {
                    host:'localhost',
                    dialect: 'mysql',
                });

//3- Definimos el modelo: (hace falta decir que columnas y tipos son)
const orm = instancia_seq.define('postres',
{
    "id": {type:Sequelize_clase.INTEGER, primaryKey:true},
    "nombre":Sequelize_clase.STRING,
    "calorias":Sequelize_clase.INTEGER
});

//4- Conexion y autenticacion como promesa
instancia_seq.authenticate()
    .then( () => {console.log("conectados a la db")})
    .catch( error =>{console.log(error)});

//5-Usamos el orm. Metodo findAll
orm.findAll( {attributes:['nombre','calorias']})
    .then( como_postres => {
        //como_postres es un objeto con todos los datos traidos
        console.log(como_postres[0].nombre)                        // imprime el nombre del primer campo
        const encadenado = JSON.stringify(como_postres)            //Imprimo como string todo lo que traje
        console.log(encadenado); })


app.listen(3000, ()=>{console.log("servidor iniciado")})