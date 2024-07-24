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
