import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { removeLoader } from "./removeLoader.js";

const hrefOfMainPage = "./index.html";
const hrefOfLoginPage = "./login.html";

onAuthStateChanged(auth, () => {
  if (!auth.currentUser && window.location.href.includes("/login.html")) {
    redirectToMainPage();
  } else if (auth.currentUser && window.location.href.includes("/index.html")) {
    redirectToLoginPage();
  }
  setTimeout(removeLoader, 1000);
});

function redirectToMainPage() {
  window.location.href = hrefOfMainPage;
}

function redirectToLoginPage() {
  window.location.href = hrefOfLoginPage;
}

export {
  hrefOfMainPage,
  hrefOfLoginPage,
  redirectToMainPage,
  redirectToLoginPage,
  onAuthStateChanged,
};
