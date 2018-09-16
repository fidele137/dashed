import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedTag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.2 };
    this._firstRender = true;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.updateIcon();
    this._firstRender = false;
    this._nativeButton = this.shadowRoot.querySelector('button');
    this._nativeButton.addEventListener('click', this._toggleTag.bind(this));
  }

  updateIcon() {
    this._icon = this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
    if (this._icon && this._icon.localName === 'dashed-icon') {
      this._icon.addEventListener('iconloaded', this.drawDash.bind(this));
    } else {
      this.drawDash();
    }
  }

  disconnectedCallback() {
    if (this._icon) {
      this._icon.removeEventListener('iconloaded', this.drawDash.bind(this));
    }
    this._nativeButton.remove('click', this._toggleTag.bind(this));
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
        }

        button {
          min-width: 32px;
          min-height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 10px;
          font-size: 12px;
          position: relative;
          transition: color 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-danger-color);
        }

        :host ::slotted(dashed-icon[slot="icon"]),
        :host ::slotted(svg) {
          stroke: currentColor;
          padding-left: 4px;
        }
      </style>
      <button type="button">
        <slot></slot>
        <slot name="icon"></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _toggleTag(e) {
    this._nativeButton.classList.toggle('active');
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = (height - this.dashProps.dashWidth) / 2;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define('dashed-tag', DashedTag);
