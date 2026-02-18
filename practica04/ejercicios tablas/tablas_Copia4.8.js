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
        ["Para llevar", "Pizza", "Hamburguesa", "Ensalada"],
        ["Postres", "Helado de chocolate", "Yogurt"],
        ["Bebidas", "Agua", "Refresco", "Cafe"]
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

        // Tabla del menú
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
            
            td.style.fontWeight = "bold";
            td.style.cursor = "pointer";
        
            // Crear imagen
            const img = document.createElement("img");
            const nombreImagen = producto.toLowerCase().replace(/\s+/g, "_") + ".jpg";
            img.src = `images/${nombreImagen}`;
            img.alt = producto;
            img.style.width = "100px";
            img.style.marginRight = "20px";
            img.style.verticalAlign = "middle";
        
            // Insertar imagen + texto
            td.appendChild(img);
            td.appendChild(document.createTextNode(producto));
        
            td.addEventListener("click", () => {
                const tablaPedidos = document.querySelector(`#pedidos_${categoriaId} tbody`);
        
                const filas = tablaPedidos.querySelectorAll("tr");
                let encontrado = false;
        
                filas.forEach(fila => {
                    const celdaProducto = fila.children[0];
                    if (celdaProducto && celdaProducto.textContent === producto) {
                        const celdaCantidad = fila.children[1];
                        celdaCantidad.textContent = parseInt(celdaCantidad.textContent) + 1;
                        encontrado = true;
                    }
                });
        
                if (!encontrado) {
                    const fila = document.createElement("tr");
        
                    const celdaProducto = document.createElement("td");
                    celdaProducto.textContent = producto;
        
                    const celdaCantidad = document.createElement("td");
                    celdaCantidad.textContent = "1";
                    celdaCantidad.className = "text-center fw-bold";
        
                    fila.appendChild(celdaProducto);
                    fila.appendChild(celdaCantidad);
                    tablaPedidos.appendChild(fila);
                }
            });
        
            tr.appendChild(td);
            tbodyMenu.appendChild(tr);
        });
        

        tablaMenu.appendChild(tbodyMenu);
        contenedorMenu.appendChild(tablaMenu);

        // Tabla de pedidos
        const tablaPedidos = document.createElement("table");
        tablaPedidos.className = "table table-bordered mb-4";
        tablaPedidos.id = `pedidos_${categoriaId}`;

        const theadPedidos = document.createElement("thead");
        const trHeadPedidos = document.createElement("tr");

        const thProducto = document.createElement("th");
        thProducto.textContent = `Pedidos ${categoria}`;

        const thCantidad = document.createElement("th");
        thCantidad.textContent = "Unidades";

        trHeadPedidos.appendChild(thProducto);
        trHeadPedidos.appendChild(thCantidad);
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
