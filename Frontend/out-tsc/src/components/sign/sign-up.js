import { __decorate } from "tslib";
import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-circular-progress';
import ApiResources from '../../services/api-resources';
import CommonStyles from '../../styles/common';
import Styles from './styles';
class SignUp extends LitElement {
    constructor() {
        super(...arguments);
        this.email = 'regnier.ben@gmail.com';
        this.password = 'x';
        this.confirmPassword = 'x';
        this.firstName = 'b';
        this.lastName = 'c';
        this.loading = false;
        this.success = false;
        this.error = '';
    }
    static getStyles() {
        return [
            CommonStyles,
            Styles,
            css `
        #success {
          opacity: 0;
          transition: 0.5s;
          transition-delay: 0.5s;
          position: fixed;
          margin-top: 16px;
        }

        #success > div {
          color: var(--text-primary-color);
          margin-top: 8px;
        }

        #success[success] {
          opacity: 1;
          transition-delay: 0;
        }

        #username {
          display: grid;
          grid-template-columns: 49% 49%;
          justify-content: space-between;
        }

        mwc-circular-progress {
          margin-right: 8px;
        }
      `,
        ];
    }
    updateEmail(event) {
        this.email = event.target.value;
        console.log(event.target.value);
    }
    updatePassword(event) {
        this.password = event.target.value;
        console.log(event.target.value);
    }
    updateConfirmPassword(event) {
        this.confirmPassword = event.target.value;
        console.log(event.target.value);
    }
    updateFirstName(event) {
        this.firstName = event.target.value;
        console.log(event.target.value);
    }
    updateLastName(event) {
        this.lastName = event.target.value;
        console.log(event.target.value);
    }
    isButtonDisabled() {
        return (!this.email ||
            !this.password ||
            this.password !== this.confirmPassword ||
            !this.firstName ||
            !this.lastName ||
            this.loading);
    }
    async sign() {
        try {
            this.loading = true;
            this.error = '';
            const data = await ApiResources.fetch(ApiResources.SIGNUP, {
                credential: { email: this.email, password: this.password },
                user: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                },
            });
            console.log(JSON.stringify(data));
            setTimeout(() => {
                this.dispatchEvent(new CustomEvent('on-success', {
                    detail: true,
                }));
            }, 3000);
            this.success = true;
        }
        catch (error) {
            this.error = error.message;
        }
        finally {
            this.loading = false;
        }
    }
    async signGoogle() {
        try {
            ApiResources.fetch(ApiResources.SIGNUP_GOOGLE);
        }
        catch (error) {
            console.log(error);
        }
    }
    render() {
        return html `
      <h3>Inscription</h3>
      <div id="success" ?success="${this.success}">
        <img src="assets/images/logo/Img-02.png" />
        <div>Félicitations, vous faites maintenant partie de l'Agence</div>
      </div>

      <div id="social-button-container">
        <mwc-icon-button twitter>
          <iron-icon icon="vaadin:twitter"></iron-icon>
        </mwc-icon-button>
        <mwc-icon-button facebook>
          <iron-icon icon="vaadin:facebook"></iron-icon>
        </mwc-icon-button>

        <mwc-icon-button google @click="${this.signGoogle}">
          <img src="/assets/images/sign/google.svg" />
        </mwc-icon-button>
      </div>

      <div id="form" ?success="${this.success}">
        <mwc-textfield
          label="email"
          @change="${this.updateEmail}"
          value="${this.email}"
          autoValidate
          pattern="${"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"}"
        ></mwc-textfield>

        <div id="username">
          <mwc-textfield
            label="prénom"
            @change="${this.updateFirstName}"
            value="${this.firstName}"
            autoValidate
            pattern="${'.*[a-zA-Z]'}"
          ></mwc-textfield>
          <mwc-textfield
            label="nom"
            @change="${this.updateLastName}"
            value="${this.lastName}"
            autoValidate
            pattern="${'.*[a-zA-Z]'}"
          ></mwc-textfield>
        </div>

        <mwc-textfield
          label="mot de passe"
          type="password"
          @change="${this.updatePassword}"
          value="${this.password}"
          autoValidate
        ></mwc-textfield>

        <mwc-textfield
          id="confirm-password"
          label="confirmer mot de passe"
          type="password"
          @change="${this.updateConfirmPassword}"
          validationMessage="Passwords are not same"
          value="${this.confirmPassword}"
          autoValidate
          pattern="${this.password}"
        ></mwc-textfield>

        <mwc-button
          ?disabled="${this.isButtonDisabled()}"
          @click="${this.sign}"
        >
          ${this.loading
            ? html `
                <mwc-circular-progress
                  indeterminate
                  density="${-6}"
                ></mwc-circular-progress>
              `
            : undefined}
          S'inscrire</mwc-button
        >

        ${this.success ? html `<div></div>` : undefined}
        <div class="error">${this.error ? this.error : html `&nbsp;`}</div>
      </div>
    `;
    }
}
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "email", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "password", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "confirmPassword", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "firstName", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "lastName", void 0);
__decorate([
    property({ type: Boolean, attribute: false })
], SignUp.prototype, "loading", void 0);
__decorate([
    property({ type: Boolean, attribute: false })
], SignUp.prototype, "success", void 0);
__decorate([
    property({ type: String, attribute: false })
], SignUp.prototype, "error", void 0);
customElements.define('sign-up', SignUp);
//# sourceMappingURL=sign-up.js.map