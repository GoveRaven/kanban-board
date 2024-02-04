import { tasksLists, tasks } from "./consts.js";
import { toogleEmptyTask } from "./createEmptyTask.js";
import { disableButton } from "./emptyTrashCan.js";

function drag(task) {
  task.classList.add("task_dragndrop");
  setTimeout(() => task.classList.add("task_dragging"), 0);
}

function drop(task) {
  task.classList.remove("task_dragndrop");
  task.classList.remove("task_dragging");
  disableButton();
}

tasks.forEach((task) => {
  task.addEventListener("dragstart", () => drag(task));
  task.addEventListener("dragend", () => drop(task));
});

function dragover(event) {
  const list = event.target.closest(".tasks__list");
  const currentTask = event.target;
  const selectedTask = document.querySelector(".task_dragndrop");
  const text = selectedTask.innerHTML;
  const nextElement = getNextElement(event.clientY, currentTask);
  if (currentTask.classList.contains("task")) {
    list.insertBefore(selectedTask, nextElement);
    selectedTask.innerHTML = text;
  }
  tasksLists.forEach((list) => toogleEmptyTask(list));
}

tasksLists.forEach((list) => {
  list.addEventListener("dragover", dragover);
});

function getNextElement(cursorPosition, currentElement) {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter =
    currentElementCoord.y + currentElementCoord.height / 2;
  const nextElement =
    cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;

  return nextElement;
}

export { drag, drop };
