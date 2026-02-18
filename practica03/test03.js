'use strict'

let a = 5;
let b = 3;
let c = 1;
let d = 8;

function f(x){
	console.log(x)
	x = x+1;
	console.log(x)
}

f(a);
f(b);


function cambiarValor(x) {
    x = 100; // Se modifica solo dentro de la función
    console.log("Dentro de la función, x =", x);
}

let num = 42;
console.log("Antes de llamar a la función, num =", num);
cambiarValor(num);
console.log("Después de llamar a la función, num =", num);


//Uso de valores por omisión en parámetros
function saludar(x){
	console.log('Hola', x)
};

let x= "Jose"
saludar(); // Usa el valor por defecto "undefined"
saludar(x); // Usa "Jose"
