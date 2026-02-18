'use strict'

let cad1 = "hola";
let cad2 = "1";
let n = 1;
let b = true;

//Distintos tipos de conversiones
console.log(Number(cad1));; //Devuelve Nan, porque no se puede hacer la conversion
console.log(Number(cad2)); //1

console.log(isNaN(Number(cad1))); //true
console.log(isNaN(Number(cad2))); //false
console.log(isNaN(String(n))); //false

console.log(String(n)); //1

//Una función para hacer conversiones de booleanos
function booleanToString(x){
    if (!(typeof(x) === "boolean")){
        console.log("Not a boolean");
    }else{
        console.log(String(x));
    }
};

console.log(typeof(b)); //boolean
booleanToString(b); //true
booleanToString(cad1); //Not a boolean 
