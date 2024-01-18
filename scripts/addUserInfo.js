import { auth } from "/scripts/firebaseConfig.js";

const user = document.querySelector(".header__user");
const userName = user.querySelector(".user__name");
const userAvatar = user.querySelector(".user__avatar");

function addInfo(currentUser) {
  userName.innerHTML = currentUser.displayName;
  userAvatar.src = currentUser.photoURL;
}

setTimeout(() => addInfo(auth.currentUser.providerData[0]), 1000);

const logOutBtn = document.querySelector(".user__logOutBtn");
const logOut = document.querySelector(".user__logOut");

user.addEventListener("click", () => {
  logOut.classList.toggle("user__logOut-close");
  logOutBtn.classList.toggle("user__logOutBtn-open");
});
