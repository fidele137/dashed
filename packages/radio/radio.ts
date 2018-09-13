import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { drawDashedCircle, DashProps, HostProps, Dash } from '@dashedjs/dashed-utils/utils';
import { commonStyles } from '@dashedjs/dashed-styles/styles';

export class DashedRadio extends LitElement implements Dash {
  static get is() {
    return 'dashed-radio';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  checked: boolean = false;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render() {
    return html`
      ${commonStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
        }

        .radio-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
  
        svg.dash .outer-circle {
          stroke: var(--dashed-primary-color);
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-danger-color);
        }

        input[type="radio"]:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type="radio"]:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" />
        <svg class="dash">
          <circle class="outer-circle" />
          <circle class="inner-circle" />
        </svg>
      </div>
      <label for="radio"><slot></slot></label>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const [width, height] = [24, 24];

    const outerCircle: SVGCircleElement = svg.querySelector('.outer-circle');
    const hostProps: HostProps = { width, height };
    drawDashedCircle(outerCircle, hostProps, this.dashProps);

    const innerCircle = svg.querySelector('.inner-circle');
    innerCircle.setAttribute('cx', `${width / 2}`);
    innerCircle.setAttribute('cy', `${height / 2}`);
    innerCircle.setAttribute('r', '5');
  }
}
customElements.define(DashedRadio.is, DashedRadio);
