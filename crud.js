// Arreglo donde se guardaran en localStorage
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

function saveLS() {
    localStorage.setItem('listado', JSON.stringify(listaPendientes))
}


function listar() {
    tablacontenido.innerHTML = ''

    listaPendientes.forEach(pendiente => {
        tablacontenido.innerHTML += `
    <td>${pendiente.procedencia}</td>
    <td>${pendiente.documento}</td>
    <td>${pendiente.responsable}</td>
    <td>${pendiente.estado}</td>
    <td>
    <button class="btn btn-primary align-content-center" onclick="editarFila(${pendiente.id})">Editar</button>
    <button class="btn btn-danger align-content-center" onclick="eliminarFila(${pendiente.id})">Eliminar</button>
    </td>
    `
    })
}

function resetForm() {
    form.reset()
}

function eliminarFila(id) {

    const index = listaPendientes.findIndex((el) => el.id == id)

    listaPendientes.splice(index, 1)

    saveLS()
    traerLS()
    listar()
}

function editarFila(id) {

    editMode = true;
    idEditing = id;

    boton.classList.add('hide');
    actualizar.classList.remove('hide');

    const index = listaPendientes.findIndex((el) => el.id == id)

    const pendiente = listaPendientes[index]

    procedencia.value = pendiente.procedencia
    documento.value = pendiente.documento
    responsable.value = pendiente.responsable
    estado.value = pendiente.estado
}

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