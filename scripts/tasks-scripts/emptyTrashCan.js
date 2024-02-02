import { checkEmptyTask } from "./createEmptyTask.js";

const trashCanBtn = document.querySelector(".trash-can__btn");
const trashCanList = document.querySelector(".tasks__list_trash-can");

function emptyTrashCan() {
  trashCanList.innerHTML = "";
  checkEmptyTask();
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

disableButton();

export { disableButton };
