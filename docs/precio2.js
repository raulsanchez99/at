'use strict';

let simula_agotados = 3;

if (!Number.isInteger(simula_agotados) || simula_agotados < 0) {
    throw new Error("simula_agotados debe ser un número entero positivo.");
}

const agotados = new Set();

function validarListaMenu(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        throw new Error("La lista no puede estar vacía.");
    }

    lista.forEach((sublista) => {
        sublista.slice(1).forEach(item => {
            if (typeof item !== 'object' || !item.id || !item.nombre || typeof item.precio !== 'number') {
                throw new Error("Cada producto debe ser un objeto con 'id', 'nombre' y 'precio'");
            }
        });
    });
}

function crear_tablas() {
    const lista_menu = [
        ["Para llevar", 
            { id: "1", nombre: "Pizza", precio: 9.5 },
            { id: "2", nombre: "Hamburguesa", precio: 8 },
            { id: "3", nombre: "Ensalada", precio: 6.5 }
        ],
        ["Postres", 
            { id: "4", nombre: "Helado de chocolate", precio: 4 },
            { id: "5", nombre: "Yogurt", precio: 3.5 }
        ],
        ["Bebidas", 
            { id: "6", nombre: "Agua", precio: 1.5 },
            { id: "7", nombre: "Refresco", precio: 2 },
            { id: "8", nombre: "Cafe", precio: 1.8 }
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

        // Encabezado menú con 2 columnas: Producto y Precio
        const theadMenu = document.createElement("thead");
        const trHeadMenu = document.createElement("tr");

        const thProducto = document.createElement("th");
        thProducto.textContent = categoria;
        thProducto.className = "text-center bg-primary text-white";

        const thPrecio = document.createElement("th");
        thPrecio.textContent = "Precio";
        thPrecio.className = "text-center bg-primary text-white";

        trHeadMenu.appendChild(thProducto);
        trHeadMenu.appendChild(thPrecio);
        theadMenu.appendChild(trHeadMenu);
        tablaMenu.appendChild(theadMenu);

        const tbodyMenu = document.createElement("tbody");

        productos.forEach(producto => {
            const tr = document.createElement("tr");

            const tdProducto = document.createElement("td");
            tdProducto.id = "producto_" + producto.id;
            tdProducto.style.fontWeight = "bold";
            tdProducto.style.cursor = "pointer";

            const img = document.createElement("img");
            img.src = `images/${producto.id}.jpg`;
            img.alt = producto.nombre;
            img.style.width = "100px";
            img.style.marginRight = "20px";
            img.style.verticalAlign = "middle";

            tdProducto.appendChild(img);
            tdProducto.appendChild(document.createTextNode(producto.nombre));

            tdProducto.addEventListener("click", () => {
                if (agotados.has(producto.id)) return;

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

                    const celdaPrecio = document.createElement("td");
                    celdaPrecio.textContent = producto.precio.toFixed(2) + " €";
                    celdaPrecio.className = "text-end";

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
                    fila.appendChild(celdaPrecio);
                    fila.appendChild(celdaEliminar);
                    tablaPedidos.appendChild(fila);
                }
            });

            tr.appendChild(tdProducto);

            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = producto.precio.toFixed(2) + " €";
            tdPrecio.className = "text-end pe-3";
            tr.appendChild(tdPrecio);

            tbodyMenu.appendChild(tr);
        });

        tablaMenu.appendChild(tbodyMenu);
        contenedorMenu.appendChild(tablaMenu);

        // Tabla pedidos
        const tablaPedidos = document.createElement("table");
        tablaPedidos.className = "table table-bordered mb-4";
        tablaPedidos.id = `pedidos_${categoriaId}`;

        const theadPedidos = document.createElement("thead");
        const trHeadPedidos = document.createElement("tr");

        const thProductoPedido = document.createElement("th");
        thProductoPedido.textContent = `Pedidos ${categoria}`;

        const thCantidadPedido = document.createElement("th");
        thCantidadPedido.textContent = "Unidades";

        const thPrecioPedido = document.createElement("th");
        thPrecioPedido.textContent = "Precio";

        const thEliminarPedido = document.createElement("th");
        thEliminarPedido.textContent = " ";

        trHeadPedidos.appendChild(thProductoPedido);
        trHeadPedidos.appendChild(thCantidadPedido);
        trHeadPedidos.appendChild(thPrecioPedido);
        trHeadPedidos.appendChild(thEliminarPedido);
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

    const td = document.querySelector(`#producto_${productoAgotado.id}`);
    if (td) {
        const img = td.querySelector("img");
        if (img) {
            img.src = "images/agotado.jpg";
            img.alt = "Agotado";
        }
    }

    const mensajeAgotado = document.querySelector("#mensaje_agotado");
    mensajeAgotado.style.display = "block";
    mensajeAgotado.textContent = `El producto "${productoAgotado.nombre}" se ha agotado`;
    setTimeout(() => {
        mensajeAgotado.style.display = "none";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#boton1").addEventListener("click", crear_tablas);

    const botonOcultar = document.querySelector("#boton_ocultar");
    let ocultando = false;

    botonOcultar.addEventListener("click", () => {
        const idsAocultar = ["1", "2", "4", "7"];
        idsAocultar.forEach(id => {
            const td = document.querySelector(`#producto_${id}`);
            if (td) {
                const fila = td.parentElement;
                fila.style.display = ocultando ? "" : "none";
            }
            });
                ocultando = !ocultando;
                botonOcultar.textContent = ocultando ? "Mostrar todo" : "Mostrar productos healthy";
            });
            

            // BOTÓN PARA MOSTRAR TOTAL
            document.querySelector("#boton_total").addEventListener("click", () => {
                let total = 0;
                document.querySelectorAll("#tabla_pedidos table tbody tr").forEach(fila => {
                    const cantidad = parseInt(fila.children[1].textContent);
                    const precio = parseFloat(fila.children[2].textContent.replace("€", "").trim());
                    total += cantidad * precio;
                });
                document.querySelector("#total_pedido").textContent = `Total del pedido: ${total.toFixed(2)} €`;
            });


            document.querySelector("#boton_limpiar").addEventListener("click", () => {
                // Seleccionamos todas las tablas de pedidos y limpiamos sus cuerpos
                document.querySelectorAll("#tabla_pedidos table tbody").forEach(tbody => {
                    tbody.innerHTML = "";
                });
            
                // También limpiamos el texto del total para que no quede el último total mostrado
                const totalPedido = document.querySelector("#total_pedido");
                if (totalPedido) totalPedido.textContent = "";
            });
            
    });
            

            
        
