/*!
* Start Bootstrap - Shop Item v5.0.6 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const baseUrl = 'https://chimalliapi.azurewebsites.net/api';
// Función para obtener los parámetros de consulta de la URL
const contenedorProductos = document.getElementById("contenedorDetalleProd");
const contenedorProductosRandom = document.getElementById("contenedor-productos-random");

function getQueryParameters() {
    const queryString = window.location.search.substring(1);
    const queryParams = {};
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return queryParams;
  }
  
  // Obtener los parámetros de consulta
  const queryParams = getQueryParameters();
  console.log(queryParams.name);
  // Verificar si hay datos en los parámetros de consulta
  if (queryParams.productId) {
    // Construir el objeto a partir de los parámetros de consulta
    const precioNeto = parseInt(queryParams.price)+20;
    const productoHTML = `
    <div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${queryParams.producUrl}" alt="${queryParams.name}" /></div>
    <div class="col-md-6">
        <div class="small mb-1">SKU: ${queryParams.productId}</div>
        <h1 class="display-5 fw-bolder">${queryParams.name}</h1>
        <div class="fs-5 mb-5">
            <span class="text-decoration-line-through">$ ${precioNeto}</span>
            <span>$ ${queryParams.price}</span>
        </div>
        <p class="lead">${queryParams.description}</p>
        <p class="lead">Stock: ${queryParams.stock}</p>
        <div class="d-flex">
            <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
            <button class="btn btn-outline-dark flex-shrink-0" type="button">
                <i class="bi-cart-fill me-1"></i>
                Add to cart
            </button>
        </div>
    </div>
</div>
      `;
    
      // Agrega el HTML del producto al contenedor
      contenedorProductos.innerHTML += productoHTML;
    
    // Hacer algo con los datos recibidos
    //console.log(queryParams);
  } else {
    console.error('No se encontraron datos en los parámetros de consulta.');
  }



  fetch(baseUrl+"/Product/related")
  .then(
    response => {
        if(!response.ok){
            throw new Error('Error en la peticion')
        }
        //
        return response.json();
    })
    .then(data => {
        const apiData = data.$values
        console.table(data.$values);
        const maxProductos = 4;

            for (let i = 0; i < Math.min(apiData.length, maxProductos); i++){
                const item = apiData[i];
            const numeroAleatorio = Math.floor(Math.random() * 5)+1;

            const queryString = Object.keys(item)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(item[key])}`)
            .join('&');
            
            
            const url = `item.html?${queryString}`;
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
                                    <!-- Product price-->
                                    $ ${item.price}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto mb-3" href="${url}">View options</a></div>
                            </div>
                        </div>
                    </div>
            `;
            // Agrega el HTML del producto al contenedor
            contenedorProductosRandom.innerHTML += productoHTML;
        }
    });
    

    /////Encabezado
const contenedorUL = document.getElementById('contenedorUL');
// Recupera la cadena JSON del localStorage
const usuarioJSON = localStorage.getItem('usuario');
if(!usuarioJSON){
  //Imprimir lo normal
  const headerSinUsuario = `<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
  <li class="nav-item"><a class="nav-link active" aria-current="page" href="../login/login.html">Login</a></li>
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