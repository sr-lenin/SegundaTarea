
const monthNames = ["Acuario", "Piscis", "Aries", "Tauro", "Géminis","Cáncer",
"Leo", "Virgo", "Libra", "Escorpio", "Sagitario","Capricornio"];

let listaEmpleados = [];

const objetoEmpleado = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    cedula: "",
    cumpleaños: ""
}

let editando = false;
const formulario = document.getElementById("formulario");
const nombreInput =document.getElementById("nombre");
const apellidoInput =document.getElementById("apellido");
const telefonoInput =document.getElementById("telefono");
const emailInput =document.getElementById("email");
const cedulaInput =document.getElementById("cedula");
const cumpleañosInput =document.getElementById("cumpleaños");





formulario.addEventListener('submit', validarFormulario);
function validarFormulario(e) {
    e.preventDefault();

    if(nombre.value === "" || apellido.value === "" 
    || telefono.value === "" || email.value === "" ||
     cedula.value === "" || cumpleaños.value === ""){
        alert("yes");
        return;
    }

    if(editando){
        editarEmpleado();
        editando =false
    }else{
        objetoEmpleado.id = Date.now();
        objetoEmpleado.nombre = nombreInput.value;
        objetoEmpleado.apellido = apellidoInput.value;
        objetoEmpleado.telefono = telefonoInput.value;
        objetoEmpleado.email = emailInput.value;
        objetoEmpleado.cedula = cedulaInput.value;
        objetoEmpleado.cumpleaños = cumpleañosInput.value;


        agregarEmpleados();
    }
    
}

function guardarEnLocalStorage(empleados)
{
    localStorage.setItem('empleados', JSON.stringify(empleados));
}

function obtenerLocalStorage()
{
    const localStorageEmpleados = JSON.parse(localStorage.getItem('empleados'));
    listaEmpleados = localStorageEmpleados || [];
    mostrarEmpleados();
}


function agregarEmpleados(){
    listaEmpleados.push({...objetoEmpleado});

    guardarEnLocalStorage(listaEmpleados);
    obtenerLocalStorage();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objetoEmpleado.id = "";
    objetoEmpleado.nombre = "";
    objetoEmpleado.apellido = "";
    objetoEmpleado.telefono = "";
    objetoEmpleado.email = "";
    objetoEmpleado.cedula = "";
    objetoEmpleado.cumpleaños = "";


}

function zodialSign(month){
    const d = new Date(month);
    return monthNames[d.getMonth()];
}

function mostrarEmpleados(){

    limpiarHtml();

    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach( empleado => {
        const {id, nombre, apellido, telefono, email, cedula, cumpleaños} = empleado;

        let signo = zodialSign(cumpleaños);
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${telefono} - 
                               ${email} - ${cedula} - ${cumpleaños} - Tu signo sodiacal es: ${signo}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado)
        editarBoton.textContent = "Editar";
        editarBoton.classList.add("btn", "btn-editar");
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick =() => eliminarEmpleado(id)
        eliminarBoton.textContent = "Eliminar"
        eliminarBoton.classList.add("btn", "btn-eliminar");
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr')

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);

    })
}

function cargarEmpleado(empleado){

    const {id, nombre, apellido, telefono, 
        email, cedula, cumpleaños} = empleado;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    emailInput.value = email;
    cedulaInput.value = cedula;
    cumpleañosInput.value = cumpleaños;

    objetoEmpleado.id = id;

    formulario.querySelector('button[type="submit"]')
    .textContent = 'Actualizar';
    editando = true;
}

function editarEmpleado(){

    objetoEmpleado.nombre = nombreInput.value;
    objetoEmpleado.apellido = apellidoInput.value;
    objetoEmpleado.telefono = telefonoInput.value;
    objetoEmpleado.email = emailInput.value;
    objetoEmpleado.cedula = cedulaInput.value;
    objetoEmpleado.cumpleaños = cumpleañosInput.value;


    listaEmpleados.map(empleado => {

        if(empleado.id === objetoEmpleado.id){
            empleado.id = objetoEmpleado.id;
            empleado.nombre = objetoEmpleado.nombre;
            empleado.apellido = objetoEmpleado.apellido;
            empleado.telefono = objetoEmpleado.telefono;
            empleado.email = objetoEmpleado.email;
            empleado.cedula = objetoEmpleado.cedula;
            empleado.cumpleaños = objetoEmpleado.cumpleaños;

        }
    })

    guardarEnLocalStorage(listaEmpleados);
    obtenerLocalStorage();
    formulario.reset();
    formulario.querySelector('button[type="submit"')
    .textContent = 'Agregar';

    editando = false
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    guardarEnLocalStorage(listaEmpleados);
    obtenerLocalStorage();
    limpiarHtml();
}

function limpiarHtml() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

obtenerLocalStorage();