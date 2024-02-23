import { tasks } from "./consts.js";
import { updateUserTasksInDB } from "../realtimeDatabase.js";

function endEditTask(task, taskText) {
  taskText.innerText = taskText.innerText.trim()
  task.classList.remove("task_editing");
  taskText.removeAttribute("contenteditable");
  updateUserTasksInDB(
    taskText.textContent,
    task.dataset.taskType,
    task.dataset.key
  );
  window.removeEventListener("click", (event) =>
    endEditTaskWithClick(event, task, taskText)
  );
  window.removeEventListener("keydown", (event) => {
    endEditTaskWithKeyDown(event, task, taskText);
    symbolLimit(event, taskText);
  });
}

function endEditTaskWithKeyDown(event, task, taskText) {
  if (["Enter", "Escape"].includes(event.key)) {
    event.preventDefault();
    endEditTask(task, taskText);
  }
}

function endEditTaskWithClick(event, task, taskText) {
  if (!event.target.closest(".task")) {
    endEditTask(task, taskText);
  }
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

function symbolLimit(event, text) {
  if (text.innerText.length >= 100 && event.key !== "Backspace") {
    event.preventDefault();
  }
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
  window.addEventListener("click", (event) =>
    endEditTaskWithClick(event, task, taskText)
  );
  window.addEventListener("keydown", (event) => {
    endEditTaskWithKeyDown(event, task, taskText);
    symbolLimit(event, taskText);
  });
}

tasks.forEach((task) => {
  const pencilIcon = task.querySelector(".task__icon");
  pencilIcon.addEventListener("click", (event) => editTask(event, task));
});

export { editTask };
