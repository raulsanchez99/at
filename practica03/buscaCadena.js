'use strict'

function busca_cadena(cad1, cad2){
	if (arguments.length != 2){
		throw 'Error: Numero de argumentos incorrecto';
	}

	if (cad1.length != 1){
		throw 'Error: La primera cadena debe tener longitud 1';
	}

	let contador= 0;
	for (let x of cad2){
		if(cad1.includes(x)){
			contador++;
		}
	}
	return contador;
}

try {
	console.log(busca_cadena("x","xyz")); //Hay 1
	console.log(busca_cadena("1","pov")); //No hay coincidencias
	console.log(busca_cadena("a","abcaA")); //Hay 2
	console.log(busca_cadena("ab","abcaA")); //Error

}catch (e){
	console.log(e);
}
