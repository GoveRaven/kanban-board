const GitHubBtn = document.querySelector(".main__signInBtn");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa9OouRtZHvVLcNSgevSrKkkRZB0HNXQ8",
  authDomain: "kanban-board-78a77.firebaseapp.com",
  projectId: "kanban-board-78a77",
  storageBucket: "kanban-board-78a77.appspot.com",
  messagingSenderId: "984975750309",
  appId: "1:984975750309:web:2ac04561609aa95bc7894c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

checkState()

//Проверка авторизации пользователя
function checkState() {
  onAuthStateChanged(auth, () => {
    if (auth.currentUser) {
      window.location.href = '/login.html'

    }
  });
}

// Вход в систему с помощью всплывающего окна
const provider = new GithubAuthProvider();

GitHubBtn.addEventListener("click", signInWithGitHub);

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = '/login.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
}
