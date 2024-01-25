import { tasksLists } from "./routes.js";

function endEditTask(task, text) {
  task.classList.remove("task_editing");
  text.removeAttribute("contenteditable");
  window.removeEventListener("keydown", endEditTaskWithKeyDown);
  window.removeEventListener("click", endEditTaskWithClick);
}

function endEditTaskWithKeyDown(event, task, text) {
  if (event.key === "Enter" || event.key === "Escape") {
    event.preventDefault();
    endEditTask(task, text);
  }
}

function endEditTaskWithClick(event, task, text) {
  if (!event.target.closest(".task")) {
    endEditTask(task, text);
  }
}

function editTask(event) {
  if (!event.target.classList.contains("task__icon")) return;
  const task = event.target.closest(".task");
  const text = task.querySelector(".task__text");
  task.classList.add("task_editing");
  text.setAttribute("contenteditable", "true");
  text.focus();
  window.addEventListener("click", (event) =>
    endEditTaskWithClick(event, task, text)
  );
  window.addEventListener("keydown", (event) =>
    endEditTaskWithKeyDown(event, task, text)
  );
}

tasksLists.forEach((el) => el.addEventListener("click", editTask));
