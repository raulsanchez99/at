'use strict';

let simula_agotados = 3;

if (!Number.isInteger(simula_agotados) || simula_agotados < 0) {
    throw new Error("simula_agotados debe ser un número entero positivo.");
}

const agotados = new Set(); // Almacena nombres de productos agotados (formato string)

function validarListaMenu(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("La lista no puede estar vacía.");
    }

    lista.forEach((sublista) => {
        sublista.slice(1).forEach(item => {
            if (typeof item !== 'object' || !item.id || !item.nombre) {
                throw new Error("Cada producto debe ser un objeto con 'id' y 'nombre'");
            }
        });
    });
}

function crear_tablas() {
    const lista_menu = [
        ["Para llevar", 
            { id: "1", nombre: "Pizza" },
            { id: "2", nombre: "Hamburguesa" },
            { id: "3", nombre: "Ensalada" }
        ],
        ["Postres", 
            { id: "4", nombre: "Helado de chocolate" },
            { id: "5", nombre: "Yogurt" }
        ],
        ["Bebidas", 
            { id: "6", nombre: "Agua" },
            { id: "7", nombre: "Refresco" },
            { id: "8", nombre: "Cafe" }
        ]
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

        // Tabla menu
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
            td.id = "producto_" + producto.id;
            td.style.fontWeight = "bold";
            td.style.cursor = "pointer";

            //Crear imagen
            const img = document.createElement("img");
            img.src = `images/${producto.id}.jpg`;
            img.alt = producto.nombre;
            img.style.width = "100px";
            img.style.marginRight = "20px";
            img.style.verticalAlign = "middle";

            //Insertat imagen + texto
            td.appendChild(img);
            td.appendChild(document.createTextNode(producto.nombre));

            td.addEventListener("click", () => {
                //Ignora clicks en productos agotados
                if (agotados.has(producto.id)) return;

                // Simular agotamiento
                if (simula_agotados > 0 && Math.floor(Math.random() * simula_agotados) === 0) {
                    simularAgotamiento(lista_menu);
                }

                const tablaPedidos = document.querySelector(`#pedidos_${categoriaId} tbody`);
                const filas = tablaPedidos.querySelectorAll("tr");
                let encontrado = false;

                filas.forEach(fila => {
                    const celdaProducto = fila.children[0];
                    if (celdaProducto && celdaProducto.textContent === producto.nombre) {
                        const celdaCantidad = fila.children[1];
                        celdaCantidad.textContent = parseInt(celdaCantidad.textContent) + 1;
                        encontrado = true;
                    }
                });

                if (!encontrado) {
                    const fila = document.createElement("tr");
                    const celdaProducto = document.createElement("td");
                    celdaProducto.textContent = producto.nombre;
                    const celdaCantidad = document.createElement("td");
                    celdaCantidad.textContent = "1";
                    celdaCantidad.className = "text-center fw-bold";
                    const celdaEliminar = document.createElement("td");
                    celdaEliminar.innerHTML = "🗑️";
                    celdaEliminar.style.cursor = "pointer";
                    celdaEliminar.style.textAlign = "center";

                    celdaEliminar.addEventListener("click", () => {
                        const cantidadActual = parseInt(celdaCantidad.textContent);
                        if (cantidadActual > 1) {
                            celdaCantidad.textContent = cantidadActual - 1;
                        } else {
                            fila.remove();
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

        // Se añade una nueva columna con el icono de papelera
        const thEliminar = document.createElement("th");
        thEliminar.textContent = " ";

        //Encabezados
        trHeadPedidos.appendChild(thProducto);
        trHeadPedidos.appendChild(thCantidad);
        trHeadPedidos.appendChild(thEliminar);//Encabezado de la tabla de eliminar
        theadPedidos.appendChild(trHeadPedidos);
        tablaPedidos.appendChild(theadPedidos);

        const tbodyPedidos = document.createElement("tbody");
        tablaPedidos.appendChild(tbodyPedidos);
        contenedorPedidos.appendChild(tablaPedidos);
    });

    let mensajeAgotado = document.querySelector("#mensaje_agotado");
    if (!mensajeAgotado) {
        mensajeAgotado = document.createElement("div");
        mensajeAgotado.id = "mensaje_agotado";
        mensajeAgotado.className = "alert alert-danger text-center mt-3";
        mensajeAgotado.style.display = "none";
        document.querySelector(".container").prepend(mensajeAgotado);
    }
}

function simularAgotamiento(lista_menu) {
    const categoriasDisponibles = lista_menu.filter(sublista => sublista.length > 1);
    if (categoriasDisponibles.length === 0) return;

    const catAleatoria = categoriasDisponibles[Math.floor(Math.random() * categoriasDisponibles.length)];
    const [categoria, ...productos] = catAleatoria;

    const productosNoAgotados = productos.filter(p => !agotados.has(p.id));
    if (productosNoAgotados.length === 0) return;

    const productoAgotado = productosNoAgotados[Math.floor(Math.random() * productosNoAgotados.length)];
    agotados.add(productoAgotado.id);

    // Cambiar imagen del producto
    const td = document.querySelector(`#producto_${productoAgotado.id}`);
    if (td) {
        const img = td.querySelector("img");
        if (img) {
            img.src = "images/agotado.jpg"; // Imagen común para producto agotado
            img.alt = "Agotado";
        }
    }

    // Mostrar mensaje producto agotado
    const mensajeAgotado = document.querySelector("#mensaje_agotado");
    mensajeAgotado.style.display = "block";
    mensajeAgotado.textContent = `El producto "${productoAgotado.nombre}" se ha agotado`;
    setTimeout(() => {
        mensajeAgotado.style.display = "none";
    }, 3000);
}

// Evento al boton
document.addEventListener("DOMContentLoaded", () => {
    const boton1 = document.querySelector("#boton1");
    boton1.addEventListener("click", crear_tablas);

    // Inicializacion de boton ocultar
    const botonOcultar = document.querySelector("#boton_ocultar");
    let ocultando = false; //saber si los productos estan visible o no

    //Evento de boton ocultar
    botonOcultar.addEventListener("click", () => {
        //Productos que desapareceran
        const idsAocultar = ["1", "2", "4", "7"];

        idsAocultar.forEach(id => {
            const td = document.querySelector(`#producto_${id}`);
            // Si el contenido incluye el nombre del producto
            if (td) {
                const fila = td.parentElement; //Obtenemos su fila padre
                fila.style.display = ocultando ? "" : "none"; //Se modifica su estilo oculta/muestra
            }
        });

        ocultando = !ocultando; //Invertimos el valor de la variable

        //Actualizamos el texto del boton dependiendo del valor de la variable
        botonOcultar.textContent = ocultando ? "Mostrar todo" : "Mostrar productos healthy";
    });
});
