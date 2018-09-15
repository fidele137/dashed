import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedTag extends LitElement {
  static get is() {
    return 'dashed-tag';
  }

  static get properties() {
    return {
      disabled: Boolean,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.dashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.2 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._icon = this.renderRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
    if (this._icon && this._icon.constructor.name === 'DashedIcon') {
      this._icon.addEventListener('iconloaded', this.drawDash.bind(this));
    } else {
      this.drawDash();
    }
  }

  disconnectedCallback() {
    if (this._icon) {
      this._icon.removeEventListener('iconloaded', this.drawDash.bind(this));
    }
  }

  render() {
    return html`
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
      <button type="button" @click="${e => this._toggleTag(e)}">
        <slot></slot>
        <slot name="icon"></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  _toggleTag(e) {
    const button = this.renderRoot.querySelector('button');
    button.classList.toggle('active');
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = (height - this.dashProps.dashWidth) / 2;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedTag.is, DashedTag);