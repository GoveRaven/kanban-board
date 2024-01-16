class HeaderTemplate extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `<header class="header">
    <h1 class="header__title">Канбан-доска</h1>
    ${this.dataset.userInfo !== 'hide' ? 
`      <div class="header__user">
      <img src="img/Avatar.png" alt="Аватар" class="user__avatar" />
      <span class="user__name">user name</span>
      <span class="user__logOutBtn">▼</span>
      <div class="user__logOut user__logOut-close">
        <img src="img/Exit.svg" alt="Иконка выхода" />
        <span class="logOut__title">Выйти</span>
      </div>
    </div>` : ``
    }
  </header>`
  }
}

customElements.define("template-header", HeaderTemplate);
