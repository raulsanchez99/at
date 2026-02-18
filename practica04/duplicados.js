'use strict'

function contarDuplicados(lista) {
    const contador = new Map();
    const resultado = [];
 
    for (const item of lista){
        contador.set(item, (contador.get(item) || 0) + 1);
    }

    const leidos = new Set();

    for (const item of lista){
        //Cada elemento se debe leer una sola vez
        if (!leidos.has(item)){
            resultado.push([contador.get(item), item]);
            leidos.add(item);
        }
    }

    return resultado;

}

//Prueba
const cadena = ["Caña", "Te", "Caña", "Agua", "Rioja", "Rioja"];
console.log(contarDuplicados(cadena)); //[[2,"Caña"], [1,"Te"], [1,"Agua"], [2,"Rioja"]]
