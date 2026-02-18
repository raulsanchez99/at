#Práctica 2

##Práctica 2.0. Fichero con la memoria de prácticas

Creo todos los directorios necesarios.

##Práctica 2.1. Análisis de selectores

###Ejemplo 1

* *{ background-color: beige; }
Afecta a: Todos los elementos de la página.

* p { color: blue; text-align: left; background-color: yellow; }
Afecta a: Todos los párrafos (p).

* .feo { color: red; background-color: pink; }
Afecta a: Cualquier elemento con class="feo".
 
* .inverso { color: white; background-color: black; }
Afecta a: Cualquier elemento con class="inverso".

* h1 { color: violet; text-align: center; font-size: large; }
Afecta a: Todos los elementos h1

- El color de fondo es beige porque * aplica a todo el documento.
- El primer texto: "Hola, css" es de color rosa, esta centrado y esta en negrita porque tiene la etiqueta h1. 
- El segundo parrafo tiene la letra azul y fondo amarillo porque pertenece a la etiqueta p. 
- La siguiente línea pertenece a la clase feo, por eso es de color rojo con el fondo rosa. 
- Y el texto de la última linea es de color blanco y el fondo negro porque pertenece a la clase inverso.

###Ejemplo 2

* .españa .toledo { color: red; }
Afecta a: Cualquier elemento con la clase toledo que esté dentro de un elemento con la clase españa.

* .toledo { color: blue; }
Afecta a: Cualquier elemento con la clase toledo.

* .toledo, .cuenca { text-align: center; }
Afecta a: Cualquier elemento con la clase toledo o cuenca.

* .castilla-la-mancha { text-decoration: underline; }
Afecta a: Cualquier elemento con la clase castilla-la-mancha.

- La primera linea, "El pais España" no se ve afectada por ninguna de las reglas porque es de clase "pais españa"
- La segunda es de clase "castilla-la-mancha", por eso esta subrayada.
- La tercera es de clase "toledo" y descendiente de la clase "españa", por lo tanto el texto es de color rojo y está alineado al centro. Pero tambien esta subrayado por ser descendiente de la clase "castilla-la mancha"
- La cuarta linea está alineada en el centro porque es de clase "cuenca" y esta subrayada porque es heredera de la clase "castilla-la-mancha".
- La quinta solo esta subrayada porque pertenece por herencia a la clase "castilla-la-mancha".
- A la linea "6.El país Estados Unidos" no le afecta por ninguna regla.
- La septima linea tampoco le afecta ninguna regla.
- La última linea es de color azul y esta alineado al centro porque pertenece a la clase "Toledo". No es de color rojo porque no pertenece a la clase "españa".

###Ejemplo 3

* _  #alfa{color: blue;}
Afecta a: Cualquier elemento con id="alfa", sin importar su tipo.

* p#alfa { font-size: 200%; }
Afecta a: Solo a párrafos (p) con id="alfa".

* div#alfa { background-color: yellow; }
Afecta a: Un elemento div que tenga id="alfa".

* div #alfa { font-style: italic; }
Afecta a: Cualquier elemento con id="alfa" que esté dentro de un div, sin importar su tipo.

- La primera linea no se ve afectada por ninguna de las reglas porque no tiene id="alfa". 
- El segundo parrafo es de color azul por tener el id="alfa", tiene la fuente mayor por estar en un parrafo p y está en cursiva porque la linea se encuentra dentro de un div. 
- La tercera linea esta dentro de un bloque div pero no tiene id="alfa" por lo que no se verá afectada por ninguna regla.
- El cuarto parrafo tampoco se ve afectado por ninguna de las reglas creadas.

###Ejemplo 4

* .urjc { color: #CB0017; }
Afecta a: Cualquier elemento con la clase urjc.

* .urjc.reglamento { text-decoration: underline; }
Afecta a: Solo a elementos que tengan ambas clases urjc y reglamento simultáneamente.

* .urjc, .reglamento { background-color: lightblue; }
Afecta a: Cualquier elemento que tenga la clase urjc o la clase reglamento.

- El primer párrafo no se ve afectado por ninguna regla. 
- La segunda linea tiene la clases "reglamento" y "urjc" por lo que el color del fondo es de color azul, esta subrayado y el texto tiene el color #CB0017.
- La tercera linea tiene la clases "reglamento" y "ucm" por lo que solo tiene el fondo azul.
- La cuarta linea no se ve afectada por ninguna regla por que tiene la clase "matriculacion" 
- El quinto parrafo tiene la clases "investigacion" y "urjc". Por esto sabemos que tendrá el fondo de color azul y el texto sera de color #CB0017.
- La última linea tampoco se ve afectada por ninguna regla porque pertenece a las clases "investigacion" y "uc3m".

##Práctica 2.2. Uso de selectores

Preparamos un fichero html en ~/at/practica02/ej22.html.

Explicación:

* .español {background-color: red; color: yellow;}
Todos los elementos dentro de un contenedor con la clase .español tendrán un fondo rojo y el texto amarillo.

* .futbol {font-weight: bold;}
Todo el texto dentro de un elemento con la clase .futbol se verá en negrita.

* .baloncesto {text-decoration: underline;}
Todo el texto dentro de un elemento con la clase .baloncesto se subrayará.

* .futbol .baloncesto{font-size: 200%;}
Si un elemento con la clase .baloncesto está dentro de un .futbol, su tamaño de fuente se duplicará.

* h1{text-align: center; color: green;}
El texto de todos los h1 se centrará y el color del texto será verde.

##Práctica 2.3. Atributos del texto

Creamos el fichero: ~/at/practica02/ej23.html

Explicación:

- .comunidad{font-size: 150%; text-decoration: underline;}
Esta regla aplica a cualquier elemento con la clase .comunidad.

- .provincia{color: blue; padding: 10 px;}
Esta regla aplica a cualquier elemento con la clase .provincia, en este caso afecta a las provincias dentro de los div con la clase .provincia y también a Toledo.

- .comunidad .provincia{color: grey; font-size: 110%;}
Esta regla es más específica que la .provincia y solo se aplica a las provincias que estén dentro de un elemento con la clase .comunidad.

- .cautonoma{background-color: red; font-style: italic; text-align: center;}
Esta regla afecta a cualquier elemento con la clase .cautonoma, que es el div que contiene "Ceuta y Melilla".

##Práctica 2.4. Atributos de las cajas

Creamos el archivo ~/at/practica02/ej24.html

Explicacion:

* La caja 1 tendrá un fondo con color #5C9EAD  con texto negro y un borde sólido #326273. 
Su tamaño es de 200x200 píxeles, con margen y padding de 20px.

* A continuacón se verá una caja más grande que la anterior (250x250 px), con fondo azul oscuro, texto amarillo y un borde amarillo sólido de 3px.

* La caja 3 tendrá un fondo amarillo y texto negro, con un borde azul verdoso. Además, tendrá una imagen de fondo (logo.jpg).

* La última tendrá un fondo con texto blanco. La diferencia principal es su borde punteado amarillo de 4px.

##Práctica 2.5. Horario

Creamos el archivo ~/at/practica02/horario.html

El horario del primer cuatrimestre será un contenedor de tipo fluid, mientras que el segundo será ordinario (no fluid).
Aplicamos colores al fondo de cada celda del horario y asignaturas.

Terminado el ejercicio comprobamos con W3C validator que no hay ningun error o warning.

##Práctica 2.6. Rejilla de Bootstrap

Creamos el archivo ~/at/practica02/grid.html

##Práctica 2.7. CV

Creamos el archivo ~/at/practica02/cv.html

##Práctica 2.8. Carousel

Creamos el archivo ~/at/practica02/carousel.html

Obtenemos imagenes de uso libre y sin licencia.(Pexels)

##Práctica 2.9. Formularios Bootstrap

Modificamos los archivos alta.html y formulario.html para que ahora use bootstrap.

##Práctica 2.10. Landing Page

Creamos el archivo ~/ar/practica02/landing.html en el que simulamos la pagina principal de una web.
