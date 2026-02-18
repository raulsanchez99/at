'use strict'

function crea_usuario(nombre, username, password){
	let usuario = {
		nombre:nombre,
		username:username,
		password:password,
	};
	return usuario;
}

//Devuelvo un array con los que cumplan la condicion
function busca_usuario(array, nombre){
	let r=[];
	for (let a of array){
		if (a.nombre === nombre){
			r.push(a);
		}
	}
	return r;
}

let usuario1 = crea_usuario("Maria", "M123", "12345");
let usuario2 = crea_usuario("Juan", "juanito", "abcde");
let usuario3 = crea_usuario("David", "deivid12", "constrasena");
let usuario4 = crea_usuario("Juan","Joaninho", "holamundo");

let array = [usuario1, usuario2, usuario3, usuario4];

console.log(busca_usuario(array, "Juan")); //Devuelve un array con ambos usuarios
console.log(busca_usuario(array, "Lucas")); //Devuelve una lista vacia, no hay
console.log(busca_usuario(array, "Maria")); //Devuelve el array del usuario

