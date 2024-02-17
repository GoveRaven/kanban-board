import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { removeLoader } from "./removeLoader.js";
import { redirectToMainPage, redirectToLoginPage } from "./routes.js";

onAuthStateChanged(auth, () => {
  const user = auth.currentUser;
  if (!user && window.location.href.includes("/login.html")) {
    redirectToMainPage();
  } else if (user && window.location.href.includes("/index.html")) {
    redirectToLoginPage();
  } else if (user) {
    import("./addUserInfo.js").then((script) =>
      script.addInfo(user.providerData[0])
    );
    import("./realtimeDatabase.js").then((script) =>
      script.getUserFromDB(user.providerData[0].uid)
    );
  }
  removeLoader();
});
