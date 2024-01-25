class TasksTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <span class="task__text" tabindex="0"></span>
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="task__icon"
    >
      <path
        d="M3.156 10.563L1 16.0176L6.74957 14.8753M3.156 10.563L6.74957 14.8753M3.156 10.563L11.7806 1.93845M6.74957 14.8753L16.0929 6.25074M11.7806 1.93845L16.0929 6.25074M11.7806 1.93845C12.1448 1.57425 14.6556 0.205922 16.0929 1.64329C17.5301 3.08065 17.0511 5.29246 16.0929 6.25074"
      />
    </svg>
  `;
  }
}

customElements.define("template-task", TasksTemplate);
