#Aplicaciones Telemáticas

#Raul Sanchez Merino

##Práctica 1.0 Preparación de los directorios

Creamos los directorios y ficheros dentro de la carpeta de la asignatura ~/at

##Practica 1.1 Markdown

Creamos el fichero markdown.
A continuacion generamos una version del mismo en HTML con este comando:

pandoc markdown.md -o markdown.html --css=style.css

Para limpiar el archivo markdown usando pandoc ejecutamos el siguiente comando:

pandoc markdown.md -t markdown -o markdown-limpio.md

##Practica 1.2 Inconsistencias en la web

Un caso es el de Deutsche Bank, cuya página web presenta inconsistencias en el uso de los pronombres. 
En el pie de página, se emplea la expresión "Síguenos", utilizando el tuteo, mientras que en otras secciones se encuentran frases como "Trabaje con nosotros" o "Encuentre su oficina". 

##Practica 1.3 W3C Validator

Voy a usar el W3C validator para analizar el código de tres sitios web:
### https://www.urjc.es
```
Error: Bad value /images/EstudiarURJC/oficina_estudiante/seguro escolar.pdf for attribute href on element a: Illegal character in path segment: space is not allowed.
```

Este error es provocado porque se ha guardado el pdf como 'seguro escolar.pdf', lo ideal sería 'seguro_escolar.pdf', por ejemplo o 'seguroescolar.pdf'

>Error: Attribute alt not allowed on element span at this point.

```
collapse">/\<span onclick="search()" alt="busqueda" class="pull-right" style="padding-top: 10px;" id="icon-search"><\/span.
```

En este caso utiliza la etiqueta span en un lugar que no es adecuado, usando title este error no ocurriría.

Error: Element style not allowed as child of element p in this context. (Suppressing further errors from this subtree.)

```
↩\</ul\>↩\<p\>\<style type="text/css"> \↩\↩ \↩.
```


W3C Validator sigue varios estándar como HTML5.Nightly, que indican que style solo debería estar dentro del atributo head.

```Error: Duplicate ID mod-finder-searchform.
t-append"><input name="q" required="" placeholder="&nbsp; Buscar..." size="10" type="text" id="mod-finder-searchword" class="search-query input-medium" /> <butt
Warning: The first occurrence of ID mod-finder-searchword was here
rchword"> <input name="q" required="" placeholder="&nbsp; Buscar..." size="10" id="mod-finder-searchword" class="search-query input-medium" type="text" /> </lab
```

Ha utlizado mod-finder-searchform en varios lugares del código.

### htpps://www.amazon.com
```
Error: A document must not include both a meta element with an http-equiv attribute whose value is content-type, and a meta element with a charset attribute.
t=UTF-8">↩<meta charset="utf-8">↩<meta
```

Ambas opciones son correctas pero tan sólo una de ellas debe aparecer.

```
Error: A meta element with an http-equiv attribute whose value is X-UA-Compatible must have a content attribute with the value IE=edge.
="utf-8">↩<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">↩<titl
```

Buscando en internet, he visto que ese plugin de google chrome no recibe soporte desde 2014,así que debería ser cambiado a: 
```
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```
```
Error: An img element must have an alt attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.
 <img src="https://images-na.ssl-images-amazon.com/captcha/qamfifum/Captcha_wdngwpegev.jpg">↩
 ``` 

Espera que la imagen contenga el atributo alt para su nombrado.

### https://elmundo.es
```
Error: Legacy encoding iso-8859-15 used. Documents must use UTF-8.
```

No utiliza la codificación UTF-8.

```
Error: Element script must not have attribute async unless attribute src is also specified or unless attribute type is specified with value module.
</script>↩<script type='text/javascript' async>var pb
```

Recibe un atributo que no esperaba.

```
Error: The frameborder attribute on the iframe element is obsolete. Use CSS instead.
<noscript><iframe src="https://5214106.fls.doubleclick.net/activityi;src=5214106;type=corp;cat=regis00;dc_lat=…tag_for_child_directed_treatment=;ord=1?" width="1" height="1" frameborder="0" style="display:none"></ifra
```

Utliza un atributo que está obsoleto.

##Practica 1.4 Elementos HTML

He creado el archivo ~/at/practica01/ej01.html con ejemplos de cada elemento de HTML.

Comprobamos con W3C Markup Validator que nuestro archivo no contiene ni errores ni warnings

##Practica 1.5 Formularios

Preparamos dos ficheros HTML alta.html y operacion.html


