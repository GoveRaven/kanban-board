import {drag, drop} from "./dragAndDrop.js"

const taskName = document.querySelector(".new-task__name");
const addTaskForm = document.querySelector(".new-task__form");
const list = document.querySelector(".tasks__list_backlog");

function createTask(event) {
  event.preventDefault();
  const task = document.createElement("template-task");
  list.append(task);
  const text = task.querySelector(".task__text");
  task.classList.add("task");
  text.textContent = taskName.value;
  task.draggable="true"
  task.addEventListener("dragstart", () => drag(task));
  task.addEventListener("dragend", () => drop(task));
  taskName.value = "";
}

addTaskForm.addEventListener("submit", (event) => createTask(event));
