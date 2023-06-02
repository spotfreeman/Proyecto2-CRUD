// Arreglo principal el cual guardara los datos en localStorage
let listaPendientes = []

// Inputs que guardaremos en localStorage
const id = document.getElementById('id')

const procedencia = document.getElementById('procedencia')
const documento = document.getElementById('documento')
const responsable = document.getElementById('responsable')
const estado = document.getElementById('estado')

// boton de accion que captura los datos del los inputs definidos anteriormente
const boton = document.getElementById('boton')

// definimos objeto TABLA
const tablacontenido = document.getElementById('cuerpoTabla')

// definimos objeto Formulario como id="form"
const form = document.getElementById('form')

const actualizar = document.getElementById('actualizar')

traerLS()
listar()

let editMode = false;
let idEditing = null;

// Definimos la funcion que ejecuta cada boton
boton.addEventListener('click', add)

// funciones de la aplicacion CRUD
function add(e) {
    e.preventDefault()

    // "id" sera el numero utilizado como INDICE
    let id = Date.now()

    // se guardan los valores
    const pendiente = {
        id,
        procedencia: procedencia.value,
        documento: documento.value,
        responsable: responsable.value,
        estado: estado.value

    }
    console.log(id)
    // agregamos un nuevo elemento al Array
    listaPendientes.push(pendiente)
    console.log(listaPendientes)
    // actualizamos el listado
    listar()
    resetForm()
    saveLS()

}

// Trae el contenidoo de la lista.
function traerLS() {

    listaPendientes = JSON.parse(localStorage.getItem('listado'))

    // muestra el arreglo SI tiene contenido.
    if (listaPendientes) {
        listaPendientes = listaPendientes
    }
    // SI NO muestra el arreglo vacio.
    else {
        listaPendientes = []
    }
}

// Guarda un elemento en formato Json dentro del arreglo con la llave "listado"
function saveLS() {
    localStorage.setItem('listado', JSON.stringify(listaPendientes))
}

// Funcion para mostrar cada elemento en la tabla "tablacontenido" => cuerpoTabla 
function listar() {
    tablacontenido.innerHTML = ''

    listaPendientes.forEach(pendiente => {
        tablacontenido.innerHTML += `
    <td>${pendiente.procedencia}</td>
    <td>${pendiente.documento}</td>
    <td>${pendiente.responsable}</td>
    <td>${pendiente.estado}</td>
    <td class="text-center">
    <button class="btn btn-primary align-content-center" onclick="editarFila(${pendiente.id})">Editar</button>
    <button class="btn btn-danger align-content-center" onclick="eliminarFila(${pendiente.id})">Eliminar</button>
    </td>
    `
    })
}


// Funcion para limpiar el Formulario
function resetForm() {
    form.reset()
}

// Funcion para eliminar un item del Arreglo acorde el numero id que es utilizado como indice
function eliminarFila(id) {

    const index = listaPendientes.findIndex((el) => el.id == id)

    listaPendientes.splice(index, 1)

    saveLS()
    traerLS()
    listar()
}

// Funcion para editar un elemento del Arreglo acorde al id 
function editarFila(id) {

    editMode = true;
    idEditing = id;

    // muestra el boton y oculta el boton Actualizar con CSS hide
    boton.classList.add('hide');
    actualizar.classList.remove('hide');

    const index = listaPendientes.findIndex((el) => el.id == id)

    const pendiente = listaPendientes[index]

    procedencia.value = pendiente.procedencia
    documento.value = pendiente.documento
    responsable.value = pendiente.responsable
    estado.value = pendiente.estado
}

// Funcion donde toma los datos del id y los guarda en el mismom id
function edit(e) {
    e.preventDefault()

    const index = listaPendientes.findIndex((el) => el.id == idEditing)

    const pendiente = {
        id: idEditing,
        procedencia: procedencia.value,
        documento: documento.value,
        responsable: responsable.value,
        estado: estado.value
    }

    listaPendientes[index] = pendiente
    boton.classList.remove('hide');
    actualizar.classList.add('hide');
    saveLS()
    traerLS()
    listar()
    resetForm()

    editMode = false;
    idEditing = null;


}
actualizar.addEventListener('click', edit)



// // Futuras funciones

// const botonTiempo = document.getElementById('tiempo');
// botonTiempo.addEventListener('click', modoTiempo);

// let estadoTiempo = false;

// function modoTiempo() {

//     if (dia == true) {
//         dia();
//     } else {
//         noche();
//     }
// }
// function dia() {
//     botonTiempoTest.cla
//     botonTiempoElemento.classList.add('bg-body');
//     botonTiempoElemento.classList.remove('bg-secondary');
//     dia = true;
// }
// function noche() {
//     botonTiempoElemento.classList.remove('bg-body');
//     botonTiempoElemento.classList.add('bg-secondary');
// }