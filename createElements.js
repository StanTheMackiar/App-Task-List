
//EXPORTANDO FUNCIONES
export {createElements, appendDivToSecondSection, appendElementsToDivFather}

//IMPORTANDO FUNCIONES
import {removeTask, editTask, addCompletedTasks} from "./main.js"

// DECLARACION DE VARIABLES
// PADRE
let newTask = null;
// HIJOS
let inputCheckBox = null;
let labelTaskContent = null;
let IMGEdit = null;
let IMGDelete = null



// COLOCANDO LAS PROPIEDADES DE LOS ELEMENTOS

// CREANDO ELEMENTO DIV PADRE
function createDivFather (task, i)  { 
    newTask = document.createElement('div');
    newTask.setAttribute("class", "tasks");
    newTask.setAttribute("id", `task${i}`);
}
 // CREANDO ELEMENTOS HIJO
function createInputCheck(task, i) {
    inputCheckBox = document.createElement('input');
    inputCheckBox.type = "checkbox";
    inputCheckBox.classList.add("checkTask");
    if (task.isChecked === true) {
        inputCheckBox.setAttribute('checked', '');
    }
    inputCheckBox.setAttribute("id", `checkTask${i}`);
    inputCheckBox.addEventListener('click', (()=> addCompletedTasks(i)))
}
function createLabel(task, i) {
    labelTaskContent = document.createElement('label');
    labelTaskContent.classList.add("taskContent");
    if (task.isChecked === true) {
        labelTaskContent.classList.toggle("isChecked");
    }
    labelTaskContent.setAttribute("id", `editContent${i}`);
    labelTaskContent.innerHTML = task.taskContent;
}
function createIMGEdit(task, i) {
    IMGEdit = document.createElement('img');
    IMGEdit.src = "./img/edit.png";
    IMGEdit.alt = "Editar";
    IMGEdit.classList.add("editButton");
    IMGEdit.addEventListener("click", (() => editTask(i)));
}
function createIMGDelete(task, i) {
    IMGDelete = document.createElement('img');
    IMGDelete.src = "./img/delete.png";
    IMGDelete.alt = "Borrar";
    IMGDelete.classList.add("deleteButton");
    IMGDelete.addEventListener('click', (()=> removeTask(i)))
}


//FUNCIONES QUE ORGANIZAN Y COLOCAN LOS NODOS DONDE VAN

// LLAMA A LAS FUNCIONES QUE CREAN LOS ELEMENTOS
function createElements(task, i) {
    createDivFather(task, i);
    createInputCheck(task, i);
    createLabel(task, i);
    createIMGEdit(task, i);
    createIMGDelete(task, i)
}
// COLOCA LAS TAREAS (HIJOS) DENTRO DEL CONTENEDOR DIV (PADRE)
function appendElementsToDivFather() {
    newTask.appendChild(inputCheckBox)
    newTask.appendChild(labelTaskContent)
    newTask.appendChild(IMGEdit)
    newTask.appendChild(IMGDelete)
}
// COLOCA EL CONTENEDOR DE LAS NOTAS (DIV) EN LA SEGUNDA SECCION 
function appendDivToSecondSection() {
    secondSection.appendChild(newTask);
}