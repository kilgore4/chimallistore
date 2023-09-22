// Obtener los elementos relevantes del DOM
const listaCarrito = document.getElementById("listaCarrito");
const inputStocks = document.querySelectorAll(".inputStock");
const btnDecrementar = document.querySelectorAll(".btnDecrementar");
const btnIncrementar = document.querySelectorAll(".btnIncrementar");

// Función para actualizar el total
function actualizarTotal() {
    let total = 0;
    listaCarrito.querySelectorAll(".producto").forEach((producto, index) => {
        const precio = parseFloat(producto.querySelector("span:nth-child(2)").textContent.replace("$", ""));
        const cantidad = parseInt(inputStocks[index].value);
        total += precio * cantidad;
    });
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Manejar el evento de decrementar
function decrementarStock(index) {
    const stock = parseInt(inputStocks[index].value);
    if (stock > 1) {
        inputStocks[index].value = stock - 1;
        actualizarTotal();
    }
}

// Manejar el evento de incrementar
function incrementarStock(index, limite) {
    const stock = parseInt(inputStocks[index].value);
    if (stock < limite) {
        inputStocks[index].value = stock + 1;
        actualizarTotal();
    }
}

// Agregar manejadores de eventos a los botones
btnDecrementar.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        decrementarStock(index);
    });
});

btnIncrementar.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (index === 0) {
            // Límite de 6 para el primer producto
            incrementarStock(index, 6);
        } else if (index === 1) {
            // Límite de 15 para el segundo producto
            incrementarStock(index, 15);
        } else {
            // Otros productos sin límites específicos
            incrementarStock(index, Infinity);
        }
    });
});

// Inicializar el total
actualizarTotal();




// Obtén los botones de eliminar y agrega un manejador de eventos a cada uno
const btnEliminar = document.querySelectorAll(".btnEliminar");
const carritoVacio = document.getElementById("carritoVacio");
// Obtén una referencia al botón "Pagar con PayPal"
const btnPagarPayPal = document.getElementById("btnPagar");

btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Evita que se recargue la página cuando se hace clic en el botón
        e.preventDefault();

        // Encuentra el elemento padre (li.producto) del botón clickeado
        const producto = btn.closest(".producto");

        // Obtén el valor del atributo data-id
        const id = producto.getAttribute("data-id");

        // Elimina el elemento del carrito basado en el data-id
        producto.remove();

        // Actualiza el total
        actualizarTotal();

        // Verifica si no hay elementos con la clase "producto" en el carrito
        const productosEnCarrito = listaCarrito.querySelectorAll(".producto");
        if (productosEnCarrito.length === 0) {
            // Muestra el mensaje cuando el carrito esté vacío
            carritoVacio.innerHTML = "Carrito Vacío<br><br>Puedes continuar explorando por artículos interesantes";
            // El carrito está vacío, oculta el botón "Pagar con PayPal"
            btnPagarPayPal.style.display = "none";

            // Agrega una imagen al mensaje
            const imagenVacia = document.createElement("img");
            imagenVacia.src = "shopping-cart.png"; // Reemplaza "imagen_vacia.png" con la URL de tu imagen vacía
            imagenVacia.style.width = "70%"; // Escala la imagen al 70%
            carritoVacio.appendChild(imagenVacia);
          } else {
            // Borra el contenido del mensaje si hay elementos en el carrito
            carritoVacio.textContent = "";

            // Hay elementos en el carrito, muestra el botón "Pagar con PayPal"
            btnPagarPayPal.style.display = "block";
        }
    });
});

// Función para actualizar el total
function actualizarTotal() {
    let total = 0;
    listaCarrito.querySelectorAll(".producto").forEach((producto, index) => {
        const precio = parseFloat(producto.querySelector("span:nth-child(2)").textContent.replace("$", ""));
        const cantidad = parseInt(inputStocks[index].value);
        total += precio * cantidad;
    });
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}



