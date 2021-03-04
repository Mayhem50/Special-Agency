import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-icon-button';
import '@material/mwc-button';
import '@vaadin/vaadin-icons';
import '@material/mwc-textfield';
import ApiResources from '../../services/api-resources';
import Styles from './styles';

declare const gapi: any;

class SignIn extends LitElement {
  @property({ type: String, attribute: false }) email = '';
  @property({ type: String, attribute: false }) password = '';
  @property({ type: Boolean }) collapse = false;

  static getStyles() {
    return [Styles];
  }

  private updateEmail(event: Event) {
    this.email = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private updatePassword(event: Event) {
    this.password = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private async sign() {
    try {
      const data = await ApiResources.fetch(ApiResources.LOGIN, {
        email: this.email,
        password: this.password,
      });
      console.log(JSON.stringify(data));
    } catch (error) {}
  }

  render() {
    return html`
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

customElements.define('sign-in', SignIn);
