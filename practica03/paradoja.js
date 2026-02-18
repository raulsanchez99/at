'use strict'

var lista_fechas = []; // Lista global

// Genera una fecha aleatoria
function gen_fecha() {
    return Math.trunc(365 * Math.random()) + 1;
}

// Añade una nueva fecha a la lista
function agregar_fecha() {    
    let nueva_fecha = gen_fecha();
    lista_fechas.push(nueva_fecha);

    // Devolvemos la fecha agregada
    return nueva_fecha;
}

// Función que genera listas incrementales hasta encontrar una repetida
function gen_lista() {
    let fecha_repetida = null;

    while (true) {
        //Añade una nueva fecha
        let nueva_fecha = agregar_fecha(); 

        // Verifica si la fecha esta repetida en la lista
        if (lista_fechas.indexOf(nueva_fecha) !== lista_fechas.lastIndexOf(nueva_fecha)) {
            fecha_repetida = nueva_fecha;
            break; // Termina el ciclo
        }
    }

    // Retorna solo la fecha repetida
    return fecha_repetida;
}

// Función que indica cuantos cumpleaños coinciden en la lista
function coincidencia(lista_fechas){
    let contador = {};
    for (let fecha of lista_fechas) {
        contador[fecha] = (contador[fecha] || 0) + 1;
    }
    
    // Buscamos la fecha repetida
    let fecha_repetida = lista_fechas.find(fecha => contador[fecha] > 1);
    return contador[fecha_repetida];
}

//Función que transforma la fecha repetida a dia/mes
function transforma_fecha(fecha_repetida){
    let year=2025;
    var date = new Date(year,0);
    var cumpleanos = new Date(date.setDate(fecha_repetida));
    let dia = cumpleanos.getDate();
    let mes = cumpleanos.getMonth() + 1;
    return dia + "/" + mes;

}


// Llamamos a la funciones
let fecha_repetida = gen_lista();
let fecha_convertida = transforma_fecha(fecha_repetida);
let num_personas_coinciden = coincidencia(lista_fechas);

console.log("Lista de fechas:", lista_fechas);
console.log("Número de personas con el mismo cumpleaños:", num_personas_coinciden);
console.log("Fecha repetida:", fecha_repetida);
console.log("Cumpleaños repetido:", fecha_convertida);
