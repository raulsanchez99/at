'use strict'

let parrafo1 = document.querySelector("#parrafo1");

function manej_boton1(){
    parrafo1.textContent = "Has seleccionado: Agua"
}

function manej_boton2(){
    parrafo1.textContent = "Has seleccionado: Refresco"
}

function manej_boton3(){
    parrafo1.textContent = "Has seleccionado: Café"
}

let boton1 = document.querySelector("#boton1");
let boton2 = document.querySelector("#boton2");
let boton3 = document.querySelector("#boton3");

boton1.addEventListener("click", manej_boton1);
boton2.addEventListener("click", manej_boton2);
boton3.addEventListener("click", manej_boton3);