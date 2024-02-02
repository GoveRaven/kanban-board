import { drag, drop } from "./dragAndDrop.js";
import { editTask } from "./editTask.js";
import { checkEmptyTask } from "./createEmptyTask.js";

const taskForm = document.querySelector(".new-task__form");
const taskName = taskForm.querySelector(".new-task__name");
const list = document.querySelector(".tasks__list_backlog");

function createTask(event) {
  event.preventDefault();
  const task = document.createElement("template-task");
  list.append(task);
  task.classList.add("task");
  const text = task.querySelector(".task__text");
  text.textContent = taskName.value;
  task.addEventListener("dragstart", () => drag(task));
  task.addEventListener("dragend", () => drop(task));
  task.addEventListener("click", (event) => editTask(event, task));
  taskName.value = "";
  checkEmptyTask(list);
}

taskForm.addEventListener("submit", createTask);
