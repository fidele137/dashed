import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.borderRadius = '16';
    this.dashWidth = '2';
    this.dashLength = '8';
    this.dashSpacing = '2.4';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get rounded() {
    return this.hasAttribute('rounded');
  }
  set rounded(value) {
    Boolean(value) ? this.setAttribute('rounded', '') : this.removeAttribute('rounded');
  }

  get borderRadius() {
    return this.getAttribute('border-radius');
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return this.getAttribute('dash-width');
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return this.getAttribute('dash-length');
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return this.getAttribute('dash-spacing');
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['rounded'];
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
          font-size: 14px;
        }

        :host(:hover) {
          color: var(--dashed-primary-color);
          --dashed-fill-color: var(--dashed-primary-light-color);
        }

        button {
          min-width: 48px;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          color: inherit;
          outline: none;
          padding: 4px 12px;
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--dashed-primary-light-color);
        }

        :host ::slotted([slot="icon"]) {
          stroke: currentColor;
          padding-right: 4px;
        }
      </style>
      <button type="button">
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-button', DashedButton);
