const user = document.querySelector(".header__user");
const userName = user.querySelector(".user__name");
const userAvatar = user.querySelector(".user__avatar");

function addInfo(currentUser) {
  userName.innerHTML = currentUser.displayName;
  userAvatar.src = currentUser.photoURL;
}

const logOutBtn = document.querySelector(".user__logOutBtn");
const logOut = document.querySelector(".user__logOut");

user.addEventListener("click", () => {
  logOutBtn.classList.toggle("user__logOutBtn-open");
  window.addEventListener("click", someFunc);
});

function someFunc() {
  logOut.classList.toggle("user__logOut-close");
  if (logOut.classList.contains("user__logOut-close")) {
    window.removeEventListener("click", someFunc);
  }
}

export { addInfo };
