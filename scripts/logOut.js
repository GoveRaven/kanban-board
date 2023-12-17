import { signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "/scripts/firebaseConfig.js";
import { redirectToMainPage, onAuthStateChanged } from "/scripts/routes.js";

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  redirectToMainPage();
}
const logOutBtn = document.querySelector(".user__logOut");
logOutBtn.addEventListener("click", singOutGitHub);
