class LoaderTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="loader">
      <img src="img/bouncing-circles.svg" alt="загрузка...">
    </div>`;
  }
}

customElements.define("template-loader", LoaderTemplate);
