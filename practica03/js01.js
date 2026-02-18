'use strict'

//Función que reciba una distancia en metros y la devuelva en centímetros
function mtocm (x){
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

console.log("1 metro son", mtocm(1), "centimetros");
console.log("1 metro equivale a", mtopulgadas(1), "pulgadas");
console.log("1 metros son", mtoyardas(1), "yardas");
