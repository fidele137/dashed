import { LitElement, html, svg } from '@polymer/lit-element/lit-element.js';
import { dashedColors } from '../styles/styles.js';
import { drawDashedRect } from '../utils/rect-dasharray.js';

export class DashedCheckbox extends LitElement {
  static get is() {
    return 'dashed-checkbox';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;

    this.dashWidth = 2;
    this.dashLength = 4;
    this.dashRatio = 0.5;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({ disabled, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-checkbox-dimension: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
          ${dashedColors}
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: var(--dashed-checkbox-dimension);
          height: var(--dashed-checkbox-dimension);
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type="checkbox"]:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <svg class="dash">
          <rect class="border" />
          <path class="checkmark" />
        </svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('input[type="checkbox"]');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const svg = this.svg;
    const border = svg.querySelector('.border');
    const [width, height] = [24, 24];
    const borderRadius = 0;

    const hostProps = { width, height, borderRadius };
    const dashProps = { dashWidth: this.dashWidth, dashLength: this.dashLength, dashRatio: this.dashRatio };
    drawDashedRect(border, hostProps, dashProps);

    const checkmark = svg.querySelector('.checkmark');
    checkmark.setAttribute('stroke-width', this.dashWidth * 1.8);
    checkmark.setAttribute('stroke', '#ff0000');
    checkmark.setAttribute('d', 'M6 12l4 4l8 -8');
  }
}
customElements.define(DashedCheckbox.is, DashedCheckbox);
