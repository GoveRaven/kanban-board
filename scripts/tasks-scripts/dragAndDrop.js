import { tasksLists, tasks } from "./routes.js";

tasksLists.forEach((list) => {
  list.addEventListener("dragover", dragover);
});

function drag(task) {
  task.classList.add("task_dragndrop");
}

function drop(task) {
  task.classList.remove("task_dragndrop");
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
  const nextElement = getNextElement(event.clientY, currentTask)
  if (currentTask.classList.contains("task")) {
    list.insertBefore(selectedTask, nextElement);
    selectedTask.innerHTML = text;
  }
}

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
