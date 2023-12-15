import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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

onAuthStateChanged(auth, () => {
  console.log(Boolean(auth.currentUser));
  console.log(window.location.href.includes("/index.html"));
  if (auth.currentUser && window.location.href.includes("/index.html")) {
    window.location.href = "/login.html";
  } else if (
    !auth.currentUser &&
    window.location.href.includes("/login.html")
  ) {
    window.location.href = "/index.html";
  }
});

export { firebaseConfig, auth, onAuthStateChanged };
