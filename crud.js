// Arreglo donde se guardaran en localStorage
let listaPendientes = []

// Inputs que guardaremos en localStorage
const procedencia = document.getElementById('procedencia')
const documento = document.getElementById('documento')
const responsable = document.getElementById('responsable')
const estado = document.getElementById('estado')

// boton de accion que captura los datos del los inputs definidos anteriormente
const boton = document.getElementById('boton')


const tablacontenido = document.getElementById('cuerpoTabla')

const form = document.getElementById('form')

const actualizar = document.getElementById('actualizar')


traerLS()
listar()

let editMode = false;
let idEditing = null;

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

    // agregamos un nuevo elemento al Array
    listaPendientes.push(pendiente)

    // actualizamos el listado
    listar()
    //resetForm()


    saveLS()

}

function traerLS() {

    listaPendientes = JSON.parse(localStorage.getItem('listado'))

    if (listaPendientes) {
        listaPendientes = listaPendientes
    } else {
        listaPendientes = []
    }
}

function saveLS() {
    localStorage.setItem('listado', JSON.stringify(pendiente))
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
    <button onclick="editarFila(${pendiente.id})">Editar</button>
    <button onclick="eliminarFila(${pendiente.id})">Eliminar</button>
    </td>
    `
    })

}

// function resetForm() {
//     form.reset()
// }

function eliminarFila(id) {

    const index = tareas.findIndex((el) => el.id == id)

    tareas.splice(index, 1)

    saveLS()
    traerLS()
    listar()

}

function editarFila(id) {

    editMode = true;
    idEditing = id;

    boton.classList.add('hide');
    actualizar.classList.remove('hide');

    const index = tareas.findIndex((el) => el.id == id)

    const tarea = tareas[index]

    title.value = tarea.title
    desc.value = tarea.desc
}

function edit(e) {
    e.preventDefault()

    const index = tareas.findIndex((el) => el.id == idEditing)

    const tarea = {
        id: idEditing,
        title: title.value,
        desc: desc.value,
        completed: false
    }

    tareas[index] = tarea

    saveLS()
    traerLS()
    listar()
    resetForm()

    editMode = false;
    idEditing = null;

    boton.classList.remove('hide');
    actualizar.classList.add('hide');
}

actualizar.addEventListener('click', edit)