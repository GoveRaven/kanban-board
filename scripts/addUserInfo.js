const user = document.querySelector(".header__user");
const userName = user.querySelector(".user__name");
const userAvatar = user.querySelector(".user__avatar");

function addInfo(currentUser) {
  userName.innerHTML = currentUser.displayName;
  userAvatar.src = currentUser.photoURL;
}

const logOutBtn = document.querySelector(".user__logOutBtn");
const logOut = document.querySelector(".user__logOut");

function removeLogoutWithClick() {
  logOutBtn.classList.toggle("user__logOutBtn-close");
  if (logOut.classList.toggle("user__logOut-close")) {
    window.removeEventListener("click", removeLogoutWithClick);
  }
}

user.addEventListener("click", () => {
  window.addEventListener("click", removeLogoutWithClick);
});

export { addInfo };
