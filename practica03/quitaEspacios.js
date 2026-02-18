'use strict'

//Funcion que recibe una cadena y sustituye los espacios en blanco por _
function quitaEspacios(cadena){
	return cadena.replace(/ /g, "_");
}

let cad = "Esto es una cadena de prueba";
cad = quitaEspacios(cad);
console.log(cad);
