//DECLARACION DE VARIABLES
let completedTaskCounter = 0; //CONTADOR DE TAREAS COMPLETADAS
let editIsActive = false; // DEFINE SI ESTA ACTIVO EL MODO EDITAR O NO
let template = null;
let taskArray = []; // ARREGLO QUE ALMACENA EL VALOR DE CADA TAREA
let editIndex = null;

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
 

//EVENTOS
//BOTONES
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', addTask);

// LLAMA A LA FUNCION QUE ITERA EL ARREGLO DEL LOCALSTORAGE

refreshTasks()


//FUNCIONES

//MAP QUE GENERA LAS NOTAS GUARDADAS (LOCAL STORAGE)

function refreshTasks(template) {
  if (localStorage.length != 0) {
    cleanTaskArea()
    console.log(`LOCAL STORAGE ACTIVE`);
    taskArray = JSON.parse(localStorage.getItem("Tasks"))
    completedTaskCounter = localStorage.getItem("Checks")
    console.log(taskArray);
    // MAPEA EL ARREGLO DEL LOCAL STORAGE
    taskArray.map(
        (task, i) => {
            // COLOCA EL BOTON BORRAR TODO
            addClearButton();
            // COLOCA LOS ELEMENTOS
            const newTask = document.createElement('div');
            newTask.setAttribute("class", "tasks");
            newTask.setAttribute("id", `task${i}`);
            if (task.isChecked === true) {
                IsInputChecked = `<input type="checkbox" class="checkTask" id="checkTask${i}" onchange = "addCompletedTasks(${i})" checked>`
            } else {
                IsInputChecked = `<input type="checkbox" class="checkTask" id="checkTask${i}" onchange = "addCompletedTasks(${i})">`
            }
            template = `<label class="taskContent" id="editContent${i}">${task.taskContent}</label>
            <img src="./img/edit.png" alt="Editar" class="editButton" onclick=editTask(${i})>
            <img src="./img/delete.png" alt="Borrar" class="deleteButton" onclick="removeTask(${i})">`; 
            newTask.innerHTML = IsInputChecked + template;
            secondSection.appendChild(newTask);
            
        }
    )
    // ACTUALIZANDO ESTADISTICAS
    refreshData()
  } 
}


// CREAR NUEVA TAREA
function addTask (event, id) {
 // COMPROBANDO QUE NO SEA UN CAMPO VACIO
if (taskInput.value != 0) {
       //COMPROBANDO TIPO DE EVENTO
    if (event.keyCode === 13 || event.type === "click") {
        if (editIsActive != true) {
            // COLOCANDO ELEMENTOS EN EL ARREGLO PRINCIPAL
            taskArray.push({
                id: null,
                taskContent: taskInput.value,
                isChecked: false
            })
            // ORGANIZANDO LOS ID DE LOS ELEMENTOS
            putIdToTasks()

            // SELECCIONANDO ULTIMO OBJETO DEL ARRAY
            console.log(taskArray);
            id = taskArray[taskArray.length - 1].id;
            //CREANDO ELEMENTO DIV
            const newTask = document.createElement('div');
            // COLOCANDO ATRIBUTOS AL DIV
            newTask.setAttribute("class", "tasks");
            newTask.setAttribute("id", `task${taskArray[id].id}`);
            // PLANTILLA QUE CREA EL NUEVO ELEMENTO
            template = `<input type="checkbox" class="checkTask" id="checkTask${taskArray[id].id}" onchange = "addCompletedTasks(${taskArray[id].id})">
            <label class="taskContent" id="editContent${taskArray[id].id}">${taskArray[id].taskContent}</label>
            <img src="./img/edit.png" alt="Editar" class="editButton" onclick=editTask(${taskArray[id].id})>
            <img src="./img/delete.png" alt="Borrar" class="deleteButton" onclick="removeTask(${taskArray[id].id})">`; 
            // COLOCANDO EL CONTENIDO DE LA PLANTILLA EN EL NUEVO DIV
            newTask.innerHTML = template;
            //ANADIENDO ELEMENTO DIV
            secondSection.appendChild(newTask);
            taskInput.value = null;
            
            //ALMACENA LOS DATOS EN LOCAL STORAGE
            addToLocalStorage();
            // ACTUALIZAR TOTAL TAREAS
            refreshData();
            // COLOCANDO BOTON DE BORRAR TODAS LAS TAREAS
            addClearButton();
            
            } else {
            // AÑADIR TAREA EN EL MODO EDITAR
              addTaskAtEditMode(editIndex);
            }   
        }

        //ERROR AL NO INTRODUCIR NADA
    } else noInputError(event);
};
// EDITAR TAREAS
function editTask(i) {
    editIsActive = true;
    taskInput.value = document.querySelector(`#editContent${i}`).textContent;
    editIndex = i;
};

 // AÑADIR TAREA EN EL MODO EDITAR
 function addTaskAtEditMode(editIndex) {
    taskArray[editIndex].taskContent = taskInput.value;
    document.querySelector(`#editContent${editIndex}`).innerText = taskArray[editIndex].taskContent;
    editIsActive = false;
    taskInput.value = null;
    console.log(taskArray);
    addToLocalStorage();
}   

//ELIMINAR TAREA
function removeTask(i) {
    // OBTENIENDO ELEMENTOS A BORRAR
    const removeTask = document.getElementById(`task${i}`);
    const checkTask = document.querySelector(`#checkTask${i}`);
    const confirmRemoveTask = confirm(`¿Desea borrar la tarea #${i + 1}?`);
    // BORRANDO ELEMENTOS SI SE CONFIRMA EL AVISO
    if (confirmRemoveTask) {
    // ELIMINA EL ELEMENTO
    secondSection.removeChild(removeTask);

    // ELIMINAR TAREAS DEL LOCAL STORAGE
    taskArray.splice(i, 1); //ELIMINANDO EL OBJETO DEL INDICE DEL ARRAY
    addToLocalStorage();
    

    //ACTUALIZAR TAREAS COMPLETADAS 
    if (checkTask.checked === true) { refreshCompleteTasksCounter(i) }
    // REORGANIZANDO LOS ID DE LAS NOTAS
    putIdToTasks();

    // SI EL ARREGLO ES 0 BORRAR EL BOTON DE BORRAR TAREAS
    if (taskArray.length === 0) {
        deleteClearButton();
    }
    //ACTUALIZAR TOTAL TAREAS Y LOS ELEMENTOS
    refreshData();
    refreshTasks();
}
};


// ACTUALIZAR TAREAS COMPLETADAS AL BORRAR ELEMENTO
    function refreshCompleteTasksCounter(i) {
        completedTaskCounter--;
        addToLocalStorage();
    }

// CHECK DE LAS TAREAS COMPLETADAS
function addCompletedTasks(i) {
    const checkTask = document.querySelector(`#checkTask${i}`);
    console.log(`CHECKED? ${checkTask.checked}`);
    // SI ESTA CHECKEADO
    if (checkTask.checked === true) {
        completedTaskCounter++;
        taskArray[i].isChecked = true;
        console.log(taskArray);
        addToLocalStorage()
    // SI ESTA DESTILDEADO
    } else {
        completedTaskCounter--;  
        taskArray[i].isChecked = false;
        console.log(taskArray);
        addToLocalStorage()
    }
    // ACTUALIZAR ESTADISTICAS
    refreshData();
    console.log(completedTaskCounter);
};

// ACTUALIZAR DATOS
function refreshData() {
    completedTasks.innerHTML = `Tareas completadas: ${completedTaskCounter}`;
    pendingTasks.innerHTML = `Tareas pendientes: ${taskArray.length - completedTaskCounter}`;
    totalTasks.innerHTML = `Total de tareas: ${taskArray.length}`;

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

// BOTON BORRAR TODAS LAS TAREAS
function clearAllTasks (confirmClear) {
    confirmClear = confirm( `¿Seguro que desea borrar todas sus tareas? esta acción no es reversible.`);
    if (confirmClear) {
        taskArray = [];
        removeLocalStorage();
        secondSection.innerHTML = '';
        completedTaskCounter = 0;
        deleteClearButton();
        refreshData();
    }

}
// AÑADIR BOTON DE BORRAR TODO
function addClearButton() {
    thirdSection.appendChild(clearAll);

}
// ELIMINAR BOTON BORRAR TODO
function deleteClearButton() {
    thirdSection.removeChild(clearAll);
}

 //LIMPIA EL AREA DE TAREAS (SEGUNDA SECCION)
function cleanTaskArea() {
    secondSection.innerHTML = ''
}

    //COLOCAR DATOS EN LOCAL STORAGE
function addToLocalStorage () {
    localStorage.setItem("Checks", completedTaskCounter);
    localStorage.setItem("Tasks", JSON.stringify(taskArray));
    console.log(`LOCAL STORAGE SAVED`);
}
function removeLocalStorage() {
    localStorage.removeItem("Tasks");
    localStorage.removeItem("Checks");
    console.log(`LOCAL STORAGE REMOVED`);
}

//COLOCANDO O REORGANIZANDO LOS ID DE LAS NOTAS
function putIdToTasks() {
    taskArray.map((task, i) => {
        task.id = i;
    })
}

