import { auth } from "/scripts/firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const hrefOfMainPage = "/index.html";
const hrefOfLoginPage = "/login.html";

onAuthStateChanged(auth, () => {
  if (!auth.currentUser && window.location.href.includes(hrefOfLoginPage)) {
    redirectToMainPage();
  } else if (
    auth.currentUser &&
    window.location.href.includes(hrefOfMainPage)
  ) {
    redirectToLoginPage();
  }
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
