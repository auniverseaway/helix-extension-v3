class ProjectItem extends HTMLElement {
  constructor() {
    super();
    this.view = document.createElement('p');
    this.edit = document.createElement('form');
    this.content = this.view;
    this.shadow = this.attachShadow({ mode: 'closed' });
  }

  static get observedAttributes() {
    return ['data-name', 'data-repo-url', 'edit'];
  }

  get displayContent() {
    return document.createElement('p');
  }

  update(property) {
    this.content = property === 'edit' ? this.edit : this.view;
    this.content.textContent = `${this.dataset.name} : ${this.dataset.repoUrl}`;
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
    this.update(property);
  }

  connectedCallback() {
    this.shadow.append(this.content);
  }
}

class ProjectList extends HTMLElement {
  constructor() {
    super();
  }

  get projectForm() {
    const form = document.createElement('form');
    return form;
  }

  get projectList() {
    return (async () => {
      try {
        const { projects } = await browser.storage.sync.get('projects');
        return projects.map((result, idx) => {
          const item = document.createElement('project-item');
          setTimeout(() => {
            item.dataset.index = idx;
            item.dataset.name = result.name;
            item.dataset.repoUrl = result.repoUrl;
          }, 1000);
          return item;
        });
      } catch(e) {
        return null;
      }
    })();
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    const projectList = await this.projectList;
    shadow.append(this.projectForm, ...projectList);
  }
}
customElements.define('project-list', ProjectList);
customElements.define('project-item', ProjectItem);
