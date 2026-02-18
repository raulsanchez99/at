'use strict';

// Número que determina la frecuencia con la que se agotan productos al hacer clic
let simula_agotados = 3;

if (!Number.isInteger(simula_agotados) || simula_agotados < 0) {
    throw new Error("simula_agotados debe ser un número entero positivo.");
}

// Conjunto para almacenar productos agotados
const agotados = new Set();

//  Valida la estructura de la lista de productos antes de usarla
function validarListaMenu(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("La lista no puede estar vacía.");
    }

    lista.forEach((sublista) => {
        sublista.forEach((item, index) => {
            if (index === 0) {
                if (typeof item !== 'string') throw new Error("La categoría debe ser un string");
            } else {
                if (typeof item !== 'object' || !item.id || !item.nombre || typeof item.precio !== 'number') {
                    throw new Error("Cada producto debe ser un objeto con id, nombre y precio");
                }
            }
        });
    });
}

//  Función principal que genera las tablas del menú y pedidos
function crear_tablas() {
    const lista_menu = [
        ["Para llevar",
            { id: "1", nombre: "Pizza", precio: 8.5 },
            { id: "2", nombre: "Hamburguesa", precio: 6.9 },
            { id: "3", nombre: "Ensalada", precio: 5.5 }
        ],
        ["Postres",
            { id: "4", nombre: "Helado de chocolate", precio: 4.0 },
            { id: "5", nombre: "Yogurt", precio: 3.5 }
        ],
        ["Bebidas",
            { id: "6", nombre: "Agua", precio: 1.0 },
            { id: "7", nombre: "Refresco", precio: 1.5 },
            { id: "8", nombre: "Cafe", precio: 2.0 }
        ]
    ];

    // Verificación inicial antes de construir las tablas
    try {
        validarListaMenu(lista_menu);
    } catch (error) {
        alert("Error: " + error.message);
        return;
    }

    // Contenedores donde se colocarán las tablas
    const contenedorMenu = document.querySelector("#tabla_menu");
    const contenedorPedidos = document.querySelector("#tabla_pedidos");
    contenedorMenu.innerHTML = "";
    contenedorPedidos.innerHTML = "";

    //  Recorremos cada categoría (sublista)
    lista_menu.forEach(sublista => {
        const [categoria, ...productos] = sublista;
        const categoriaId = categoria.replace(/\s+/g, "_"); // Para usar en ID

        //  Construcción tabla del menú
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
            td.dataset.id = producto.id;
            td.style.fontWeight = "bold";
            td.style.cursor = "pointer";

            //  Imagen del producto
            const img = document.createElement("img");
            img.src = `images/${producto.id}.jpg`;
            img.alt = producto.nombre;
            img.style.width = "100px";
            img.style.marginRight = "20px";
            img.style.verticalAlign = "middle";

            td.appendChild(img);
            td.appendChild(document.createTextNode(producto.nombre));

            //  Precio flotante a la derecha
            const precioSpan = document.createElement("span");
            precioSpan.textContent = `$${producto.precio.toFixed(2)}`;
            precioSpan.style.float = "right";
            td.appendChild(precioSpan);

            //  Al hacer clic, se agrega el producto a la tabla de pedidos
            td.addEventListener("click", () => {
                if (agotados.has(producto.nombre)) return;
                if (simula_agotados > 0 && Math.floor(Math.random() * simula_agotados) === 0) {
                    simularAgotamiento(lista_menu);
                }

                const tablaPedidos = document.querySelector(`#pedidos_${categoriaId} tbody`);
                const filas = tablaPedidos.querySelectorAll("tr");
                let encontrado = false;

                //  Si ya está en pedidos, aumenta la cantidad
                filas.forEach(fila => {
                    const celdaProducto = fila.children[0];
                    if (celdaProducto && celdaProducto.textContent === producto.nombre) {
                        const celdaCantidad = fila.children[1];
                        celdaCantidad.textContent = parseInt(celdaCantidad.textContent) + 1;
                        encontrado = true;
                    }
                });

                // Si no está en pedidos, lo añade
                if (!encontrado) {
                    const fila = document.createElement("tr");

                    const celdaProducto = document.createElement("td");
                    celdaProducto.textContent = producto.nombre;

                    const celdaCantidad = document.createElement("td");
                    celdaCantidad.textContent = "1";
                    celdaCantidad.className = "text-center fw-bold";

                    const celdaPrecio = document.createElement("td");
                    celdaPrecio.textContent = `$${producto.precio.toFixed(2)}`;
                    celdaPrecio.className = "text-center";

                    const celdaEliminar = document.createElement("td");
                    celdaEliminar.innerHTML = "🗑️";
                    celdaEliminar.style.cursor = "pointer";
                    celdaEliminar.style.textAlign = "center";

                    //  Permite reducir cantidad o eliminar
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
                    fila.appendChild(celdaPrecio);
                    fila.appendChild(celdaEliminar);
                    tablaPedidos.appendChild(fila);
                }
            });

            tr.appendChild(td);
            tbodyMenu.appendChild(tr);
        });

        tablaMenu.appendChild(tbodyMenu);
        contenedorMenu.appendChild(tablaMenu);

        //  Tabla de pedidos correspondiente
        const tablaPedidos = document.createElement("table");
        tablaPedidos.className = "table table-bordered mb-4";
        tablaPedidos.id = `pedidos_${categoriaId}`;

        const theadPedidos = document.createElement("thead");
        const trHeadPedidos = document.createElement("tr");

        const thProducto = document.createElement("th");
        thProducto.textContent = `Pedidos ${categoria}`;

        const thCantidad = document.createElement("th");
        thCantidad.textContent = "Unidades";

        //Tabla de precio
        const thPrecio = document.createElement("th");
        thPrecio.textContent = "Precio";

        const thEliminar = document.createElement("th");
        thEliminar.textContent = " ";

        trHeadPedidos.append(thProducto, thCantidad, thPrecio, thEliminar);
        theadPedidos.appendChild(trHeadPedidos);
        tablaPedidos.appendChild(theadPedidos);

        const tbodyPedidos = document.createElement("tbody");
        tablaPedidos.appendChild(tbodyPedidos);
        contenedorPedidos.appendChild(tablaPedidos);
    });

    //  Div que muestra mensaje de producto agotado
    let mensajeAgotado = document.querySelector("#mensaje_agotado");
    if (!mensajeAgotado) {
        mensajeAgotado = document.createElement("div");
        mensajeAgotado.id = "mensaje_agotado";
        mensajeAgotado.className = "alert alert-danger text-center mt-3";
        mensajeAgotado.style.display = "none";
        document.querySelector(".container").prepend(mensajeAgotado);
    }

    //  Botón para calcular el total del pedido
    const botonTotal = document.createElement("button");
    botonTotal.textContent = "Calcular total $";
    botonTotal.className = "btn btn-success mt-3";
    botonTotal.id = "boton_total";

    const divResultado = document.createElement("div");
    divResultado.id = "total_resultado";
    divResultado.className = "mt-2 fw-bold text-center";

    contenedorPedidos.appendChild(botonTotal);
    contenedorPedidos.appendChild(divResultado);

    //  Lógica para calcular el total de todos los pedidos
    botonTotal.addEventListener("click", () => {
        let total = 0;

        const todasFilas = document.querySelectorAll("#tabla_pedidos table tbody tr");
        todasFilas.forEach(fila => {
            const nombre = fila.children[0].textContent;
            const cantidad = parseInt(fila.children[1].textContent);

            // 💡 Busca el producto original para obtener su precio
            const productoOriginal = lista_menu.flatMap(cat => cat.slice(1))
                .find(p => p.nombre === nombre);

            if (productoOriginal) {
                total += cantidad * productoOriginal.precio;
            }
        });

        document.querySelector("#total_resultado").textContent = `Total: $${total.toFixed(2)}`;
    });
}

//  Elige un producto aleatorio para marcarlo como agotado
function simularAgotamiento(lista_menu) {
    const categoriasDisponibles = lista_menu.filter(sublista => sublista.length > 1);
    if (categoriasDisponibles.length === 0) return;

    const catAleatoria = categoriasDisponibles[Math.floor(Math.random() * categoriasDisponibles.length)];
    const [categoria, ...productos] = catAleatoria;

    const productosNoAgotados = productos.filter(p => !agotados.has(p.nombre));
    if (productosNoAgotados.length === 0) return;

    const productoAgotado = productosNoAgotados[Math.floor(Math.random() * productosNoAgotados.length)];
    agotados.add(productoAgotado.nombre);

    // ⚠️ Cambia la imagen por la de "agotado"
    const celdas = Array.from(document.querySelectorAll("#tabla_menu td"));
    celdas.forEach(td => {
        if (td.textContent.trim().includes(productoAgotado.nombre)) {
            const img = td.querySelector("img");
            if (img) {
                img.src = "images/agotado.jpg";
                img.alt = "Agotado";
            }
        }
    });

    const mensajeAgotado = document.querySelector("#mensaje_agotado");
    mensajeAgotado.style.display = "block";
    mensajeAgotado.textContent = `El producto \"${productoAgotado.nombre}\" se ha agotado`;
    setTimeout(() => {
        mensajeAgotado.style.display = "none";
    }, 3000);
}

//  Control de botones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const boton1 = document.querySelector("#boton1");
    boton1.addEventListener("click", crear_tablas);

    const botonOcultar = document.querySelector("#boton_ocultar");
    let ocultando = false;

    //  Muestra solo productos "healthy" con un filtro por ID
    botonOcultar.addEventListener("click", () => {
        const productosSelecionadosIds = ["1", "2", "4", "7"];
        const celdas = Array.from(document.querySelectorAll("#tabla_menu td"));

        celdas.forEach(td => {
            if (productosSelecionadosIds.includes(td.dataset.id)) {
                const fila = td.parentElement;
                fila.style.display = ocultando ? "" : "none";
            }
        });

        ocultando = !ocultando;
        botonOcultar.textContent = ocultando ? "Mostrar todo" : "Mostrar productos healthy";
    });
});
