'use strict'
function semiverseno(coords1, coords2) {
    // Recibe dos par´ametros, cada uno es una lista [latitud, longitud]
    // Devuelve la distancia en metros entre ambos puntos.
    // Extraido de https://github.com/dcousens/haversine-distance

    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lat1 = coords1[0];
    var lon1 = coords1[1];

    var lat2 = coords2[0];
    var lon2 = coords2[1];

    var R = 6371000; // metros

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}

    function distancia(a,b){
        return semiverseno( [a[1],a[2]], [b[1],b[2]]) / 1000;
    }


    let p1 = ["madrid", 40.416, -3.703]
    let p2 = ["oviedo", 43.362, -5.848]
    let p3 = ["fuenlabrada", 40.284, -3.799]
    let p4 = ["sevilla", 37.385, -5.994]

    let puntos = [p1,p2,p3,p4]

    function informe(puntos){
        let rval = []
        let elemento;
        for (let a of puntos){
            for (let b of puntos){
                if (a !== b){
                    elemento = [];
                    elemento.push(a[0]);
                    elemento.push(b[0]);
                    elemento.push(Math.round(distancia(a,b)));
                    rval.push(elemento);
                }
            }
        }
        return rval;
    }
    
    console.log(informe(puntos))