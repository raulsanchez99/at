'use strict';

function validarListaMenu(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("La lista no puede estar vacía.");
    }

    lista.forEach((sublista) => {
        sublista.forEach(item => {
            if (typeof item !== 'string') {
                throw new Error("Todos los elementos deben ser strings");
            }
        });
    });
}

function crear_tablas() {
    const lista_menu = [
        ["Para llevar", "Pizza", "Hamburguesa"],
        ["Postres", "Helado de chocolate", "Helado de menta"],
        ["Bebidas", "Agua", "Refresco", "Café"]
    ];

    try {
        validarListaMenu(lista_menu);
    } catch (error) {
        alert("Error: " + error.message);
        return;
    }

    const contenedorMenu = document.querySelector("#tabla_menu");
    const contenedorPedidos = document.querySelector("#tabla_pedidos");
    contenedorMenu.innerHTML = "";
    contenedorPedidos.innerHTML = "";

    lista_menu.forEach(sublista => {
        const [categoria, ...productos] = sublista;
        const categoriaId = categoria.replace(/\s+/g, "_");

        // Crear tabla de menú
        const tablaMenu = document.createElement("table");
        tablaMenu.className = "table table-bordered mb-4";
        const theadMenu = document.createElement("thead");
        const trHeadMenu = document.createElement("tr");
        const thMenu = document.createElement("th");
        thMenu.textContent = categoria;
        thMenu.className = "text-center bg-primary text-white";
        trHeadMenu.appendChild(thMenu);
        theadMenu.appendChild(trHeadMenu);
        tablaMenu.appendChild(theadMenu);

        const tbodyMenu = document.createElement("tbody");

        productos.forEach(producto => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = producto;
            td.style.fontWeight = "bold";
            td.style.cursor = "pointer";

            td.addEventListener("click", () => {
                const tablaPedidos = document.querySelector(`#pedidos_${categoriaId} tbody`);
                const fila = document.createElement("tr");
                const celda = document.createElement("td");
                celda.textContent = producto;
                fila.appendChild(celda);
                tablaPedidos.appendChild(fila);
            });

            tr.appendChild(td);
            tbodyMenu.appendChild(tr);
        });

        tablaMenu.appendChild(tbodyMenu);
        contenedorMenu.appendChild(tablaMenu);

        // Crear tabla de pedidos vacía para esta categoría
        const tablaPedidos = document.createElement("table");
        tablaPedidos.className = "table table-bordered mb-4";
        tablaPedidos.id = `pedidos_${categoriaId}`;

        const theadPedidos = document.createElement("thead");
        const trHeadPedidos = document.createElement("tr");
        const thPedidos = document.createElement("th");
        thPedidos.textContent = `Pedidos ${categoria}`;
        thPedidos.className = "text-center bg-primary text-white";
        trHeadPedidos.appendChild(thPedidos);
        theadPedidos.appendChild(trHeadPedidos);
        tablaPedidos.appendChild(theadPedidos);

        const tbodyPedidos = document.createElement("tbody");
        tablaPedidos.appendChild(tbodyPedidos);
        contenedorPedidos.appendChild(tablaPedidos);
    });
}

// Evento al botón
document.addEventListener("DOMContentLoaded", () => {
    const boton1 = document.querySelector("#boton1");
    boton1.addEventListener("click", crear_tablas);
});
