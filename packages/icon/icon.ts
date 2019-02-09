import { html, LitElement, property, customElement } from 'lit-element';

@customElement('dashed-icon')
export class DashedIcon extends LitElement {
  @property({ type: String }) name!: string;
  @property({ type: String }) src!: string;
  @property({ type: String, attribute: 'icons-root' }) iconsRoot: string = 'node_modules/@dashedjs/dashed-icons';
  @property({ type: String }) size!: string;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel!: string;
  @property({ type: String, attribute: 'aria-labelled-by' }) ariaLabelledBy!: string;

  constructor() {
    super();
    this.iconsRoot = 'node_modules/@dashedjs/dashed-icons';
  }

  // static get properties() {
  //   return {
  //     name: { type: String },
  //     src: { type: String },
  //     iconsRoot: { type: String, attribute: 'icons-root' },
  //     size: { type: Number },
  //     ariaLabel: { type: String, attribute: 'aria-label' },
  //     ariaLabelledBy: { type: String, attribute: 'aria-labelled-by' }
  //   };
  // }

  // get iconsRoot() {
  //   // return this.getAttribute('icons-root') || 'assets/dashed-icons';
  //   return this.getAttribute('icons-root') || 'node_modules/@dashedjs/dashed-icons';
  // }
  // set iconsRoot(value) {
  //   this.setAttribute('icons-root', value);
  // }

  async render() {
    const svg = await this.fetchIcon();
    return html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          width: 18px;
          height: 18px;
        }

        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      </style>
      <span .innerHTML="${svg}"></span>
    `;
  }

  async fetchIcon() {
    let iconUrl!: string;
    if (this.src) {
      iconUrl = /^\//.test(this.src) ? this.src : `/${this.src}`;
    } else if (this.name) {
      iconUrl = /^\//.test(this.iconsRoot)
        ? `${this.iconsRoot}/${this.name}.svg`
        : `/${this.iconsRoot}/${this.name}.svg`;
    }
    try {
      const res = await fetch(iconUrl, { cache: 'force-cache' });
      if (res.status !== 200) {
        throw new Error(`Error code ${res.status}, failed to load icon: ${iconUrl}.
          Check your 'src' attribute or try setting 'iconsRoot' if you are using the 'name' attribute inside a framework
          (For Angular set 'iconsRoot' attribute to 'assets/dashed-icons')`);
      }
      return res.text();
    } catch (err) {
      return console.error(err);
    }
  }
}
