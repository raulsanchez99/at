'use strict'

function contains(clases, clase){
    let encontrado = false;
    let clases_como_lista = clases.split(" ");

    for (let c of clases_como_lista){
        if (c === clase) {

        encontrado = true;

        }   
    }
    return encontrado;
}

function add(clases, clase){
    if (contains(clases, clase) === false){

        clases = clases +" "+ clase;
    }
    return clases
}

function remove(clases, clase){
    let clases_como_lista = clases.split(" ");
    let nueva_lista = []

    for (let c of clases_como_lista){
        if (c !== clase){
            nueva_lista.push(c);
        }
    }

    let rval = lista_a_cadena(nueva_lista);
    return rval;
}

function toggle(clases, clase){
    if (contains(clases,clase)){
        clases = remove(clases,clase);
    } else {
        clases = add(clases,clase);
    }

    return clases;
}


function lista_a_cadena(lista){
    // Recibe un array de clases. P.e. ['aaa', 'bbb']
    // Devuelve una cadena con las clases, separadas por espacios.
    // P.e. 'aaa bbb'
    let rval = ""

    for (let c of lista){
        rval = rval + c + " ";
    }

    rval = rval.trim(); // Borramos el ´ultimo espacio
    return rval;

}


let ejemplo = "aaa bbb";
ejemplo = add(ejemplo,"ccc");
console.log(ejemplo); // aaa bbb ccc
ejemplo = add(ejemplo,"ccc");
console.log(ejemplo); // aaa bbb ccc

console.log(contains(ejemplo, "bbb")) // true
console.log(contains(ejemplo, "bb")) // false

ejemplo = remove(ejemplo, "bbb")
console.log(ejemplo); // aaa ccc

ejemplo = remove(ejemplo, "bb")
console.log(ejemplo); // aaa ccc

ejemplo = toggle(ejemplo,"ccc");
console.log(ejemplo); // aaa
ejemplo = toggle(ejemplo,"ccc");
console.log(ejemplo); // "aaa ccc"


