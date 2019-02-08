import { LitElement, html, customElement, property, css } from 'lit-element';

import './nav.js';
import './get-started.js';
import './home.js';

// import '@dashedjs/dashed-core/packages/index.js';

// import { DashedButton } from '@dashedjs/dashed-core/packages/button/button.js';
// import { DashedCard } from '@dashedjs/dashed-core/packages/card/card.js';
// import { DashedCheckbox } from '@dashedjs/dashed-core/packages/checkbox/checkbox.js';
// import { DashedFab } from '@dashedjs/dashed-core/packages/fab/fab.js';
// import { DashedHeader } from '@dashedjs/dashed-core/packages/header/header.js';
// import { DashedIcon } from '@dashedjs/dashed-core/packages/icon/icon.js';
// import { DashedIcons } from '@dashedjs/dashed-core/packages/icons/icons.js';
// import { DashedInput } from '@dashedjs/dashed-core/packages/input/input.js';
// import { DashedLink } from '@dashedjs/dashed-core/packages/link/link.js';
// import { DashedNotification } from '@dashedjs/dashed-core/packages/notification/notification.js';
// import { DashedRadio } from '@dashedjs/dashed-core/packages/radio/radio.js';
// import { DashedSelect } from '@dashedjs/dashed-core/packages/select/select.js';
// import { DashedSlider } from '@dashedjs/dashed-core/packages/slider/slider.js';
// import { DashedTag } from '@dashedjs/dashed-core/packages/tag/tag.js';
// import { DashedToggle } from '@dashedjs/dashed-core/packages/toggle/toggle.js';

import '@dashedjs/dashed-core/packages/button/button.js';
import '@dashedjs/dashed-core/packages/card/card.js';
import '@dashedjs/dashed-core/packages/checkbox/checkbox.js';
import '@dashedjs/dashed-core/packages/fab/fab.js';
import '@dashedjs/dashed-core/packages/header/header.js';
import '@dashedjs/dashed-core/packages/icon/icon.js';
import '@dashedjs/dashed-core/packages/icons/icons.js';
import '@dashedjs/dashed-core/packages/input/input.js';
import '@dashedjs/dashed-core/packages/link/link.js';
import '@dashedjs/dashed-core/packages/notification/notification.js';
import '@dashedjs/dashed-core/packages/radio/radio.js';
import '@dashedjs/dashed-core/packages/select/select.js';
import '@dashedjs/dashed-core/packages/slider/slider.js';
import '@dashedjs/dashed-core/packages/tag/tag.js';
import '@dashedjs/dashed-core/packages/toggle/toggle.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
// // This element is connected to the Redux store.
import { store } from '../redux/store.js';

@customElement('site-app')
export class SiteApp extends connect(store)(LitElement) {
  @property({ type: String }) name = 'site-app';

  static styles = css`
    --color-stop-top: #fbfafe;
    --color-stop-bottom: #e4e4e4;
  `;

  render() {
    return html`
      <site-home></site-home>
    `;
  }
}
