/******************************************************************/
/*  
        Como encriptar un password con el modulo bcryptjs   
        (hash de password)

        ->  Usar el modulo bcryptjs

        ->  encriptar con el metodo instancia_bcryptjs.hash(clave,numero)
                Siendo clave la clave a encriptar
                Siendo numero una forma de agregar complejidad y lentitud al encriptado
                                                                    
        ->  Comparar (no se desincripta se compara)
            instancia_bcryptjs.compare('comparador',encriptada)
                Siendo comparador lo que deseamos comparar
                Siendo encriptada la clave encriptada        
                */

/******************************************************************/

const express= require('express');
const app = express();

/*El paquete para el hash de password */
const bcryptjs=require('bcryptjs');
const password = "123456abc";

//El hash en cuestion
//async y await para que sea asincrona
app.get('/hash',async (req,res)=>{
    const encriptada =await bcryptjs.hash(password,8);
    res.send("El pass encriptado es:"+encriptada);

    const comparar = await bcryptjs.compare('123456bc',encriptada);
    if(comparar){
        console.log('si lo es');
    }else{
        console.log('pues no');
    }
})


const puerto = process.env.PORT || 3000;
app.listen(puerto,()=>{
    console.log('servidor corriendo en localhost:'+puerto||3000);
})