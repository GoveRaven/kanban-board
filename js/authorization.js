import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { firebaseConfig } from "/js/firebaseConfig.js";

initializeApp(firebaseConfig);
const auth = getAuth();
const redirectedPage = "/login.html";

onAuthStateChanged(auth, () => {
  if (auth.currentUser) {
    window.location.href = redirectedPage;
  }
});

const provider = new GithubAuthProvider();

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = redirectedPage;
      GitHubBtn.removeEventListener("click", signInWithGitHub);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error(errorCode);
    });
}

const GitHubBtn = document.querySelector(".main__signInBtn");
GitHubBtn.addEventListener("click", signInWithGitHub);
