import { LitElement, html, css, customElement } from 'lit-element';

export interface NavItem {
  text: string;
  href?: string;
  onclick?: any;
  icon?: string;
}

@customElement('site-nav')
export class SiteNav extends LitElement {
  static styles = css`
    dashed-header {
      --height: 48px;
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: none;
        cursor: pointer;
        border: 0;
        width: 48px;
        height: 48px;
        padding: 8px 16px;
      }
    }
  `;

  navItems: NavItem[] = [
    {
      text: 'Getting started',
      href: '#'
    },
    {
      text: 'Components',
      href: '#'
    },
    {
      text: 'Playground',
      href: '#'
    }
  ];

  selectedItem: any;

  onItemClick(navItem: NavItem) {
    console.log(navItem);
  }

  render() {
    return html`
      <dashed-header .navItems="${this.navItems}" .logosrc="/assets/img/logo.png" .logo-text="Dashedjs">
        <!--
          <ul slot="ul" id="menu" role="menu" aria-labelledby="menubutton">
            <li role="none" *ngFor="let navItem of navItems">
              <a role="menuitem"> {{ navItem.text }} </a>
            </li>
          </ul>
        -->

        <button slot="right-slot" role="search" aria-label="Source on Github">
          <dashed-icon name="github"></dashed-icon>
        </button>
      </dashed-header>
    `;
  }
}
