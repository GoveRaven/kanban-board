import { drag, drop } from "./dragAndDrop.js";
import { editTask } from "./editTask.js";
import { toogleEmptyTask } from "./createEmptyTask.js";
import { tasksLists } from "./consts.js";
import { disableButton } from "./emptyTrashCan.js";
import { addUserTaskInDB } from "../realtimeDatabase.js";

const taskForm = document.querySelector(".new-task__form");

function createTask(taskTitle, taskType, key) {
  const task = document.createElement("template-task");
  tasksLists.forEach((list) => {
    if (list.dataset.listType === taskType) {
      list.append(task);
      task.classList.add("task");
      task.dataset.taskType = taskType;
      key && (task.dataset.key = key);
      const text = task.querySelector(".task__text");
      text.textContent = taskTitle;
      task.addEventListener("dragstart", () => drag(task));
      task.addEventListener("dragend", () => drop(task));
      const pencilIcon = task.querySelector(".task__icon");
      pencilIcon.addEventListener("click", (event) => editTask(event, task));
      toogleEmptyTask(list);
      disableButton();
      addUserTaskInDB(task, taskTitle, taskType);
    }
  });
}

function createTaskOnSite(event) {
  event.preventDefault();
  const taskTitleInput = taskForm.querySelector(".new-task__name");
  createTask(taskTitleInput.value.trim(), "backlog");
  taskTitleInput.value = "";
}

taskForm.addEventListener("submit", createTaskOnSite);

export { createTask };
