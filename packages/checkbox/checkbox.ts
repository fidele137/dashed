import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { drawDashedRect, Dash, DashProps, HostProps } from '@dashedjs/dashed-utils/utils';
import { commonStyles } from '@dashedjs/dashed-styles/styles';

export class DashedCheckbox extends LitElement implements Dash {
  static get is() {
    return 'dashed-checkbox';
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

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--dashed-danger-color);
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

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border: SVGRectElement = svg.querySelector('.border');
    const [width, height] = [24, 24];
    const borderRadius = 0;

    const hostProps: HostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);

    const checkmark = svg.querySelector('.checkmark');
    checkmark.setAttribute('stroke-width', `${this.dashProps.dashWidth * 1.8}`);
    checkmark.setAttribute('d', 'M6 12l4 4l8 -8');
  }
}
customElements.define(DashedCheckbox.is, DashedCheckbox);
