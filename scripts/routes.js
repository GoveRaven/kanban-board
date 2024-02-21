const hrefOfMainPage = "./index.html";
const hrefOfLoginPage = "./login.html";

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
};
