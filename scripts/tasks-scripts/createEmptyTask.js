import { tasksLists} from "./consts.js";

function checkNoTask() {
  tasksLists.forEach((list) => {
    const regularTasks = list.querySelector(".task:not([data-empty])");
    if (!list.contains(regularTasks) && list.childElementCount === 0) {
      addEmptyTask(list);
    } else if (list.contains(regularTasks)) {
      removeEmptyTask(list);
    }
  });
}


function addEmptyTask(list) {
  const noTask = document.createElement("template-task");
  noTask.setAttribute("data-empty", "true");
  noTask.classList.add("task", "task_no-tasks");
  list.append(noTask);
  const text = noTask.querySelector(".task__text");
  text.textContent = list.dataset.emptyNotif;
}

function removeEmptyTask(list) {
  const noTask = list.querySelector(".task_no-tasks");
  if (noTask) noTask.remove();
}

checkNoTask();

export { checkNoTask };
