import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {firebaseConfig} from '/js/firebaseConfig.js'

initializeApp(firebaseConfig);
const auth = getAuth();
const logOutBtn = document.querySelector(".user__logOut");

logOutBtn.addEventListener("click", singOutGitHub);

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  window.location.href = "/index.html";
}
