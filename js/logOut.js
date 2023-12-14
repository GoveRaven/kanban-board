import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { firebaseConfig } from "/js/firebaseConfig.js";

initializeApp(firebaseConfig);
const auth = getAuth();
const redirectedPage = "/index.html"

onAuthStateChanged(auth, () => {
  if (!auth.currentUser) {
    window.location.href = redirectedPage;
  }
});

const logOutBtn = document.querySelector(".user__logOut");

logOutBtn.addEventListener("click", singOutGitHub);

function singOutGitHub() {
  signOut(auth);
  logOutBtn.removeEventListener("click", singOutGitHub);
  window.location.href = redirectedPage;
}

