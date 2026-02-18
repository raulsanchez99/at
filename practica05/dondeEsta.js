'use strict'

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function posicionusuario(pos) {
    let x = pos.coords;
    localStorage.setItem('latitude', x.latitude)
    localStorage.setItem('longitude', x.longitude)
}

function posicioncoche(pos) {
    console.log("posicion coche")
    let x = pos.coords;
    console.log(x.latitude)
    localStorage.setItem('latitud_coche', x.latitude)
    localStorage.setItem('longitud_coche', x.longitude)
    
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};

function manej_boton01(event) {
    navigator.geolocation.getCurrentPosition(posicioncoche, error, options);
    console.log("ubi coche")
    let boton_borrado = document.querySelector("#boton02");
    boton_borrado.disabled=false;
}

function manej_boton02(event) {
    let latitud_coche = localStorage.getItem('latitud_coche');
    let longitud_coche = localStorage.getItem('longitud_coche');
    if (latitud_coche && longitud_coche){
        localStorage.removeItem('latitud_coche');
        localStorage.removeItem('longitud_coche');
    }
    let boton_borrado = document.querySelector("#boton02");
    boton_borrado.disabled=true;
}


$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(posicionusuario, error, options);
    let zoom = 20;
    let latitud = localStorage.getItem('latitude');
    let longitud = localStorage.getItem('longitude');

    //Lo aviso la primera vez
    if (!latitud && !longitud){ //Si el usuario no autoriza en primera instancia, sino se usa la de última almacenada
        alert("Es necesario el acceso a tu ubicación"); 
        //Valores por defecto
        latitud = 40.28352;
        longitud = -3.82194;
    }

    let mi_mapa = L.map('id_mapa').setView([latitud, longitud], zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
    }).addTo(mi_mapa);

    let ubicacion = [latitud, longitud];
    let mi_marcador = L.marker(ubicacion).addTo(mi_mapa);
    mi_marcador.bindPopup("Tu ubicación").openPopup();

    let latitud_coche = localStorage.getItem('latitud_coche');
    let longitud_coche = localStorage.getItem('longitud_coche');
    console.log(latitud_coche, longitud_coche);

    if (latitud_coche && longitud_coche){
        let ubicacion_coche = [latitud_coche, longitud_coche];
        let mi_marcador_coche = L.marker(ubicacion_coche).addTo(mi_mapa);
        mi_marcador_coche.bindPopup("Coche").openPopup();

        let boton_borrar=document.querySelector("#boton02");
        boton_borrar.disabled=false;

    }else{
        let ubicacion_coche = [0, 0];
        let mi_marcador_coche = L.marker(ubicacion_coche).addTo(mi_mapa);
        mi_marcador_coche.bindPopup("Coche").closePopup();

        let boton_borrar=document.querySelector("#boton02");
        boton_borrar.disabled=true;
    }
});

let boton01 = document.querySelector("#boton01");
boton01.addEventListener("click", manej_boton01);

let boton02 = document.querySelector("#boton02");
boton02.addEventListener("click", manej_boton02);