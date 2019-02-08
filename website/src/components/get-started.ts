import { LitElement, html, css, customElement } from 'lit-element';

@customElement('site-get-started')
export class SiteGetStarted extends LitElement {
  static styles = css`
    div.container {
      display: grid;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      nav {
        padding: 8px;
        overflow-y: auto;
        font-size: 0.9rem;
        box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.1);

        h4 {
          margin: 8px 0;
        }

        ul {
          padding: 0;
          margin: 0;
          li {
            list-style: none;
            padding: 8px 16px;
            a {
              cursor: pointer;
            }
          }
        }
      }

      div.demo {
        padding: 8px;
        overflow-y: auto;
      }
    }
  `;

  componentList: string[] = [
    'Button',
    'Card',
    'Checkbox',
    'Fab',
    'Header',
    'Icon',
    'Icons',
    'Input',
    'Link',
    'Notification',
    'Radio',
    'Select',
    'Slider',
    'Styles',
    'Tag',
    'Toggle',
    'Utils',

    'Select',
    'Slider',
    'Styles',
    'Tag',
    'Toggle',
    'Utils'
  ];

  currentComponent: string = '';

  render() {
    return html`
      <!--
        <div class="container">
          <nav>
            <h4>Components</h4>
            <ul>
              <li *ngFor="let component of componentList">
                <a>{{ component }}</a>
              </li>
            </ul>
          </nav>

          <div class="demo">
            <h5>{{ currentComponent }}</h5>
            <div class="usage">This is how to use the component</div>
            <div class="api">
              <div class="api__props">This is props api</div>
              <div class="api__css">This is the css api</div>
            </div>
            <div class="other">Other details</div>
          </div>
        </div>
      -->

      <site-nav></site-nav>
    `;
  }
}
