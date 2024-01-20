const tasksLists = document.querySelectorAll(".tasks__list");

function endEditTask(task) {
  task.classList.remove("task_editing");
  task.removeAttribute("contenteditable");
  window.removeEventListener("keydown", endEditTaskWithKeyDown);
  window.removeEventListener("click", endEditTaskWithClick);
}

function endEditTaskWithKeyDown(event, task) {
  if (event.key === "Enter" || event.key === "Escape") {
    event.preventDefault();
    endEditTask(task);
  }
}

function endEditTaskWithClick(event, task) {
  if (!event.target.closest(".task")) {
    endEditTask(task);
  }
}

function editTask(event) {
  if (!event.target.classList.contains("task__icon")) return;
  const task = event.target.closest(".task");
  task.classList.add("task_editing");
  task.setAttribute("contenteditable", "true");
  window.addEventListener("click", (event) =>
    endEditTaskWithClick(event, task)
  );
  window.addEventListener("keydown", (event) =>
    endEditTaskWithKeyDown(event, task)
  );
}

tasksLists.forEach((el) => el.addEventListener("click", editTask));
