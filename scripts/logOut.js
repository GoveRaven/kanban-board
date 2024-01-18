import { signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { redirectToMainPage, onAuthStateChanged } from "./routes.js";

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  redirectToMainPage();
}
const logOutBtn = document.querySelector(".user__logOut");
logOutBtn.addEventListener("click", singOutGitHub);
