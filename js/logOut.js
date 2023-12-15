import { signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "/js/firebaseConfig.js";

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  window.location.href = "/index.html";
}
const logOutBtn = document.querySelector(".user__logOut");
logOutBtn.addEventListener("click", singOutGitHub);
