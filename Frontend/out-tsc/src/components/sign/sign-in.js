import { __decorate } from "tslib";
import { LitElement, html, property } from 'lit-element';
import '@material/mwc-icon-button';
import '@material/mwc-button';
import '@vaadin/vaadin-icons';
import '@material/mwc-textfield';
import ApiResources from '../../services/api-resources';
import Styles from './styles';
class SignIn extends LitElement {
    constructor() {
        super(...arguments);
        this.email = '';
        this.password = '';
        this.collapse = false;
    }
    static getStyles() {
        return [Styles];
    }
    updateEmail(event) {
        this.email = event.target.value;
        console.log(event.target.value);
    }
    updatePassword(event) {
        this.password = event.target.value;
        console.log(event.target.value);
    }
    async sign() {
        try {
            const data = await ApiResources.fetch(ApiResources.LOGIN, {
                email: this.email,
                password: this.password,
            });
            console.log(JSON.stringify(data));
        }
        catch (error) { }
    }
    render() {
        return html `
      <h3>Connexion</h3>
      <div id="social-button-container">
        <mwc-icon-button twitter>
          <iron-icon icon="vaadin:twitter"></iron-icon>
        </mwc-icon-button>
        <mwc-icon-button facebook>
          <iron-icon icon="vaadin:facebook"></iron-icon>
        </mwc-icon-button>

        <mwc-icon-button google>
          <img src="/assets/images/sign/google.svg" />
        </mwc-icon-button>
      </div>

      <div id="form">
        <mwc-textfield
          label="email"
          @change="${this.updateEmail}"
          value="${this.email}"
          ?autoValidate="${true}"
          pattern="${"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"}"
        ></mwc-textfield>

        <mwc-textfield
          label="password"
          type="password"
          @change="${this.updatePassword}"
          value="${this.password}"
          ?autoValidate="${true}"
        ></mwc-textfield>

        <mwc-button
          ?disabled="${!this.email || !this.password}"
          @click="${this.sign}"
          >Se connecter</mwc-button
        >
      </div>
    `;
    }
}
__decorate([
    property({ type: String, attribute: false })
], SignIn.prototype, "email", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignIn.prototype, "password", void 0);
__decorate([
    property({ type: Boolean })
], SignIn.prototype, "collapse", void 0);
customElements.define('sign-in', SignIn);
//# sourceMappingURL=sign-in.js.map