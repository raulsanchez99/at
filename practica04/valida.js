'use strict'

function manej01(event) {
    var r;
    let contrasenia = document.querySelector("#contrasenia").value;
    //valida_contrasenia(contrasenia);HOla12._0¿"
    r = validacion(contrasenia, 10, 2, 2, 2, 2, "_,.-{}[]!\"·$%&/()=?¿¡'");
    let display = document.querySelector("#validacion");
    display.textContent=r;
};

let campo_contra = document.querySelector("#contrasenia");
campo_contra.addEventListener("change", manej01);
