export function colGrid(clasesCol) {
    return clasesCol + " px-8";
}

export function containerGrid(clasesContainer = '') {
    return "element max-w-screen-xl mx-auto flex flex-wrap relative " + clasesContainer;
}

export function rowGrid(clasesRow = '') {
    return " -mx-8 flex " + clasesRow;

}