import {
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "/scripts/firebaseConfig.js";
import { onAuthStateChanged, redirectToLoginPage } from "/scripts/routes.js";

const provider = new GithubAuthProvider();

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then(() => {
      redirectToLoginPage();
      GitHubBtn.removeEventListener("click", signInWithGitHub);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error(errorCode);
    });
}

const GitHubBtn = document.querySelector(".main__signInBtn");
GitHubBtn.addEventListener("click", signInWithGitHub);
