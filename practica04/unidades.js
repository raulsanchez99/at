'use strict';

function convertirUnidad(factor, unidad, redondear = false) {
    let div_v_in = document.querySelector("#v_in");
    let v_in = div_v_in.textContent;
    let v_out = v_in * factor;
    
    if (redondear) {
        v_out = v_out.toFixed(2);
    }

    v_out = v_out + " " + unidad;
    let display = document.querySelector("#v_out");
    display.textContent = v_out;
}

function manej_boton1(event) {
    console.log("manej_boton1");
    convertirUnidad(100, "centímetros");
}

function manej_boton2(event) {
    console.log("manej_boton2");
    convertirUnidad(1 / 0.0254, "pulgadas");
}

function manej_boton3(event) {
    console.log("manej_boton3");
    convertirUnidad(1 / 0.9144, "yardas", true);
}

let boton1 = document.querySelector("#boton1");
let boton2 = document.querySelector("#boton2");
let boton3 = document.querySelector("#boton3");

boton1.addEventListener("click", manej_boton1);
boton2.addEventListener("click", manej_boton2);
boton3.addEventListener("click", manej_boton3);
