import { tasksLists } from "./routes.js";
const tasks = document.querySelectorAll(".task");

tasksLists.forEach((list) => {
  list.addEventListener("dragover", (event) => dragover(event));
});

tasks.forEach((task) => {
  task.addEventListener("dragstart", () => drag(task));
  task.addEventListener("dragend", () => drop(task));
});

function drag(task) {
  task.classList.add("task_dragndrop");
}

function drop(task) {
  task.classList.remove("task_dragndrop");
}

function dragover(event) {
  const list = event.target.closest(".tasks__list");
  const selectedTask = document.querySelector(".task_dragndrop");
  const currentTask = event.target;
  const text = selectedTask.innerHTML;
  const nextElement = getNextElem(event.clientY, currentTask)
  if (currentTask.classList.contains("task")) {
    list.insertBefore(selectedTask, nextElement);
    selectedTask.innerHTML = text;
  }
}

function getNextElem(cursorPosition, currentElement) {
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
