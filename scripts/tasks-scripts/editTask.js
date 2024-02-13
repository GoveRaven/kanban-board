import { tasks } from "./consts.js";
import { updateUserTasksInDB } from "../cloudStorage.js";

function endEditTask(task, taskText) {
  task.classList.remove("task_editing");
  taskText.removeAttribute("contenteditable");
  updateUserTasksInDB(
    taskText.textContent,
    task.dataset.taskType,
    task.dataset.key
  );
}

function endEditTaskWithKeyDown(event, task, taskText) {
  if (["Enter", "Escape"].includes(event.key)) {
    event.preventDefault();
    endEditTask(task, taskText);
    window.removeEventListener("keydown", (event) =>
      endEditTaskWithKeyDown(event, task, taskText)
    );
  }
}

function endEditTaskWithClick(event, task, taskText) {
  if (!event.target.closest(".task")) {
    endEditTask(task, taskText);
    window.removeEventListener("click", (event) =>
      endEditTaskWithClick(event, task, taskText)
    );
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
  window.addEventListener("keydown", (event) =>
    endEditTaskWithKeyDown(event, task, taskText)
  );
}

tasks.forEach((task) =>
  task.addEventListener("click", (event) => editTask(event, task))
);

export { editTask };
