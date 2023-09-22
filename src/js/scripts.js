const baseUrl = 'https://chimalliapi.azurewebsites.net/api';



const contenedorProductos = document.getElementById("contenedor-productos");

fetch(baseUrl+"/Product")
.then(response => {
    // Verificar si la respuesta tiene un código de estado exitoso (por ejemplo, 200)
    if (!response.ok) {
        throw new Error('Error en la petición');
      }
      
      // Procesar la respuesta como JSON
      return response.json();
    })
    .then(data => {
      // Manipular los datos de la respuesta
      const apiData = data.$values;
      console.log(data.$values);
      const newData = apiData.map(item => { 
        const numeroAleatorio = Math.floor(Math.random() * 5) + 1;

        const queryString = Object.keys(item)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item[key])}`)
  .join('&');

const url = `item/item.html?${queryString}`;

        const productoHTML = `
        <div class="col mb-5">
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src="${item.producUrl}" alt="${item.name}" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${item.name}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                        ${getRatingStarsHTML(numeroAleatorio)}
                        </div>
                        <!-- Product price-->
                        ${item.price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto mb-3" href="${url}" >View options</a></div>
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" id=1>Add to cart</a></div>
                </div>
            </div>
        </div>
      `;
    
      // Agrega el HTML del producto al contenedor
      contenedorProductos.innerHTML += productoHTML;
      
      
      });
      
    }
)
.catch(error => {
    // Manejar errores
    console.error('Error:', error);
  });

  // Función para generar las estrellas de calificación
function getRatingStarsHTML(rating) {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHTML += '<div class="bi-star-fill"></div>';
    } else {
      starsHTML += '<div class="bi-star"></div>';
    }
  }
  return starsHTML;
}



// Obtén el botón por su id
const btnAbrirSeccion = document.getElementById("btnAbrirSeccion");

// Agrega un manejador de eventos al botón
btnAbrirSeccion.addEventListener("click", () => {
    // Redirige al usuario a la página carrito/carrito.html
    window.location.href = "carrito/carrito.html";
});


//Mandar producto al carrito
function llenarCarrito(productoID){
  
  return null;
}



/////Encabezado
const contenedorUL = document.getElementById('contenedorUL');
// Recupera la cadena JSON del localStorage
const usuarioJSON = localStorage.getItem('usuario');
if(!usuarioJSON){
  //Imprimir lo normal
  const headerSinUsuario = `<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
  <li class="nav-item"><a class="nav-link active" aria-current="page" href="login/login.html">LogIn</a></li>

  </ul>`;
  contenedorUL.innerHTML += headerSinUsuario;
}else{
    // Analiza la cadena JSON para obtener el arreglo
  const usuarioRecuperado = JSON.parse(usuarioJSON);
  const {alias} = usuarioRecuperado;
   const headerLogin = `<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
   <li class="nav-item"><a class="nav-link active" aria-current="page" >Bienvenido ${alias}</a></li>
   <li class="nav-item"><a class="nav-link active" aria-current="page" href="profile/profile.html">Profile</a></li>
   <li class="nav-item"><a class="nav-link" id="logout" href="#">LogOut</a></li>
   </ul>`;
   contenedorUL.innerHTML += headerLogin;

   const logOutLink = document.getElementById("logout");
   logOutLink.addEventListener('click', function(){
    localStorage.clear();
    window.location.href = 'index.html';
   })

}


//console.log('Arreglo recuperado del localStorage:', arregloRecuperado);


