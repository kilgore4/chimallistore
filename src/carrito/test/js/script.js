// Recupera la cadena JSON del localStorage
const arregloJSON = localStorage.getItem('miArreglo');

// Analiza la cadena JSON para obtener el arreglo
const arregloRecuperado = JSON.parse(arregloJSON);

console.log('Arreglo recuperado del localStorage:', arregloRecuperado);