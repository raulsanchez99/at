'use strict'

//Función que reciba una distancia en metros y la devuelva en centímetros
function mtocm(x){
        return x*100;
}

//Función que reciba una distancia en metros y la devuelva en pulgadas
function mtopulgadas(x){
        return x/0.0254;
}

//Función que reciba una distancia en metros y la devuelva en yardas
function mtoyardas(x){
        return x/0.9144
}


function convertir(distancia, medida){
        if (arguments.length != 2){
                return "Error: Numero incorrecto de parametros";
        }
        
        if (typeof(x)==="string"){
                x = Number(x);
        }

        let resultado="";

        if (medida === 'm'){
                resultado = String(distancia);
        }else if (medida === 'cm'){
                resultado = String(mtocm(distancia));
        }else if (medida === 'in'){
                resultado = String(mtopulgadas(distancia));
        }else if (medida === 'yd'){
                resultado = String(mtoyardas(distancia));
        }else if(medida ===''){
                return "Error: Medida no introducida";
        }else{
                return "Error: Medida incorrecta";
        }

        return resultado + " " + medida;
}

console.log(convertir(5)) //Error: Numero incorrecto de parametros
console.log(convertir(5, "")) //Error: Medida no introducida
console.log(convertir("5", "km")) //Error: Medida incorrecta

console.log(convertir("5", "m")) //5 m
console.log(convertir(5, "cm")) //500 cm
console.log(convertir("5", "in")) //196.8503937007874 in
console.log(convertir(5, "yd")) //5.468066491688539 yd





