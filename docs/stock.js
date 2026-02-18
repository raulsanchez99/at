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
            if (typeof item !== 'object' || !item.id || !item.nombre || typeof item.stock !== 'number') {
                throw new Error("Cada producto debe tener 'id', 'nombre' y 'stock'");
            }
        });
    });
}

function crear_tablas() {
    const lista_menu = [
        ["Para llevar", 
            { id: "1", nombre: "Pizza", stock: 3 },
            { id: "2", nombre: "Hamburguesa", stock: 2 },
            { id: "3", nombre: "Ensalada", stock: 5 }
        ],
        ["Postres", 
            { id: "4", nombre: "Helado de chocolate", stock: 4 },
            { id: "5", nombre: "Yogurt", stock: 6 }
        ],
        ["Bebidas", 
            { id: "6", nombre: "Agua", stock: 8 },
            { id: "7", nombre: "Refresco", stock: 7 },
            { id: "8", nombre: "Cafe", stock: 10 }
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

        // Tabla menú
        const tablaMenu = document.createElement("table");
        tablaMenu.className = "table table-bordered mb-4";

        const theadMenu = document.createElement("thead");
        const trHeadMenu = document.createElement("tr");

        const thNombre = document.createElement("th");
        thNombre.textContent = categoria;
        thNombre.className = "bg-primary text-white text-center";

        const thStock = document.createElement("th");
        thStock.textContent = "Stock";
        thStock.className = "bg-primary text-white text-center";

        trHeadMenu.appendChild(thNombre);
        trHeadMenu.appendChild(thStock);
        theadMenu.appendChild(trHeadMenu);
        tablaMenu.appendChild(theadMenu);

        const tbodyMenu = document.createElement("tbody");

        productos.forEach(producto => {
            const tr = document.createElement("tr");

            const tdNombre = document.createElement("td");
            tdNombre.id = "producto_" + producto.id;
            tdNombre.style.fontWeight = "bold";
            tdNombre.style.cursor = "pointer";

            const img = document.createElement("img");
            img.src = `images/${producto.id}.jpg`;
            img.alt = producto.nombre;
            img.style.width = "100px";
            img.style.marginRight = "20px";
            img.style.verticalAlign = "middle";

            tdNombre.appendChild(img);
            tdNombre.appendChild(document.createTextNode(producto.nombre));

            const tdStock = document.createElement("td");
            tdStock.id = `stock_${producto.id}`;
            tdStock.textContent = producto.stock;
            tdStock.style.textAlign = "center";

            tdNombre.addEventListener("click", () => {
                if (agotados.has(producto.id) || producto.stock <= 0) return;

                producto.stock -= 1;
                tdStock.textContent = producto.stock;

                if (producto.stock === 0) {
                    agotados.add(producto.id);
                    const img = tdNombre.querySelector("img");
                    if (img) {
                        img.src = "images/agotado.jpg";
                        img.alt = "Agotado";
                    }

                    const mensajeAgotado = document.querySelector("#mensaje_agotado");
                    mensajeAgotado.style.display = "block";
                    mensajeAgotado.textContent = `El producto "${producto.nombre}" se ha agotado`;
                    setTimeout(() => mensajeAgotado.style.display = "none", 3000);
                }
            });

            tr.appendChild(tdNombre);
            tr.appendChild(tdStock);
            tbodyMenu.appendChild(tr);
        });

        tablaMenu.appendChild(tbodyMenu);
        contenedorMenu.appendChild(tablaMenu);

        // Tabla pedidos (sin stock)
        const tablaPedidos = document.createElement("table");
        tablaPedidos.className = "table table-bordered mb-4";
        tablaPedidos.id = `pedidos_${categoriaId}`;

        const theadPedidos = document.createElement("thead");
        const trHeadPedidos = document.createElement("tr");

        const thProducto = document.createElement("th");
        thProducto.textContent = `Pedidos ${categoria}`;

        const thCantidad = document.createElement("th");
        thCantidad.textContent = "Unidades";

        const thEliminar = document.createElement("th");
        thEliminar.textContent = " ";

        trHeadPedidos.appendChild(thProducto);
        trHeadPedidos.appendChild(thCantidad);
        trHeadPedidos.appendChild(thEliminar);
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
});
