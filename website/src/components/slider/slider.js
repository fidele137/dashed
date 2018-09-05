import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles';
import { drawDashedLine } from '../utils/line-dasharray';

export class DashedSlider extends LitElement {
  static get is() {
    return 'dashed-slider';
  }
  static get properties() {
    return {
      disabled: Boolean,
      min: Number,
      max: Number,
      value: Number,
      step: Number,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.step = 1;

    this.dashWidth = 2;
    this.dashLength = 2;
    this.dashRatio = 0.5;
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated() {
    super.firstUpdated();
    this.drawDash();
    const svg = this.renderRoot.querySelector('svg.dash');
    this._sliderCursor = svg.querySelector('.slider-cursor');
    this._sliderTracker = svg.querySelector('.slider-tracker');
  }

  render() {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-slider-width: 192px;
          --dashed-slider-height: 24px;
          --dashed-slider-cursor-radius: 6px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-slider-width);
        }

        :host(:focus) svg.dash .slider-cursor-focus-ring {
          opacity: 1;
        }

        .slider-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: var(--dashed-slider-width);
          height: var(--dashed-slider-height);
        }

        input[type="range"] {
          margin: 0;
          width: calc(100% - var(--dashed-slider-cursor-radius));
          cursor: pointer;
          opacity: 0;
        }
  
        svg.dash .slider-background {
          stroke: var(--dashed-primary-color);
        }
  
        svg.dash .slider-tracker {
          stroke: var(--dashed-secondary-color);
          opacity: 0.8;
        }

        svg.dash .slider-cursor-inner {
          fill: var(--dashed-secondary-color);
        }

        svg.dash .slider-cursor-focus-ring {
          fill: rgba(255, 0, 0, 0.5);
          opacity: 0;
        }
      </style>
      <label for="range"><slot></slot></label>
      <div class="slider-container">
        <input type="range" id="range" min="${this.min}" max="${this.max}"
          step="${this.step}" value="${this.value}"
          on-input="${e => this._onInputHandler(e)}" />
        <svg class="dash">
          <line class="slider-background" />
          <line class="slider-tracker" />
          <g class="slider-cursor">
            <circle class="slider-cursor-focus-ring" />
            <circle class="slider-cursor-inner" />
          </g>
        </svg>
      </div>
    `;
  }

  _onInputHandler(e) {
    this.value = parseFloat(e.target.value);
    const sliderBackgroundwidth = 192 - 2 * 6;
    const percentage = (this.value - this.min) / (this.max - this.min);
    this._sliderCursor.style.transform = `translateX(${percentage *
      sliderBackgroundwidth}px)`;
    this._sliderTracker.setAttribute('x2', percentage * sliderBackgroundwidth);
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const { width, height } = this.renderRoot
      .querySelector('.slider-container')
      .getBoundingClientRect();

    const sliderCursor = svg.querySelector('.slider-cursor');
    const sliderCursorInner = sliderCursor.querySelector(
      '.slider-cursor-inner'
    );
    const sliderCursorInnerRadius = 6;
    sliderCursorInner.setAttribute('stroke-width', this.dashWidth);
    sliderCursorInner.setAttribute('cx', sliderCursorInnerRadius);
    sliderCursorInner.setAttribute('cy', height / 2);
    sliderCursorInner.setAttribute('r', sliderCursorInnerRadius);
    const sliderCursorFocusRing = sliderCursor.querySelector(
      '.slider-cursor-focus-ring'
    );
    sliderCursorFocusRing.setAttribute('stroke-width', this.dashWidth);
    sliderCursorFocusRing.setAttribute('cx', sliderCursorInnerRadius);
    sliderCursorFocusRing.setAttribute('cy', height / 2);
    sliderCursorFocusRing.setAttribute('r', sliderCursorInnerRadius * 1.5);

    const sliderBackground = svg.querySelector('.slider-background');
    const sliderBackgroundwidth = width - 2 * sliderCursorInnerRadius;
    const hostProps = { width: sliderBackgroundwidth, height };
    let dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedLine(sliderBackground, hostProps, dashProps);
    sliderBackground.setAttribute(
      'transform',
      `translate(${sliderCursorInnerRadius} ${-height / 2})`
    );

    const sliderTracker = svg.querySelector('.slider-tracker');
    drawDashedLine(sliderTracker, hostProps, dashProps);
    sliderTracker.setAttribute(
      'transform',
      `translate(${sliderCursorInnerRadius} ${-height / 2})`
    );

    const percentage = (this.value - this.min) / (this.max - this.min);
    sliderCursor.style.transform = `translateX(${percentage *
      sliderBackgroundwidth}px)`;
    sliderTracker.setAttribute('x2', percentage * sliderBackgroundwidth);
  }

  _computeLineStrokeDashParams(width) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width);

    const dashCount =
      1 + Math.floor((width - dashLength) / ((1 + dashRatio) * dashLength));
    const dashSpacing = (width - dashCount * dashLength) / (dashCount - 1);

    const strokeDasharray = `${dashLength} ${dashSpacing}`;
    const strokeDashOffset = 0;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(
        `dashWidth, dashLength and dashRatio must be positive numbers`
      );
    }
    const refDimension = width;
    const dashLength =
      this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth =
      this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio =
      dashLength * (1 + this.dashRatio) > refDimension
        ? refDimension - dashLength
        : this.dashRatio;
    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedSlider.is, DashedSlider);