---
pretitle: "Domina los navegadores web"
title: "Explorando los Navegadores Web: Funcionamiento Interno y Procesos de Análisis"
description: "Sumérgete en el mundo de los navegadores web con nuestra guía completa. Aprende sobre la función de un navegador, sus componentes clave y los procesos de análisis de documentos HTML y CSS. Descubre cómo se construyen y renderizan las páginas web, y entiende los detalles técnicos que permiten una visualización eficiente y precisa del contenido web. Ideal para desarrolladores web y entusiastas de la tecnología que desean profundizar en el funcionamiento interno de los navegadores."
titleTeaser: "Funcionamiento de los Navegadores Web"
descriptionTeaser: "Descubre el funcionamiento interno de los navegadores web y los procesos de análisis de HTML y CSS. Una guía esencial para comprender cómo se construyen y renderizan las páginas web."
---

## Función de un navegador web y partes

La función principal de un navegador es solicitar al servidor los recursos web seleccionados por el usuario y mostrarlos en una ventana. Estos recursos suelen ser documentos HTML, pero también pueden incluir archivos PDF, imágenes u otros tipos de objetos. El usuario especifica la ubicación del recurso mediante una URI (Uniform Resource Identifier, identificador uniforme de recurso).

La interpretación y visualización de los archivos HTML por parte del navegador se rige por las especificaciones de CSS y HTML, establecidas por el consorcio W3C (World Wide Web Consortium), la organización encargada de los estándares de Internet.

Componentes del Navegador:

* **Interfaz de usuario**: Partes visibles que interactúan con el usuario, excepto la ventana principal.
* **Motor de búsqueda**: Coordina la interfaz y el motor de renderización.
* **Motor de renderización**: Muestra el contenido solicitado, analiza el HTML y el CSS, y presenta el contenido.
* **Red**: Gestiona las solicitudes HTTP.
* **Intérprete de JavaScript**: Analiza y ejecuta el código JavaScript.
* **Almacenamiento de datos**: Capa de persistencia, como cookies o bases de datos web de HTML5.

El motor de renderización comienza recibiendo el contenido del documento solicitado desde la capa de red, generalmente en fragmentos.

1. El motor de renderización analiza el documento HTML y convierte las etiquetas en nodos DOM, formando un árbol denominado “árbol de contenido”.
2. Analiza los datos de estilo, tanto de los archivos CSS externos como de los elementos de estilo internos.
3. Los datos de estilo, junto con las instrucciones visuales del código HTML, se utilizan para crear otro árbol: el “árbol de renderización”.
4. Una vez construido el árbol de renderización, se inicia el proceso de “diseño”, asignando a cada nodo las coordenadas exactas de su posición en la pantalla.
5. La siguiente fase es la de “pintura”, donde se recorre el árbol de renderización y se pinta cada nodo utilizando la capa de servidor de la interfaz de usuario.

Durante este proceso, algunas partes del contenido se analizan y muestran mientras se sigue procesando el resto del contenido que llega de la red.

## Proceso de Análisis de Documentos

El análisis de un documento implica su transformación en una estructura comprensible y utilizable por el código. Este proceso genera, como resultado, un árbol de nodos que refleja la estructura inherente del documento.

Este procedimiento se fundamenta en las reglas sintácticas que rigen el documento, es decir, se basa en el lenguaje o formato en el que está redactado el documento.

Los sistemas de análisis suelen dividir la tarea en dos componentes principales:

1. El **analizador léxico** (también conocido como “tokenizador”): Se encarga de descomponer los datos de entrada en tokens válidos. Es importante destacar que el analizador léxico tiene la capacidad de ignorar caracteres que no aportan información relevante, como los espacios en blanco y los saltos de línea.
2. El **analizador sintáctico**: Tiene la responsabilidad de construir el árbol, analizando la estructura del documento de acuerdo con las reglas sintácticas del lenguaje.

El proceso de análisis es iterativo. Normalmente, el analizador sintáctico solicita al analizador léxico un nuevo token e intenta encontrar correspondencias entre el token y una de las reglas sintácticas. Si se encuentra una coincidencia, se añade al árbol de análisis un nodo correspondiente al token y el analizador solicita otro token.

Si el token no coincide con ninguna regla, el analizador lo almacena internamente y continúa solicitando tokens hasta que encuentra una regla que coincide con todos los tokens almacenados internamente. Si no encuentra ninguna regla que coincida, se produce una excepción. Esto indica que el documento no se considera válido debido a errores de sintaxis.

## Proceso de Análisis de HTML

El objetivo principal de un analizador HTML es interpretar las marcas HTML y estructurarlas en un árbol de análisis. El lenguaje HTML es notablemente “flexible”, ya que permite la omisión de ciertas etiquetas que se infieren de manera implícita, e incluso a veces se omite el inicio o el final de las etiquetas.

La definición de HTML se presenta en formato DTD (Definición de Tipo de Documento). Este formato se utiliza para definir lenguajes de la familia SGML (Lenguaje de Marcado Generalizado Estándar). Incluye las definiciones de todos los elementos permitidos, sus atributos y su jerarquía. Como se mencionó anteriormente, la definición DTD del lenguaje HTML no conforma una gramática libre de contexto.

El árbol resultante, conocido como “árbol de análisis”, está compuesto por elementos DOM y nodos de atributo. DOM es el acrónimo de “Document Object Model” (Modelo de Objetos del Documento). Representa la estructura de objetos del documento HTML y proporciona la interfaz para interactuar con los elementos HTML desde el exterior, como por ejemplo, a través de JavaScript.

# Análisis de CSS

El modelo de la web es síncrono. Los autores esperan que las secuencias de comandos se analicen y se ejecuten inmediatamente cuando el analizador llega a la etiqueta <script>. Como las secuencias de comandos son externas, primero es necesario recuperar el recurso de la red. Esta acción también se realiza de manera síncrona, es decir, el análisis se detiene hasta que se recupera el recurso.

Los autores pueden marcar la secuencia de comandos como "aplazada". De este modo, el análisis del documento no se detiene y la secuencia se ejecuta una vez que el análisis se ha completado.

Al ejecutar las secuencias de comandos, otro subproceso analiza el resto del documento, busca en la red otros recursos necesarios y los carga. De esta forma, los recursos se pueden cargar mediante conexiones paralelas, lo que mejora la velocidad general. El analizador especulativo no modifica el árbol de DOM (de eso se encarga el analizador principal), solo analiza las referencias a recursos externos, como secuencias de comandos externas, hojas de estilo e imágenes.

Dado que las hojas de estilo no modifican el árbol de DOM, no hay razón para esperarlas y detener el análisis del documento.

Mientras se está construyendo el árbol DOM, el navegador construye otro árbol: el árbol de renderización. Este árbol está formado por elementos visuales que se muestran en el mismo orden en que aparecerán. Es la representación visual del documento. El propósito de este árbol es poder representar el contenido en el orden correcto.

Los renderizadores corresponden a elementos DOM, pero la relación no es de uno a uno. Los elementos DOM no visuales no se insertan en el árbol de renderización. Un ejemplo sería el elemento <head>. Los elementos cuyo atributo de visualización se ha asignado a "none" tampoco aparecen en el árbol (los elementos con el atributo de visibilidad "hidden" sí aparecen en el árbol).

Al contener numerosas propiedades de estilo, los datos de estilo pueden alcanzar dimensiones considerables, lo que puede provocar un uso excesivo de memoria. La búsqueda de las reglas coincidentes para cada elemento puede afectar al rendimiento si no se optimiza el proceso. Recorrer la lista completa de reglas para cada elemento para encontrar coincidencias es una tarea muy pesada. Los selectores pueden tener una estructura compleja, lo que puede llevar a buscar en una ruta que aparentemente sea buena, pero que finalmente no lo sea, y debas probar con otra ruta.

```html
div div div div {
  ...
}
```
Significa que las reglas se aplican a un elemento \<div\> que es el descendiente de tres elementos \<div\>. Supongamos que quieres comprobar si la regla se aplica a un elemento \<div\> determinado. Debes seleccionar una ruta superior del árbol para comprobarlo. Es posible que debas ascender por todo el árbol de nodos solo para averiguar que únicamente existen dos elementos \<div\> y que la regla no se aplica. A continuación, debes probar con otras rutas del árbol.


Existen mapas organizados por ID, nombre de clase y nombre de etiqueta, y un mapa general para todo lo que no se puede incluir en estas categorías. Si el selector es un ID, la regla se añadirá al mapa de ID; si es una clase, se añadirá al mapa de clase, etc. Esta manipulación facilita considerablemente la tarea de asignación de reglas. No es necesario revisar cada declaración; podemos extraer las reglas relevantes para un elemento de los mapas. Esta optimización elimina más del 95% de las reglas, por lo que ni siquiera es necesario tenerlas en cuenta durante el proceso de búsqueda de coincidencias.

```css
p.error { color: red }
#messageDiv { height: 50px }
div { margin: 5px }
```
La primera regla se insertará en el mapa de clase, la segunda en el mapa de ID y la tercera en el mapa de etiquetas.

Para el siguiente fragmento de HTML:

```html
<p class="error">An error occurred</p>
<div id="messageDiv">This is a message</div>
```
En primer lugar, intentaremos buscar reglas para el elemento \<p\>. El mapa de clase incluirá una clave "error" dentro de la que se encuentra la regla para p.error. El elemento \<div\> tendrá reglas relevantes en el mapa de ID (la clave es el ID) y en el mapa de etiquetas. Por tanto, solo queda averiguar qué reglas extraídas de las claves realmente coinciden.

Por ejemplo, si la regla del elemento \<div\> fuera la siguiente:

```css
table div { margin: 5px }
```
Se extraería del mapa de etiquetas, porque la clave es el selector situado más a la derecha, pero no coincidiría con el elemento \<div\>, que no cuenta con un antecesor \<table\>.










