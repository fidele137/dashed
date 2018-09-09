import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { until } from 'lit-html/directives/until';
import { commonStyles } from '../styles/styles';

export class DashedIcon extends LitElement {
  static get is() {
    return 'dashed-icon';
  }

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  src: string = '';

  @property({ type: String })
  size: number = 24;

  @property({ type: String })
  ariaLabel: string = '';

  @property({ type: String })
  ariaLabelledBy: string = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const observer = new MutationObserver(mutations => {
      if (mutations[0].type === 'childList') this.dispatchEvent(new CustomEvent('iconloaded'));
    });
    observer.observe(this.renderRoot, { childList: true });
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
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
          width: 16px;
          height: 16px;
        }
        
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      </style>
      ${until(this.fetchIcon(this.name, this.src), '')}
    `;
  }

  fetchIcon(name: string, src: string) {
    const iconUrl = name ? `../packages/icons/${name}.svg` : src;
    return fetch(iconUrl)
      .then(res => res.text())
      .then(icon => html`<span .innerHTML="${icon}"></span>`)
      .catch(e => console.error(e));
  }
}
customElements.define(DashedIcon.is, DashedIcon);