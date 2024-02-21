import {
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { redirectToLoginPage } from "./routes.js";
import { removeLoader } from "./removeLoader.js";

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

removeLoader()

const GitHubBtn = document.querySelector(".main__signInBtn");
GitHubBtn.addEventListener("click", signInWithGitHub);
