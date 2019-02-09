import { LitElement, html, css, customElement } from 'lit-element';

@customElement('site-home')
export class SiteHome extends LitElement {
  // static styles = css`
  //   div.container {
  //     min-height: 80%;
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     justify-content: center;
  //     text-align: center;
  //     background: linear-gradient(to bottom, --color-stop-top, --color-stop-bottom);

  //     img.logo {
  //       width: 150px;
  //     }

  //     h1 {
  //       font-size: 2rem;
  //     }

  //     h2 {
  //       font-size: 1rem;
  //       font-weight: 400;
  //       padding: 0 2rem;
  //       margin: 0 auto 8px;
  //     }

  //     .action-buttons {
  //       margin-top: 2rem;
  //       display: flex;
  //       flex-direction: column;
  //       width: 200px;
  //       max-width: 100%;
  //       dashed-button {
  //         --padding: 8px 16px;
  //         margin: 8px;
  //       }
  //     }
  //   }

  //   footer {
  //     font-size: 0.9rem;
  //     height: 20%;
  //     background: --color-stop-bottom;
  //     display: flex;
  //     flex-direction: column;
  //     padding: 0 2rem;
  //     align-items: center;
  //     justify-content: center;
  //     text-align: center;
  //   }
  // `;

  onClick(e: Event) {
    console.log('on click', e, e.target, e.currentTarget);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
        }

        div.container {
          min-height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(to bottom, var(--color-stop-top), var(--color-stop-bottom));
        }

        img.logo {
          width: 150px;
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1rem;
          font-weight: 400;
          padding: 0 2rem;
          margin: 0 auto 8px;
        }

        .action-buttons {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          width: 200px;
          max-width: 100%;
        }

        dashed-button {
          --padding: 8px 16px;
          margin: 8px;
        }

        footer {
          font-size: 0.9rem;
          height: 20%;
          background: var(--color-stop-bottom);
          display: flex;
          flex-direction: column;
          padding: 0 2rem;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      </style>
      <div class="container">
        <!-- <img class="logo" src="src/assets/images/logo.png" alt="Dashedjs logo" /> -->
        <h1>Dashedjs</h1>
        <h2>A Design system powered with <b>dashed</b> Web components</h2>
        <div class="action-buttons">
          <dashed-button border-radius="6">Get started </dashed-button>
          <dashed-button @click="${this.onClick}" border-radius="6" dash-color="danger">Source </dashed-button>

          <dashed-toggle></dashed-toggle>

          <dashed-icon name="close"></dashed-icon>

          <dashed-button>Get started</dashed-button>
          <dashed-card></dashed-card>
          <dashed-checkbox>Checkbox</dashed-checkbox>
          <dashed-fab> <dashed-icon name="close"></dashed-icon> </dashed-fab>
          <dashed-header></dashed-header>
          <dashed-input></dashed-input>
          <dashed-link>Link</dashed-link>
          <dashed-notification></dashed-notification>
          <dashed-radio>Radio</dashed-radio>
          <dashed-select></dashed-select>
          <dashed-slider></dashed-slider>
          <dashed-tag>Tag text</dashed-tag>
          <dashed-toggle>Toggle</dashed-toggle>
        </div>
      </div>
      <footer>
        <div>Released under the MIT Licence</div>
        <div>&copy;2018 Fidèle Palouki | <a href="#">@dashedjs</a></div>
      </footer>
    `;
  }
}
