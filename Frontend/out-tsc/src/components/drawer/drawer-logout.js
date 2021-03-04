import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '../sign/sign-in';
import '../sign/sign-up';
import '../collapser/collapser';
class DrawerLogout extends LitElement {
    constructor() {
        super(...arguments);
        this.collapse = false;
    }
    render() {
        return html `
      <div id="header">
        <img id="avatar" src="/assets/images/default_avatar.png" />
      </div>
      <sign-in></sign-in>
      <div id="footer">
        <mwc-button
          id="toggle-button"
          @click="${() => (this.collapse = !this.collapse)}"
          >Sign Up</mwc-button
        >
      </div>

      <mwc-dialog ?open="${this.collapse}">
        <sign-up></sign-up>
      </mwc-dialog>
    `;
    }
}
DrawerLogout.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--drawer-background-color);
      height: 100vh;
    }

    #header {
      padding: 24px;
    }

    #avatar {
      border-radius: 50%;
    }

    mwc-button {
      background-color: var(--accent-color);
      width: 100%;
      --mdc-theme-primary: var(--text-primary-color);
    }
  `;
__decorate([
    property({ type: Boolean, attribute: false })
], DrawerLogout.prototype, "collapse", void 0);
customElements.define('drawer-logout', DrawerLogout);
//# sourceMappingURL=drawer-logout.js.map