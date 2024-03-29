function addEmptyTask(list) {
  const noTask = document.createElement("template-task");
  noTask.setAttribute("data-empty", "true");
  noTask.classList.add("task", "task_no-tasks");
  list.append(noTask);
}

function removeEmptyTask(list) {
  const noTask = list.querySelector(".task_no-tasks");
  noTask?.remove();
}

function toogleEmptyTask(list) {
  const regularTasks = list.querySelector(".task:not([data-empty])");
  if (list.childElementCount === 0) {
    addEmptyTask(list);
  } else if (regularTasks) {
    removeEmptyTask(list);
  }
}

export { toogleEmptyTask };
