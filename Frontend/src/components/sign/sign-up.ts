import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-circular-progress';
import ApiResources, { FecthInfo } from '../../services/api-resources';
import CommonStyles from '../../styles/common';
import Styles from './styles';

declare const gapi: any;
class SignUp extends LitElement {
  @property({ type: String, attribute: false }) email = 'regnier.ben@gmail.com';
  @property({ type: String, attribute: false }) password = 'x';
  @property({ type: String, attribute: false }) confirmPassword = 'x';
  @property({ type: String, attribute: false }) firstName = 'b';
  @property({ type: String, attribute: false }) lastName = 'c';
  @property({ type: Boolean, attribute: false }) loading = false;
  @property({ type: Boolean, attribute: false }) success = false;
  @property({ type: String, attribute: false }) error = '';

  private auth2: any;

  static getStyles() {
    return [
      CommonStyles,
      Styles,
      css`
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

  private updateEmail(event: Event) {
    this.email = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private updatePassword(event: Event) {
    this.password = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private updateConfirmPassword(event: Event) {
    this.confirmPassword = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private updateFirstName(event: Event) {
    this.firstName = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private updateLastName(event: Event) {
    this.lastName = (event.target as any).value;
    console.log((event.target as any).value);
  }

  private isButtonDisabled() {
    return (
      !this.email ||
      !this.password ||
      this.password !== this.confirmPassword ||
      !this.firstName ||
      !this.lastName ||
      this.loading
    );
  }

  private async sign(fetchInfo: FecthInfo, payload: any){
    try {
      this.loading = true;
      this.error = '';
      const data = await ApiResources.fetch(fetchInfo, payload);
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('on-success', {
            detail: true,
          })
        );
      }, 3000);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  private async signEmail() {
    this.sign(ApiResources.SIGNUP, {
      credential: { email: this.email, password: this.password },
      user: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
    })
  }

  private signGoogle(profile: any){
    const payload = {
      credential: {
        email: profile.getEmail(),
        id: profile.getId(),
      },
      user: {
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        avatar: profile.getImageUrl(),
      },
    };
    this.sign(ApiResources.SIGNUP_GOOGLE, payload);
  }

  firstUpdated() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '117559842854-shljqkvbvh0lfeo125ir2dpurfkqc8hs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(this.shadowRoot!!.getElementById('google-button'));
    });
  }

  attachSignin(element: HTMLElement | null) {
    this.auth2.attachClickHandler(
      element,
      {},
      async (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        this.signGoogle(profile);
      },
      (error: any) => {
        console.error(JSON.stringify(error, undefined, 2));
      }
    );
  }

  render() {
    return html`
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

        <mwc-icon-button id="google-button">
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
          @click="${this.signEmail}"
        >
          ${this.loading
            ? html`
                <mwc-circular-progress
                  indeterminate
                  density="${-6}"
                ></mwc-circular-progress>
              `
            : undefined}
          S'inscrire</mwc-button
        >

        ${this.success ? html`<div></div>` : undefined}
        <div class="error">${this.error ? this.error : html`&nbsp;`}</div>
      </div>
    `;
  }
}

customElements.define('sign-up', SignUp);
