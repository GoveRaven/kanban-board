import { tasks } from "./consts.js";

function endEditTask(task, taskText) {
  task.classList.remove("task_editing");
  taskText.removeAttribute("contenteditable");
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

function setSelection(text) {
  if (!text) return
  const range = new Range()
  range.setStart(text, text.length)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
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
  setSelection(taskText.firstChild)
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
