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

                    // Celda de eliminar
                    const celdaEliminar = document.createElement("td");//  Se crea
                    celdaEliminar.innerHTML = "🗑️";
                    celdaEliminar.style.cursor = "pointer";
                    celdaEliminar.style.textAlign = "center";

                    // Lógica de eliminar producto
                    celdaEliminar.addEventListener("click", () => {
                        const cantidadActual = parseInt(celdaCantidad.textContent);
                        if (cantidadActual > 1) {
                            celdaCantidad.textContent = cantidadActual - 1; //Si hay mas de una unidad, se resta una
                        } else {
                            fila.remove(); //Si solo hay una unidad, borramos la fila
                        }
                    });

                    fila.appendChild(celdaProducto);
                    fila.appendChild(celdaCantidad);
                    fila.appendChild(celdaEliminar);
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

        //Se añade una nueva columna con el icono de papelera
        const thEliminar = document.createElement("th");
        thEliminar.textContent = " ";

        //Encabezados
        trHeadPedidos.appendChild(thProducto);
        trHeadPedidos.appendChild(thCantidad);
        trHeadPedidos.appendChild(thEliminar); //Encabezado de la tabla de eliminar
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

    //Inicializacion de boton ocultar
    const botonOcultar = document.querySelector("#boton_ocultar");
    let ocultando = false; //saber si los productos estan visible o no

    //Evento de boton ocultar
    botonOcultar.addEventListener("click", () => {
        //Productos que desapareceran
        const productosSelecionados = ["Pizza", "Hamburguesa", "Helado de chocolate", "Refresco"];
        //Recorremos cada producto del array
        productosSelecionados.forEach(nombre => {
            // Buscar celdas de productos en el menú
            const celdas = Array.from(document.querySelectorAll("#tabla_menu td"));
            celdas.forEach(td => {
                // Si el contenido incluye el nombre del producto
                if (td.textContent.trim().includes(nombre)) {
                    const fila = td.parentElement; //Obtenemos su fila padre
                    fila.style.display = ocultando ? "" : "none"; //Se modifica su estilo oculta/muestra
                }
            });
        });

        ocultando = !ocultando; //Invertimos el valor de la variable
        //Actualizamos el texto del boton dependiendo del valor de la variable
        botonOcultar.textContent = ocultando ? "Mostrar todo" : "Mostrar productos healthy";
    });
});
