const express = require('express');
const router = express.Router();
const fs = require('fs');
const path =require('path');

/******************* Ejemplos de rutas ********************* */
//base url /ejemplo_rutas
  //veamos que retorna el __dirname
    //res.send(__dirname);  //retorna /home/kuark/Escritorio/node/express/5_rutas_get_post/routes
        
    const file = path.join(__dirname,'../settings/datos.json');
    const data = fs.readFileSync(file);
    const parseado= JSON.parse(data);
    

//retornar un json completo (package.json)
router.get('/api', (req,res)=> {
    res.json({data:parseado});          //retorna todo el json
})


//retornar el objeto1 del json
router.get('/api-objeto1',(req,res)=>{
    res.json({data:parseado.objeto1});      //{"data":{"name":"soy el bobjeto1","descripcion":"asi estamos"}}
})

//retornar el name del objeto1 del json
router.get('/api-objeto1-name',(req,res)=>{
    res.json({data:parseado.objeto1.name});     //{"data":"soy el bobjeto1"}
})

//encontrar parametros por rutas
router.get('/api/:id', (req,res)=>{
    //Para recuperar info del url debe llamarce igual
    const id= req.params.id;
    //res.send(id); //retorna el id que pusimos en la ruta

    /* arreglo.find() es un metodo de javascript (ver arreglos)    */
    const encontrado = parseado.arreglo_de_objetos.find( function (par)  {return par.id});
    //const encontrado = parseado.arreglo_de_objetos.find( par => par.id);
    res.json({encontrado:encontrado});
    
})

//querys la url /ejemplo_rutas/api/query/search?par1=123&par2=456
router.get('/api/query/search', (req,res)=>{ 
    //const consulta = req.query;
    //res.send(consulta);             //retorna {"par1":"123","par2":"456"}
    const consulta2 =req.query.par1;
    res.send(consulta2);                //retorna 123
})

module.exports = router;