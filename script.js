//DECLARACION DE VARIABLES
let completedTaskCounter = 0; //CONTADOR DE TAREAS COMPLETADAS
let taskCounter = 0; // DEFINE EL NUMERO DE ID DE CADA TAREA
let taskCounterEdit = null; // GUARDA EL NUMERO DE ID DE LA TAREA QUE SE ESTA EDITANDO
let editIsActive = false; // DEFINE SI ESTA ACTIVO EL MODO EDITAR O NO

//MANEJO DEL DOM
const taskInput = document.querySelector('#taskInput'); // INPUT DEL USUARIO
const deleteButton = document.querySelector('.deleteButton');
const secondSection = document.querySelector("#secondSection"); // AREA DE LAS TAREAS
const totalTasks = document.querySelector('#totalTasks'); // MUESTRA TAREAS TOTALES
const pendingTasks = document.querySelector('#pendingTasks'); // MUESTRA TAREAS PENDIENTES
const completedTasks = document.querySelector('#completedTasks'); // MUESTRA TAREAS COMPLETADAS

//EVENTOS
//BOTONES
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', addTask);


//FUNCIONES

// CREAR NUEVA TAREA
function addTask (event) {
 // COMPROBANDO QUE NO SEA UN CAMPO VACIO
if (taskInput.value != 0) {
       //COMPROBANDO TIPO DE EVENTO
    if (event.keyCode === 13 || event.type === "click") {
        if (editIsActive != true){
            taskCounter++;
            console.log(`taskCounter = ${taskCounter}`);
            //CREANDO ELEMENTO DIV
            const newTask = document.createElement('div');
            newTask.setAttribute("class", "tasks");
            newTask.setAttribute("id", `task${taskCounter}`);
            newTask.innerHTML = `
            <input type="checkbox" class="checkTask" id="checkTask${taskCounter}" onchange = "addCompletedTasks(${taskCounter})">
            <label class="taskContent" id="editContent${taskCounter}">${taskInput.value}</label>
            <img src="https://dl.dropbox.com/s/982dg86u2bkaqe2/edit.png?dl=0" alt="Editar" class="editButton" onclick=editTask(${taskCounter})>
            <img src="https://dl.dropbox.com/s/v9h96qxt4o78yzt/delete.png?dl=0" alt="Borrar" class="deleteButton" onclick="removeTask(${taskCounter})">
            `
            //ANADIENDO ELEMENTO DIV
            secondSection.appendChild(newTask);
            taskInput.value = null;

            // ACTUALIZAR TOTAL TAREAS
            refreshData();
            } else {
                document.querySelector(`#editContent${taskCounterEdit}`).innerText = taskInput.value;
                editIsActive = false;
                taskInput.value = null;
            }
        }
    }
};
//ELIMINAR TAREA
function removeTask(id) {
    const removeTask = document.getElementById(`task${id}`);
    const checkTask = document.querySelector(`#checkTask${id}`);
    secondSection.removeChild(removeTask);
    taskCounter--;
    
    //CORREGIR TAREAS COMPLETADAS Y PENDIENTES
    
    if (checkTask.checked === true) {
    completedTaskCounter--;
    }
    //ACTUALIZAR TOTAL TAREAS
    refreshData();
    console.log(`taskCounter = ${taskCounter}`);
}

// TAREAS COMPLETADAS
function addCompletedTasks(id) {
    const checkTask = document.querySelector(`#checkTask${id}`);
    console.log(checkTask.checked);
    if (checkTask.checked === true) {
        completedTaskCounter++;
    } if (checkTask.checked === false) {
        completedTaskCounter--;
    }
    // ACTUALIZAR TAREAS COMPLETADAS
    refreshData();
;

}

// ACTUALIZAR DATOS
function refreshData() {
    totalTasks.innerHTML = `Total de tareas: ${taskCounter}`;
    completedTasks.innerHTML = `Tareas completadas: ${completedTaskCounter}`;
    pendingTasks.innerHTML = `Tareas pendientes: ${taskCounter - completedTaskCounter}`

}

// EDITAR TAREAS
function editTask(id) {
    editIsActive = true;
    taskInput.value = document.querySelector(`#editContent${id}`).textContent;
    taskCounterEdit = id;
    console.log(taskCounterEdit);
}