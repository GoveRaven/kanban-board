import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { removeLoader } from "./removeLoader.js";
import { getUserFromDB } from "./cloudStorage.js";
// import { addInfo } from "./addUserInfo.js";

const hrefOfMainPage = "./index.html";
const hrefOfLoginPage = "./login.html";

onAuthStateChanged(auth, () => {
  const user = auth.currentUser
  if (!user && window.location.href.includes("/login.html")) {
    redirectToMainPage();
  } else if (user && window.location.href.includes("/index.html")) {
    redirectToLoginPage();
  } else if (user) {
    import("./addUserInfo.js").then((script) =>
      script.addInfo(user.providerData[0])
    );
    getUserFromDB(user.providerData[0].uid)
  }
  removeLoader();
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
