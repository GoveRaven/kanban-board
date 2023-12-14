import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const GitHubBtn = document.querySelector(".main__signInBtn");
const redirectedPage = '/login.html'

const firebaseConfig = {
  apiKey: "AIzaSyAa9OouRtZHvVLcNSgevSrKkkRZB0HNXQ8",
  authDomain: "kanban-board-78a77.firebaseapp.com",
  projectId: "kanban-board-78a77",
  storageBucket: "kanban-board-78a77.appspot.com",
  messagingSenderId: "984975750309",
  appId: "1:984975750309:web:2ac04561609aa95bc7894c",
};

initializeApp(firebaseConfig);
const auth = getAuth();

function checkAuthState() {
  onAuthStateChanged(auth, () => {
    if (auth.currentUser) {
      window.location.href = redirectedPage
    }
  });
}

checkAuthState()

const provider = new GithubAuthProvider();

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = redirectedPage
      GitHubBtn.removeEventListener("click", signInWithGitHub);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error(errorCode);
    });
}

GitHubBtn.addEventListener("click", signInWithGitHub);
