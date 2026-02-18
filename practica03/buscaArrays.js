'use strict'

// Función para buscar un elemento en un array de arrays
function buscaArrays(arrays, elemento) {
    
	// Verificar que se han pasado exactamente dos argumentos
    	if (arguments.length !== 2) {
        	throw new Error("La función requiere exactamente dos argumentos.");
    	}
    
    	// Verificar que el primer argumento es un array
    	if (!Array.isArray(arrays)) {
        	throw new Error("El primer argumento debe ser un array.");
    	}
    
    	// Verificar que todos los elementos del primer array son arrays
    	if (!arrays.every(subArray => Array.isArray(subArray))) {
        	throw new Error("Todos los elementos del primer array deben ser arrays.");
    	}
    
    	// Buscar el elemento en los arrays internos
    	return arrays.some(subArray => subArray.includes(elemento));
}

// Ejemplo de uso
const arraysEjemplo = [[7, 8], [10, 12]];
console.log(buscaArrays(arraysEjemplo, 8)); // true
console.log(buscaArrays(arraysEjemplo, 2)); // false
console.log(buscaArrays(arraysEjemplo, [7, 8])); // false
