export class DashedIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get name() {
    return this.getAttribute('name');
  }
  set name(value) {
    this.setAttribute('name', value);
  }

  get src() {
    return this.getAttribute('src');
  }
  set src(value) {
    this.setAttribute('src', value);
  }

  get size() {
    return this.getAttribute('size');
  }
  set size(value) {
    this.setAttribute('size', value);
  }

  get ariaLabel() {
    return this.hasAttribute('aria-label');
  }
  set ariaLabel(value) {
    this.setAttribute('aria-label', value);
  }

  get ariaLabelledBy() {
    return this.hasAttribute('aria-labelledby');
  }
  set ariaLabelledBy(value) {
    this.setAttribute('aria-labelledby', value);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['name', 'src', 'size'];
  }

  async render() {
    const icon = await this.fetchIcon();
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          width: 24px;
          height: 24px;
        }

        :host-context(dashed-button),
        :host-context(dashed-button) svg {
          width: 16px;
          height: 16px;
        }

        :host-context(dashed-tag),
        :host-context(dashed-tag) svg {
          width: 12px;
          height: 12px;
        }

        :host-context(dashed-fab),
        :host-context(dashed-fab) svg {
          width: 18px;
          height: 18px;
        }
        
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      </style>
      <span>${icon}</span>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  fetchIcon() {
    const iconUrl = this.name ? `/node_modules/@dashedjs/dashed-icons/${this.name}.svg` : this.src;
    return fetch(iconUrl).then(res => {
      if (res.status !== 200) {
        throw new Error(`Error code ${res.status}, failed to load icon: ${iconUrl}`);
      }
      return res.text();
    });
  }
}
customElements.define('dashed-icon', DashedIcon);
