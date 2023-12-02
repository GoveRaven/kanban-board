// Шаблон шапки
class templateOFHeader extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = '<header class="header"><h1 class="header_title">Канбан-доска</h1><div class="header__user"><img src="img/Avatar.png" alt="Аватар" class="user__avatar" /><span class="user__name">user name</span><span class="user__logOutBtn">▼</span><div class="user__logOut user__logOut-close"><img src="img/Exit.svg" alt="Иконка выхода" /><span class="logOut__title">Выйти</span></div></div> </header>'
  }
}

customElements.define("template-header", templateOFHeader);

class templateOFTasks extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = '<div class="task"></div>';
  }
}

customElements.define("template-task", templateOFTasks);
