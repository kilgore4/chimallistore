const baseUrl = 'https://chimalliapi.azurewebsites.net/api/Users/login';

const validarLogin = document.getElementById("submit");
const formulario = document.getElementById("login-form");
//Variables para localStorage
let arreglo;// = data.$values;
let arregloJSON;//= JSON.stringify(arreglo);

validarLogin.addEventListener("click", function(e) {
    e.preventDefault;
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //console.log(email,password);
    if(email&&password)
    {
        const data={
            email:email,
            password:password
        }
        const tipoRequest = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        };
        fetch(baseUrl, tipoRequest)
        .then(
            response => {
                if(!response.ok){ console.log("No hay datos")}
                return response.json();
            }
        ). then(
            data => {
                localStorage.clear();
                //console.log(data);
                const user = {
                    userId:data.userId,
                    alias:data.alias,
                    email:data.email,
                    userId:data.userId,
                    personId:data.personId
                };
                //arreglo = data;
                userJSON = JSON.stringify(user);
                localStorage.setItem('usuario', userJSON);
                //console.log('objeto usuario guardado en localStorage ', JSON.parse(userJSON));
                
                //Direcciones en JSON
                const address1 = {
                    addresses:data.addresses.$values
                }
                addressJSON = JSON.stringify(address1);
                localStorage.setItem('direccion',addressJSON);
                //console.log('objeto usuario guardado en localStorage ', JSON.parse(addressJSON));

                //Datos personales en JSON
                const datosPersonales = {
                    person:data.person
                }
                datosPersonalesJSON = JSON.stringify(datosPersonales);
                localStorage.setItem('datosPersonales',datosPersonalesJSON);
                //console.log('objeto datos guardado en localStorage ', JSON.parse(datosPersonalesJSON));

                // Convert the array to a JSON string 
                //const myArrayJSON = JSON.stringify(arreglo); 
                // Store the JSON string in sessionStorage 
               // sessionStorage.setItem('miArreglo', myArrayJSON);

                //sessionStorage.setItem('SessionDataToken', arregloJSON);
                //console.log(JSON.stringify(arreglo));

                window.location.href = '../index.html';
            }
        ).catch(error => {
            console.log("Error con login");
        });
    }else{alert("Los Campos no deben estar vacios"); }//console.log("aqui");}
});

//export { arregloJSON };