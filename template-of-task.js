class TemplateOFTasks extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = '<div class="task"></div>';
    }
  }
  
  customElements.define("template-task", TemplateOFTasks);
  