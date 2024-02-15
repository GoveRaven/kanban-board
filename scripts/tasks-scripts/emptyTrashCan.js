import { toogleEmptyTask } from "./createEmptyTask.js";
import { removeTaskFromDB } from "../realtimeDatabase.js";

const trashCanBtn = document.querySelector(".trash-can__btn");
const trashCanList = document.querySelector(".tasks__list_trash-can");

function emptyTrashCan() {
  const trashTasks = trashCanList.querySelectorAll(".task");
  trashTasks.forEach((task) => removeTaskFromDB(task.dataset.key));
  trashCanList.innerHTML = "";
  toogleEmptyTask(trashCanList);
  disableButton();
}

trashCanBtn.addEventListener("click", emptyTrashCan);

function disableButton() {
  const regularTasks = trashCanList.querySelector(".task:not([data-empty])");
  if (regularTasks) {
    trashCanBtn.removeAttribute("disabled");
  } else {
    trashCanBtn.setAttribute("disabled", "true");
  }
}

export { disableButton };
