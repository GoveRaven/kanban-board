const taskName = document.querySelector(".new-task__name");
const addTaskForm = document.querySelector(".new-task__form");
const list = document.querySelector(".tasks__list_backlog");

console.log(addTaskForm);

function createTask(event) {
  event.preventDefault();
  const task = document.createElement("template-task");
  list.append(task);
  const text = task.querySelector(".task__text");
  task.classList.add("task", "task_backlog");
  text.textContent = taskName.value;
  taskName.value = "";
}

addTaskForm.addEventListener("submit", (event) => createTask(event));
