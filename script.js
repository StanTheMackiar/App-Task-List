//DECLARACION DE VARIABLES
let completedTaskCounter = 0; //CONTADOR DE TAREAS COMPLETADAS
let editIsActive = false; // DEFINE SI ESTA ACTIVO EL MODO EDITAR O NO
let template = null;
let taskArray = []; // ARREGLO QUE ALMACENA EL VALOR DE CADA TAREA
let taskEdit = null; // ELEMENTO HTML A EDITAR
let callback = false;


//MANEJO DEL DOM
const taskInput = document.querySelector('#taskInput'); // INPUT DEL USUARIO
const deleteButton = document.querySelector('.deleteButton');
const secondSection = document.querySelector("#secondSection"); // AREA DE LAS TAREAS
const thirdSection = document.querySelector("#thirdSection");
const totalTasks = document.querySelector('#totalTasks'); // MUESTRA TAREAS TOTALES
const pendingTasks = document.querySelector('#pendingTasks'); // MUESTRA TAREAS PENDIENTES
const completedTasks = document.querySelector('#completedTasks'); // MUESTRA TAREAS COMPLETADAS

//BOTON BORRAR TODAS LAS TAREAS
const clearAll = document.createElement("p");
clearAll.setAttribute("id", "clearAll");
clearAll.setAttribute("onclick", "clearAllTasks()");
clearAll.innerHTML = "Borrar todas las tareas";
 
// LOCAL STORAGE

//EVENTOS
//BOTONES
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', addTask);

// LLAMA A LA FUNCION QUE ITERA EL ARREGLO DEL LOCALSTORAGE

refreshTasks()
console.log(taskArray);

//FUNCIONES

//LOOP QUE GENERA LAS NOTAS GUARDADAS (LOCAL STORAGE)

function refreshTasks(template) {
  if (localStorage.length != 0) {
    secondSection.innerHTML = '';
    console.log(`LOCAL STORAGE ACTIVE`);
    taskArray = JSON.parse(localStorage.getItem("Tasks"))
    console.log(`TaskCounter = ${taskArray.length}`);
    taskArray.map(
        (i, counter) => {
            addClearButton();
            console.log(`refreshTasks`);
            counter++
            const newTask = document.createElement('div');
            newTask.setAttribute("class", "tasks");
            newTask.setAttribute("id", `task${counter}`);
            template = `<input type="checkbox" class="checkTask" id="checkTask${counter}" onchange = "addCompletedTasks(${counter})">
            <label class="taskContent" id="editContent${counter}">${i}</label>
            <img src="https://dl.dropbox.com/s/982dg86u2bkaqe2/edit.png?dl=0" alt="Editar" class="editButton" onclick=editTask(${counter})>
            <img src="https://dl.dropbox.com/s/v9h96qxt4o78yzt/delete.png?dl=0" alt="Borrar" class="deleteButton" onclick="removeTask(${counter})">`; 
            newTask.innerHTML = template;
            secondSection.appendChild(newTask);
            
        }
    )
    refreshData()
    console.log(secondSection != 0);
  } 
}


// CREAR NUEVA TAREA
function addTask (event, i) {
 // COMPROBANDO QUE NO SEA UN CAMPO VACIO
if (taskInput.value != 0) {
       //COMPROBANDO TIPO DE EVENTO
    if (event.keyCode === 13 || event.type === "click") {
        addClearButton();
        if (editIsActive != true){
            taskArray.push(taskInput.value)
            console.log(`taskCounter = ${taskArray.length}`);
            i = taskArray.length - 1;
            //CREANDO ELEMENTO DIV
            const newTask = document.createElement('div');
            // COLOCANDO ATRIBUTOS AL DIV
            newTask.setAttribute("class", "tasks");
            newTask.setAttribute("id", `task${taskArray.length}`);
            // PLANTILLA QUE CREA EL NUEVO ELEMENTO
            template = `<input type="checkbox" class="checkTask" id="checkTask${taskArray.length}" onchange = "addCompletedTasks(${taskArray.length})">
            <label class="taskContent" id="editContent${taskArray.length}">${taskArray[i]}</label>
            <img src="https://dl.dropbox.com/s/982dg86u2bkaqe2/edit.png?dl=0" alt="Editar" class="editButton" onclick=editTask(${taskArray.length})>
            <img src="https://dl.dropbox.com/s/v9h96qxt4o78yzt/delete.png?dl=0" alt="Borrar" class="deleteButton" onclick="removeTask(${taskArray.length})">`; 
            // COLOCANDO EL CONTENIDO DE LA PLANTILLA EN EL NUEVO DIV
            newTask.innerHTML = template;

            // COLOCANDO LOS VALORES DE LAS NOTAS EN EL ARREGLO PARA EL LOCAL STORAGE
            
            console.log(taskArray);
            // ALMACENA LOS DATOS EN EL LOCAL STORAGE
            localStorage.setItem("Tasks", JSON.stringify(taskArray));
       
            //ANADIENDO ELEMENTO DIV
            secondSection.appendChild(newTask);
            taskInput.value = null;

            // ACTUALIZAR TOTAL TAREAS
            refreshData();
            // FUNCION EDITAR TAREAS
            } else {
                i = taskEdit - 1;
                console.log(`i ${i}`);
                taskArray[i] = taskInput.value;
                document.querySelector(`#editContent${taskEdit}`).innerText = taskArray[i];
                editIsActive = false;
                taskInput.value = null;
                console.log(taskArray);
                localStorage.setItem("Tasks", JSON.stringify(taskArray));
            }   
        }

        //ERROR AL NO INTRODUCIR NADA
    } else noInputError(event);
};

//ELIMINAR TAREA
function removeTask(id, index) {
    const removeTask = document.getElementById(`task${id}`);
    checkTask = document.querySelector(`#checkTask${id}`);
    secondSection.removeChild(removeTask);

    // ELIMINAR TAREAS LOCAL STORAGE
    index = id - 1; // ID SE RESTA PARA COINCIDIR CON EL INDEX DEL ARRAY
    console.log(`index array ${index}`);
    taskArray.splice(index, 1);
    console.log(taskArray);
    localStorage.setItem("Tasks", JSON.stringify(taskArray));
    console.log(`LOCAL STORAGE DELETED`);
  
    
    //CORREGIR TAREAS COMPLETADAS Y PENDIENTES
    
    if (checkTask.checked === true) {
        completedTaskCounter--;
    }
    //ACTUALIZAR TOTAL TAREAS
    refreshData();
    refreshTasks();
};

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
};

// ACTUALIZAR DATOS
function refreshData() {
    totalTasks.innerHTML = `Total de tareas: ${taskArray.length}`;
    completedTasks.innerHTML = `Tareas completadas: ${completedTaskCounter}`;
    pendingTasks.innerHTML = `Tareas pendientes: ${taskArray.length - completedTaskCounter}`

};

// EDITAR TAREAS
function editTask(id) {
    editIsActive = true;
    taskInput.value = document.querySelector(`#editContent${id}`).textContent;
    taskEdit = id;
    console.log(`tarea que se esta editando ${taskEdit}`);
    console.log(`indice del arreglo que se esta editando ${taskEdit - 1}`);
};

// ERROR AL NO INTRODUCIR INPUT
function noInputError (event) {
     if (event.keyCode === 13 || event.type === "click") {
        console.warn(`Introduzca una tarea`);
        taskInput.placeholder = "Por favor introduzca una tarea";
        setTimeout(() => {
            taskInput.placeholder = "Escribe una tarea";
        }, 2000);
    } 
}

function clearAllTasks (confirmClear) {
    confirmClear = confirm(`Seguro que desea borrar todas sus tareas? esta accion no es resersible`);
    if (confirmClear) {
        taskArray = [];
        localStorage.removeItem("Tasks");
        secondSection.innerHTML = '';
        completedTaskCounter = 0;
        thirdSection.removeChild(clearAll);
        refreshData();
    }

}

function addClearButton() {
    thirdSection.appendChild(clearAll);

}