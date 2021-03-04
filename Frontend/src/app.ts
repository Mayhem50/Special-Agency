import { LitElement, html, css, property } from 'lit-element';
import "@material/mwc-top-app-bar-fixed";
import "./services/router";

export class SpecialAgency extends LitElement {
  @property({ type: String }) title = 'My app';

  static styles = css`
    :host {
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      margin: 0 auto;
      text-align: center;
      background-color: var(--special-agency-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo > svg {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('special-agency', SpecialAgency);
