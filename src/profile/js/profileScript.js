//Llamar al elemento
const contenedorInformacion = document.getElementById("informacion");

//variable de inyeccion html
let informacion;
let currentId;

//obtener el localStorage
let usuarioJSON = localStorage.getItem('usuario');
let datosPersonalesJSON = localStorage.getItem('datosPersonales');
let direccionJSON = localStorage.getItem('direccion');

// variable global para guardar datos
let datosOriginales;
let fechaSQLServer;

if(usuarioJSON&&direccionJSON&&datosPersonalesJSON){
    //console.log(usuarioJSON);
    //console.log(datosPersonalesJSON);
    //console.log(direccionJSON);
    
    //Obtener datos de USER
    const usuarioRecuperado = JSON.parse(usuarioJSON);
    const {alias,email} =usuarioRecuperado;
    const {userId} = usuarioRecuperado;
    currentId = userId;
    //const {email} =usuarioRecuperado;

    //Obtener datos de People
    const informacionRecuperado = JSON.parse(datosPersonalesJSON);
    const {name,lastName,maternalLastName, birthdate, genre} = informacionRecuperado.person;
    //console.log("Datos de person: ",informacionRecuperado.person);

    //Obtener datos de Direccion
    const direccionRecuperado = JSON.parse(direccionJSON);
    const {street, suburb, city, state, cp, country} = direccionRecuperado.addresses[0];
    //console.log("verificar datos de direccionRecuperado: ",direccionRecuperado.addresses[0]);
    
    //backup datos originales
    //datosOriginales.alias=alias;
     datosOriginales  = {
        alias,
        email,

        name,
        lastName,
        maternalLastName,
        birthdate,
        genre,

        street,
        suburb,
        city,
        state,
        cp,
        country
    };
    console.log("Estos son los datos originales: ",JSON.stringify(datosOriginales));
    informacion = `
    <div class="user-info">
    <h1>Información del Usuario</h1>
    <label for="alias"><strong>Alias:</strong></label>
    <input type="text" id="alias" value="${datosOriginales.alias}">
    <label for="email"><strong>Email:</strong></label>
    <input type="text" id="email" value="${datosOriginales.email}">
    
    <h2>Información Adicional</h2>
    <label for="nombre"><strong>Nombre:</strong></label>
    <input type="text" id="nombre" value="${datosOriginales.name}">
    <label for="apellidoPaterno"><strong>Apellido Paterno:</strong></label>
    <input type="text" id="apellidoPaterno" value="${datosOriginales.lastName}">
    <label for="apellidoMaterno"><strong>Apellido Materno:</strong></label>
    <input type="text" id="apellidoMaterno" value="${datosOriginales.maternalLastName}">
    <label for="fechaNacimiento"><strong>Fecha de Nacimiento:</strong></label>
    <input type="text" id="fechaNacimiento" value="${datosOriginales.birthdate}">
    <label for="genero"><strong>Género:</strong></label>
    <input type="text" id="genero" value="${datosOriginales.genre}">
    <!--<label for="pais"><strong>País:</strong></label>
    <input type="text" id="pais" value="{country}"> -->
    </div>
    
    <div class="address-info">
    <h2>Dirección:</h2>
    <label for="calle"><strong>Calle:</strong></label>
    <input type="text" id="calle" value="${datosOriginales.street}">
    <label for="colonia"><strong>Colonia:</strong></label>
    <input type="text" id="colonia" value="${datosOriginales.suburb}">
    <label for="ciudad"><strong>Ciudad:</strong></label>
    <input type="text" id="ciudad" value="${datosOriginales.city}">
    <label for="estado"><strong>Estado:</strong></label>
    <input type="text" id="estado" value="${datosOriginales.state}">
    <label for="codigoPostal"><strong>Código Postal:</strong></label>
    <input type="text" id="codigoPostal" value="${datosOriginales.cp}">
    <label for="direccionPais"><strong>País:</strong></label>
    <input type="text" id="direccionPais" value="${datosOriginales.country}">
    </div>
    <div class="buttons">
        <button id="actualizarDatos">Actualizar Datos</button>
        <button id="restaurarDatos">Restaurar Datos</button>
        <button id="regresarIndex"><a href='../index.html' id="regresarIndex2">Cancelar</a></button>
    </div>`;

    
}else{
    console.log("No hay nada");
    informacion = `
    <div class="user-info">
    <h1>Información del Usuario</h1>
    <label for="alias"><strong>Alias:</strong></label>
    <input type="text" id="alias" value="pedro">
    <label for="email"><strong>Email:</strong></label>
    <input type="text" id="email" value="pedro@email.com">
    <h2>Información Adicional</h2>
    <label for="nombre"><strong>Nombre:</strong></label>
    <input type="text" id="nombre" value="Pedro">
    <label for="apellidoPaterno"><strong>Apellido Paterno:</strong></label>
    <input type="text" id="apellidoPaterno" value="Aragon">
    <label for="apellidoMaterno"><strong>Apellido Materno:</strong></label>
    <input type="text" id="apellidoMaterno" value="Hernandez">
    <label for="fechaNacimiento"><strong>Fecha de Nacimiento:</strong></label>
    <input type="text" id="fechaNacimiento" value="2023-09-20">
    <label for="genero"><strong>Género:</strong></label>
    <input type="text" id="genero" value="Masculino">
    <!--<label for="pais"><strong>País:</strong></label>
    <input type="text" id="pais" value="Mexico">-->
    </div>
    <div class="address-info">
    <h2>Dirección:</h2>
    <label for="calle"><strong>Calle:</strong></label>
    <input type="text" id="calle" value="Calle Balsas">
    <label for="colonia"><strong>Colonia:</strong></label>
    <input type="text" id="colonia" value="La michoacana">
    <label for="ciudad"><strong>Ciudad:</strong></label>
    <input type="text" id="ciudad" value="Neza">
    <label for="estado"><strong>Estado:</strong></label>
    <input type="text" id="estado" value="MX">
    <label for="codigoPostal"><strong>Código Postal:</strong></label>
    <input type="text" id="codigoPostal" value="5700">
    <label for="direccionPais"><strong>País:</strong></label>
    <input type="text" id="direccionPais" value="Mexico">
    </div>`;
}
contenedorInformacion.innerHTML += informacion;

/*
// Luego, selecciona el campo de entrada de fecha y aplica DatePicker
$("#fechaNacimiento").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
});

// Agrega un evento al campo de entrada para guardar la fecha en formato JSON
$("#fechaNacimiento").on("change", function() {
    const fechaSeleccionada = $(this).val();
    const fechaJSON = JSON.stringify({ fechaNacimiento: fechaSeleccionada });
    console.log("Fecha en formato JSON:", fechaJSON);
});
*/

    // Inicializa el DatePicker con opciones personalizadas
    $("#fechaNacimiento").datepicker({
        dateFormat: "yy-mm-dd", // Formato de fecha para mostrar
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:c", // Muestra años desde 1900 hasta el año actual
        minDate: new Date(1900, 0, 1), // Establece la fecha mínima a 1900-01-01
    });

    // Agrega un evento al campo de entrada para guardar la fecha en el formato de SQL Server
    $("#fechaNacimiento").on("change", function() {
        const fechaSeleccionada = $(this).val(); // Fecha en formato "yy-mm-dd"
        
        // Convierte la fecha al formato de SQL Server
        fechaSQLServer = fechaSeleccionada + " 00:00:00.000";
        
        console.log("Fecha en formato SQL Server:", fechaSQLServer);
    });


///Botones de actualizar y restaurar datos
//Variable botones
// Obtener los elementos de entrada y botones
let aliasInput = document.getElementById('alias');
let emailInput = document.getElementById('email');
let nombreInput = document.getElementById('nombre');
let apellidoPaternoInput = document.getElementById('apellidoPaterno');
let apellidoMaternoInput = document.getElementById('apellidoMaterno');
let fechaNacimientoInput = document.getElementById('fechaNacimiento');
let generoInput = document.getElementById('genero');
let paisInput = document.getElementById('pais');
let calleInput = document.getElementById('calle');
let coloniaInput = document.getElementById('colonia');
let ciudadInput = document.getElementById('ciudad');
let estadoInput = document.getElementById('estado');
let codigoPostalInput = document.getElementById('codigoPostal');
let direccionPaisInput = document.getElementById('direccionPais');
let actualizarDatosBtn = document.getElementById('actualizarDatos');
let restaurarDatosBtn = document.getElementById('restaurarDatos');

// Restaurar datos originales del usuario
restaurarDatosBtn.addEventListener('click', () => {
    // Restaurar los valores originales de los campos de entrada
    aliasInput.value = datosOriginales.alias;
    emailInput.value = datosOriginales.email;
    nombreInput.value = datosOriginales.name;
    apellidoPaternoInput.value = datosOriginales.lastName;
    apellidoMaternoInput.value = datosOriginales.maternalLastName;
    fechaNacimientoInput.value = datosOriginales.birthdate;
    generoInput.value = datosOriginales.genre;

    calleInput.value = datosOriginales.street;
    coloniaInput.value = datosOriginales.suburb;
    ciudadInput.value = datosOriginales.city;
    estadoInput.value = datosOriginales.state;
    codigoPostalInput.value = datosOriginales.cp;
    direccionPaisInput.value = datosOriginales.country;
});

//Solo numeros en Codigo Postal
// Agrega un evento de escucha para el evento de entrada de texto
codigoPostalInput.addEventListener("input", function(event) {
    // Obtén el valor actual del campo de entrada
    const valorActual = codigoPostalInput.value;

    // Limpia el valor de entrada para eliminar caracteres no numéricos
    const valorNumerico = valorActual.replace(/[^0-9]/g, '');

    // Actualiza el valor del campo de entrada con solo caracteres numéricos
    codigoPostalInput.value = valorNumerico;
});



// Actualizar datos del usuario
actualizarDatosBtn.addEventListener('click', () => {
    //Mandar JSON y el userID 
    const usuarioRecuperado = JSON.parse(usuarioJSON);
    const {userId} = usuarioRecuperado;

    const baseUrl = 'https://chimalliapi.azurewebsites.net/api/Users';
    const endpoint = `/update-alias/${userId}`; // Reemplaza con el endpoint correcto
    //console.log("Objeto JSON: ",JSON.stringify(datosOriginales));

/////////////////Actualizando datos originales
 aliasInput = document.getElementById('alias');
 emailInput = document.getElementById('email');
 nombreInput = document.getElementById('nombre');
 apellidoPaternoInput = document.getElementById('apellidoPaterno');
 apellidoMaternoInput = document.getElementById('apellidoMaterno');
 fechaNacimientoInput = document.getElementById('fechaNacimiento');
 generoInput = document.getElementById('genero');
 paisInput = document.getElementById('pais');
 calleInput = document.getElementById('calle');
 coloniaInput = document.getElementById('colonia');
 ciudadInput = document.getElementById('ciudad');
 estadoInput = document.getElementById('estado');
 codigoPostalInput = document.getElementById('codigoPostal');
 direccionPaisInput = document.getElementById('direccionPais');
 actualizarDatosBtn = document.getElementById('actualizarDatos');
 restaurarDatosBtn = document.getElementById('restaurarDatos');


datosOriginales.alias = aliasInput.value;
datosOriginales.email = emailInput.value;
datosOriginales.name = nombreInput.value;
datosOriginales.lastName = apellidoPaternoInput.value;
datosOriginales.maternalLastName = apellidoMaternoInput.value;
datosOriginales.birthdate = fechaNacimientoInput.value;
datosOriginales.genre = generoInput.value;

datosOriginales.street = calleInput.value;
datosOriginales.suburb = coloniaInput.value;
datosOriginales.city = ciudadInput.value;
datosOriginales.state = estadoInput.value;
datosOriginales.cp = codigoPostalInput.value;
datosOriginales.country = direccionPaisInput.value;


console.log("Nueva datosOriginales  actualizada: ",datosOriginales);
/////////////////////////////////////////////


    console.log(baseUrl + endpoint);
          // Realiza la solicitud PUT
          fetch(baseUrl + endpoint, {
            method: "PUT", // Método HTTP PUT
            headers: {
            "Content-Type": "application/json", // Tipo de contenido JSON
            },
            body: JSON.stringify(datosOriginales), // Convierte los nuevos datos a JSON
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud PUT");
            }
            console.log("todo ok");
            // Verifica si la respuesta no está vacía
            if (response.status === 204) {
                // La respuesta está vacía (código de estado 204)
                return null; // O cualquier valor adecuado en caso de respuesta vacía
            }
            // Continúa analizando la respuesta JSON
            return response.json();
            })
            .then((data) => {
            console.log("Respuesta exitosa:", data);
 /////////////////Segundo FETCH

            //Llenando de nuevo los localStorage
            const usuarioID = currentId;
            console.log(baseUrl +`/datosOriginales/${usuarioID}`);
            fetch(baseUrl +`/datosOriginales/${usuarioID}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Error en la petición');
                  }
                  return response.json();
                })
                .then((userData) => {
                  // userData contiene los datos del usuario en formato JSON
                  localStorage.clear();
                  console.log("Se limpio el localStorage");
                  const user = {
                    userId:userData.userId,
                    alias:userData.alias,
                    email:userData.email,
                    userId:userData.userId,
                    personId:userData.personId
                    };
                  console.log(userData);
                  
                  //arreglo = data;
                userJSON = JSON.stringify(user);
                localStorage.setItem('usuario', userJSON);
                console.log('objeto usuario guardado en localStorage ', JSON.parse(userJSON));
                
                //Direcciones en JSON
                const address1 = {
                    addresses:userData.addresses.$values
                }
                addressJSON = JSON.stringify(address1);
                localStorage.setItem('direccion',addressJSON);
                console.log('objeto usuario guardado en localStorage ', JSON.parse(addressJSON));

                //Datos personales en JSON
                const datosPersonales = {
                    person:userData.person
                }
                datosPersonalesJSON = JSON.stringify(datosPersonales);
                localStorage.setItem('datosPersonales',datosPersonalesJSON);
                console.log('objeto datos guardado en localStorage ', JSON.parse(datosPersonalesJSON));
                
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            //Fin de llenado

console.log("Estos son los nuevos datos originales: ",JSON.stringify(datosOriginales));
////////////////////////////////////////////////////////////////
            })
            .catch((error) => {
            // Maneja los errores
            console.error("Error:", error);
            });
            

    //Guardar el nuevo localStorage y limpiar el antiguo.
    //window.location.href = 'profile.html';
    alert('Datos actualizados con éxito');
});
