const logOutBtn = document.querySelector(".user__logOut");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAa9OouRtZHvVLcNSgevSrKkkRZB0HNXQ8",
  authDomain: "kanban-board-78a77.firebaseapp.com",
  projectId: "kanban-board-78a77",
  storageBucket: "kanban-board-78a77.appspot.com",
  messagingSenderId: "984975750309",
  appId: "1:984975750309:web:2ac04561609aa95bc7894c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log(auth.config);

logOutBtn.addEventListener("click", singOutGitHub);

function singOutGitHub() {
  signOut(auth);
  window.location.href = "/index.html";
}
