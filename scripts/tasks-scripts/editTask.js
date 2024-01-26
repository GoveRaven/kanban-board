import { tasks } from "./routes.js";

function endEditTask(task, text) {
  task.classList.remove("task_editing");
  text.removeAttribute("contenteditable");
}

function endEditTaskWithKeyDown(event, task, text) {
  if (["Enter", "Escape"].includes(event.key)) {
    event.preventDefault();
    endEditTask(task, text);
    window.removeEventListener("keydown", (event) =>
      endEditTaskWithKeyDown(event, task, text)
    );
  }
}

function endEditTaskWithClick(event, task, text) {
  if (!event.target.closest(".task")) {
    endEditTask(task, text);
    window.removeEventListener("click", (event) =>
      endEditTaskWithClick(event, task, text)
    );
  }
}

function editTask(event, task) {
  const smthIsEditing = document.querySelector(".task_editing");
  if (smthIsEditing) {
    smthIsEditing.classList.remove("task_editing");
  }
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

tasks.forEach((task) =>
  task.addEventListener("click", (event) => editTask(event, task))
);

export { editTask };
