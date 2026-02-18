'use strict'

function contarChar(password, regex){
	var n = password.length - password.replace(regex, '').length;
	return n;
}

function busca_cadena(password, cad){
	if (arguments.length != 2){
		throw 'Error: Numero de argumentos incorrecto';
	}

	let contador = 0;
	for (let x of password){
		if(cad.includes(x)){
			contador++;
		}
	}
	return contador;
}

function validacion(password, len, minminus, minmayus, minnum, minesp, cad_esp){

	try{

		//Comprobacion de numero de argumentos
		if (arguments.length != 7){
			throw 'Error: Numero incorrecto de argumentos';
		}

		//Comprobacion de tipos
		if (typeof(password) != "string" || (typeof(len) != "number") 
		|| typeof(minminus) != "number" || typeof(minmayus) != "number" 
		|| typeof(minnum) != "number" || typeof(minesp) != "number" || typeof(cad_esp) != "string"){
			throw 'Error: Argumentos incorrectos';
		}

		//La longitud mínima de la contraseña para que sea válida
		if (password.length < len){
			return 'Error: La contraseña debe ser mas larga';
		}
		
		//Número mínimo de minúsculas
		if (contarChar(password, /[a-zñ]/g) < minminus){
			return 'Error: No hay suficientes minusculas';
		}

		//Número mínimo de mayúsculas
		if (contarChar(password, /[A-ZÑ]/g) < minmayus){
			return 'Error: No hay suficientes mayusculas';
		}

		//Número mínimo de digitos
		if (contarChar(password, /[0-9]/g) < minnum){
			return 'Error: No hay suficientes digitos';
		}

		//Número mínimo de caracteres especiales
		if(busca_cadena(password, cad_esp) < minesp){
			return 'Error: No hay suficientes caracteres especiales';
		}

	}catch(e){
		return e;
	}
	
	return 'ok';
} 
/*
console.log(validacion("HOla12.-0¿", 10, 2, 2, 2, 3, ",.-{}[]!\"·$%&/()=?¿¡'")); //Correcto
console.log(validacion("HOla12.-0¿", 10, 2, 2, 2, 4, ",.-{}[]!\"·$%&/()=?¿¡'")); //Numero de caracteres insuficientes
console.log(validacion("HOla2.-0¿", 10, 2, 2, 2, 5, ",.-{}[]!\"·$%&/()=?¿¡'")); //Contraseña corta
console.log(validacion("HOla12.-0¿", "jkrr", 2, 2, 2, 5, ",.-{}[]!\"·$%&/()=?¿¡'")); //Error argumentos

console.log(busca_cadena("HOla12.-0¿", "1234567890")) //Hay 3 numeros
console.log(busca_cadena("HOla12.-0¿", "abcdefghijklmnopqrstuvwxyz")) //Hay 2 minusculas
console.log(busca_cadena("HOla12.-0¿", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")) //Hay 2 mayusculas
console.log(busca_cadena("HOla12.-0¿", ",.-{}[]!\"·$%&/()=?¿¡'")) //Hay 3 caracteres especiales
*/
