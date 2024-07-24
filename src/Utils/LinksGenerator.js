export function linkGenerate(linksString) {
    return import.meta.env.BASE_URL + linksString;
}

export function getBaseUrl() {
    return import.meta.env.BASE_URL;
}

export function getBreadCrumb(currentUrl, currentPage = "") {
    // console.log(currentUrl.split("/"));
    let split = currentUrl.split("/");
    const baseUrl = getBaseUrl();

    console.log(currentPage);
    let urls = [];
    let preUrls = [{
        "url": baseUrl,
        "label": "Sobre mí"
    }];
    let url = '';



    for (let index = 0; index < split.length; index++) {
        const element = split[index];
        url += "/" + element;
        url= url.replace(/\/\//g, "/");

        if(element && ("/" + element) != baseUrl) {            let text = element.replace("/", "");  // Elimina la barra
            text = text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');  // Reemplaza los guiones por espacios y convierte la primera letra de cada palabra a mayúsculas
            console.log("entro");
            console.log(text);
            if(index != (split.length - 1) && text) {
                preUrls.push({
                    "url": url,
                    "label": correctText(text)
                });
            } 
        }
    }

    if(currentPage !== "") {
       /* preUrls.push({
            "label": currentPage
        });*/
    }

    return preUrls;

}

function correctText(text) {

    switch (text) {
        case "guias":
            return "Guías";    
        default:
            break;
    }

    return text;
}

export function createAnchorLinks() {
    // Selecciona el div con la clase 'blog-content'
    var blogContent = document.querySelector('.blog-content');
  
    // Selecciona todos los encabezados h2 y h3 dentro de 'blog-content'
    var headers = blogContent.querySelectorAll('h2, h3');
  
    // Itera sobre cada encabezado
    headers.forEach(function(header, index) {
      // Crea un ID único para cada encabezado
      var headerId = 'header-' + index;
  
      // Asigna el ID al encabezado
      header.id = headerId;
  
      // Crea un nuevo enlace de anclaje
      var anchor = document.createElement('a');
      anchor.href = '#' + headerId;
      anchor.textContent = header.textContent;
  
      // Limpia el contenido del encabezado
      header.textContent = '';
  
      // Añade el enlace de anclaje al encabezado
      header.appendChild(anchor);
  
      // Agrega el enlace de anclaje a una lista (por ejemplo, un elemento ul o ol)
      var list = document.querySelector('#your-list-id'); // Reemplaza '#your-list-id' con el ID de tu lista
      var listItem = document.createElement('li');
      listItem.appendChild(anchor.cloneNode(true)); // Clona el enlace de anclaje para añadirlo a la lista
      list.appendChild(listItem);
    });
  }
  