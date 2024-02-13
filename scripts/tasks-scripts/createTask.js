import { drag, drop } from "./dragAndDrop.js";
import { editTask } from "./editTask.js";
import { toogleEmptyTask } from "./createEmptyTask.js";
import { createUserTasksInDB } from "../cloudStorage.js";
import { tasksLists } from "./consts.js";
import { disableButton } from "./emptyTrashCan.js";

const taskForm = document.querySelector(".new-task__form");
const list = document.querySelector(".tasks__list_backlog");

function createTask(taskTitle, taskType, key) {
  const task = document.createElement("template-task");
  tasksLists.forEach((list) => {
    if (list.dataset.listType === taskType) {
      list.append(task);
      task.classList.add("task");
      task.dataset.taskType = taskType;
      task.dataset.key = key
      const text = task.querySelector(".task__text");
      text.textContent = taskTitle;
      task.addEventListener("dragstart", () => drag(task));
      task.addEventListener("dragend", () => drop(task));
      task.addEventListener("click", (event) => editTask(event, task));
      toogleEmptyTask(list);
      disableButton();
      createUserTasksInDB(task, taskTitle, taskType);
    }
  });
}

function creatTaskOnSite(event) {
  event.preventDefault();
  const taskTitleInput = taskForm.querySelector(".new-task__name");
  createTask(taskTitleInput.value, "backlog");
  taskTitleInput.value = "";
}

taskForm.addEventListener("submit", creatTaskOnSite);

export { createTask };
