'use strict'

function manej_boton1(event){
    // Seleccionamos la tabla
    let tabla_lista = document.querySelector("#tabla");
    
    let lista = ["primeros", "segundos", "postres", "bebidas"]; //Lista de elementos
    
    for (let item of lista){
    
        let tr = document.createElement("tr");  // Creamos la fila

        let td = document.createElement("td");  // Creamos la celda
        
        td.append(item); // Metemos item en la celda

        tr.append(td);   // Metemos la celda en la fila
        tabla_lista.append(tr);  // Metemos fila en la tabla
    }
}

let boton1 = document.querySelector("#boton1");
boton1.addEventListener("click", manej_boton1);

















