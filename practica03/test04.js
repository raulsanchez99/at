'use strict'

//Función simple
function concatenaCadena(x, y='ADIOS'){
    return x=x+y;
}

//Funcion flecha
var f=(x,y='ADIOS')=> x=x+y;

//Como hay mas de un parámetros tengo que incluir los paréntesis

console.log(concatenaCadena('hola')); //holaADIOS
console.log(f('adios')); //adiosADIOS

