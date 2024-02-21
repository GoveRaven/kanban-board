import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { redirectToMainPage } from "./routes.js";

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  redirectToMainPage();
}
const logOutBtn = document.querySelector(".user__logOut");
logOutBtn.addEventListener("click", singOutGitHub);
