import { checkNoTask } from "./createEmptyTask.js";
const trashCanBtn = document.querySelector(".trash-can__btn");
const trashCanList = document.querySelector(".tasks__list_trash-can");

function emptyTrashCan() {
  trashCanList.innerHTML = "";
  checkNoTask();
  disabledBtn()
}

trashCanBtn.addEventListener("click", emptyTrashCan);

function disabledBtn() {
  const regularTasks = trashCanList.querySelector(".task:not([data-empty])");
  console.log(trashCanList.contains(regularTasks))
  if (trashCanList.contains(regularTasks)) {
    trashCanBtn.removeAttribute('disabled')
  } else {
    trashCanBtn.setAttribute('disabled', 'true')
  }
}

disabledBtn();

export { disabledBtn };
