import { borderImage } from './border-image.js';
import { sharedStyles } from './shared-styles.js';
import { html, LitElement, property } from 'lit-element';

export { borderImage, sharedStyles };

/**
 * Abstract class implemented by all dashed elements
 * Should not be directly instancied
 *
 */
export class DashedBase extends LitElement {
  @property({ type: Number, attribute: 'border-radius' }) borderRadius!: number;
  @property({ type: Number, attribute: 'dash-width' }) dashWidth!: number;
  @property({ type: Number, attribute: 'dash-length' }) dashLength!: number;
  @property({ type: Number, attribute: 'dash-spacing' }) dashSpacing!: number;
  @property({ type: String, attribute: 'dash-color' }) dashColor: string = '#3636e7';

  // get dashColor() {
  //   const dashColor = this.getAttribute('dash-color') || '';
  //   if ([...this.customProperties.keys()].includes(dashColor)) {
  //     // Hack to get the color since CSS variables are not supported inside the border-image url().
  //     // One can also get it from this.shadowRoot.styleSheets[0].rules[0].style.getPropertyValue(`--color-${dashColor}`)
  //     // But the latter method requires a first render
  //     const colorValue = this.customProperties.get(`${dashColor}`);
  //     return colorValue.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated
  //   }
  //   return (dashColor || this.customProperties.get('primary')).replace('#', '%23');
  // }

  render() {
    return html`
      <div>Provide your own template() implement in ${this.constructor.name}</div>
    `;
  }
}
// customElements.define('dashed-base', DashedBase);
