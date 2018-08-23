import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';

export class DashedTag extends LitElement {
  static get is() {
    return 'dashed-tag';
  }

  static get properties() {
    return {
      disabled: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;

    this.dashWidth = 1;
    this.dashLength = 6;
    this.dashRatio = 0.2;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({ disabled, checked, name, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-outline-color: rgba(255, 0, 0, 0.5);

          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          min-width: 48px;
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        button {
          display: inline-block;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 8px;
          font-size: 12px;
          position: relative;
          color: var(--dashed-primary-color);
          transition: 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          /* stroke-linecap: round; */
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
      </style>
      <button type="button" on-click="${e => this._toggleTag(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('button');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  _toggleTag(e) {
    const button = this.nativeElement;
    if (!button.classList.contains('active')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  drawDash() {
    const { width, height } = this.getBoundingClientRect();
    console.log({ width, height });
    const { dashWidth } = this._validateDashProps(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const border = svg.querySelector('.border');
    const borderRadius = (height - dashWidth) / 2;
    border.setAttribute('x', dashWidth / 2);
    border.setAttribute('y', dashWidth / 2);
    border.setAttribute('width', width - dashWidth);
    border.setAttribute('height', height - dashWidth);
    border.setAttribute('rx', borderRadius);
    border.setAttribute('ry', borderRadius);
    border.setAttribute('stroke-width', dashWidth);

    const lineX = width - 2 * borderRadius;
    const arcY = (border.getTotalLength() - 2 * lineX) / 2;

    const { strokeDasharray, strokeDashOffset } = this._computeRectRoundedStrokeDashParams(width, height, lineX, arcY);
    border.setAttribute('stroke-dasharray', strokeDasharray);
    border.setAttribute('stroke-dashoffset', strokeDashOffset);
  }

  _computeRectRoundedStrokeDashParams(width, height, lineX, arcY) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width, height);

    const dashCountX = Math.floor(
      (lineX - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength)
    );
    const dashCountY = Math.floor((arcY - dashRatio * this.dashLength) / ((1 + dashRatio) * dashLength));

    const dashSpacingX = (lineX - dashCountX * this.dashLength) / (dashCountX + 1);
    const dashSpacingY = (arcY - dashCountY * this.dashLength) / (dashCountY + 1);

    const strokeDashArrayX =
      `${dashLength} ${dashSpacingX} `.repeat(dashCountX - 1) + `${dashLength} ${dashSpacingX + dashSpacingY} `;
    const strokeDasharrayY =
      `${dashLength} ${dashSpacingY} `.repeat(dashCountY - 1) + `${dashLength} ${dashSpacingY + dashSpacingX} `;
    const strokeDasharray = `${strokeDashArrayX}${strokeDasharrayY}`.trim();
    const strokeDashOffset = -dashSpacingX;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width, height) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
    }
    const refDimension = Math.min(width, height);
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;

    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedTag.is, DashedTag);