import { tasks } from "./consts.js";
import { updateUserTasksInDB } from "../realtimeDatabase.js";

function checkSymbolLimit(event, text) {
  if (text.innerText.length >= 100 && event.key !== "Backspace") {
    event.preventDefault();
  }
}

function endEditTask(task, taskText) {
  taskText.innerText = taskText.innerText.trim();
  task.classList.remove("task_editing");
  taskText.removeAttribute("contenteditable");
  updateUserTasksInDB(
    taskText.textContent,
    task.dataset.taskType,
    task.dataset.key
  );
}

function setSelection(event, taskText) {
  const text = taskText.firstChild;
  if (!text || event.target.classList.contains("task__text")) return;
  const range = new Range();
  range.setStart(text, text.length);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function addEditTaskEventsListeners(task, taskText) {
  const eventHadler = (event) => {
    if (event.type === "keydown") {
      checkSymbolLimit(event, taskText);
    }
    const needRemoveListeners =
      !event.target.closest(".task") || ["Enter", "Escape"].includes(event.key);
    if (needRemoveListeners) {
      event.preventDefault();
      endEditTask(task, taskText);
      window.removeEventListener("click", eventHadler);
      window.removeEventListener("keydown", eventHadler);
    }
  };

  window.addEventListener("click", eventHadler);
  window.addEventListener("keydown", eventHadler);
}

function editTask(event, task) {
  const smthIsEditing = document.querySelector(".task_editing");
  if (smthIsEditing) {
    smthIsEditing.classList.remove("task_editing");
  }
  const taskText = task.querySelector(".task__text");
  task.classList.add("task_editing");
  taskText.setAttribute("contenteditable", "true");
  taskText.focus();
  setSelection(event, taskText);
  addEditTaskEventsListeners(task, taskText);
}

tasks.forEach((task) => {
  const pencilIcon = task.querySelector(".task__icon");
  pencilIcon.addEventListener("click", (event) => editTask(event, task));
});

export { editTask };
