'use strict';

function validarListaMenu(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("La lista no puede estar vacia.");
    }

    lista.forEach((sublista, index) => {
        sublista.forEach(item => {
            if (typeof item !== 'string') {
                throw new Error(`Todos los elementos deben ser strings`);
            }
        });
    });
}

function manej_boton1(event) {
    //Lista
    const lista_menu = [
        [ "Para llevar", "Pizza", "Hamburguesa" ],
        [ "Postres", "Helado de chocolate", "Helado de menta" ],
        [ "Bebidas", "Agua", "Refresco", "Café" ]
    ];

    try {
        validarListaMenu(lista_menu);
    } catch (error) {
        alert("Error: " + error.message);
        return;
    }

    //Contenedor de las tablas
    const contenedor = document.querySelector("#tablas");
    contenedor.innerHTML = ""; // Esto borra cualquier contenido anterior
    

    //Crear tablas
    lista_menu.forEach(sublista => {
        const [categoria, ...productos] = sublista;

        //Crear tabla
        const tabla = document.createElement("table");
        tabla.className = "table table-bordered mb-4";
        tabla.style.width = "300px";
        tabla.style.margin = "0 auto";

        // Crear encabezado
        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 1;
        th.textContent = categoria;
        th.className = "text-center bg-primary text-white";
        trHead.appendChild(th);
        thead.appendChild(trHead);
        tabla.appendChild(thead);

        // Crear cuerpo
        const tbody = document.createElement("tbody");

        productos.forEach(producto => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = producto;
            td.style.fontWeight = "bold";
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);
    });
}

// Evento al botón
let boton1 = document.querySelector("#boton1");
boton1.addEventListener("click", manej_boton1);