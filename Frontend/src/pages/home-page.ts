import { LitElement, html, css, property, query } from 'lit-element';
import '../components/sign/sign-in';
import '../components/sign/sign-up';
import '@material/mwc-dialog';
import '@material/mwc-top-app-bar';
import { Dialog } from '@material/mwc-dialog';
import { Router } from "@vaadin/router";

class HomePage extends LitElement {
  @query('#sign-in-dialog') signInDialog: Dialog | undefined;
  @query('#sign-up-dialog') signUpDialog: Dialog | undefined;

  static styles = css`
    :host {
      min-height: 100vh;
      min-width: 100vw;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/assets/images/backgrounds/1.png');
    }

    #app-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      background-color: var(--app-bar-background-color);
      position: fixed;
      top: 0;
      width: 100%;
    }

    #nav-actions {
      margin: 0 16px;
      display: flex;
    }

    mwc-button {
      white-space: nowrap;
      width: 100%;
      margin-left: 8px;
    }

    #sign-up {
      background-color: var(--accent-color);
      --mdc-theme-primary: var(--text-primary-color);
    }

    #content {
      width: 100%;
      height: 100vh;
      display: grid;
      grid-template-rows: 66% 34%;
    }

    #brand {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #brand > div {
      font-size: 36px;
      max-width: 550px;
      text-align: center;
      color: #9a9694;
    }

    mark {
      background-color: transparent;
    }

    .special-text {
      color: #d8b15a;
    }

    .agent-text {
      color: var(--text-primary-color);
    }

    #infos {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      background-color: #ffffff65;
    }

    #infos > div {
      padding: 48px 16px 0;
    }

    .info-header {
      color: #3a3838;
    }

    .info-content {
      font-size: 18px;
      padding: 24px 100px;
      text-align: justify;
    }

    mwc-dialog {
      --mdc-dialog-min-width: 28vw;
      --mdc-theme-surface: var(--drawer-background-color);
    }
  `;

  private showSignInDialog() {
    this.signInDialog?.show();
  }

  private showSignUpDialog() {
    this.signUpDialog?.show();
  }

  render() {
    return html`
      <main>
        <div id="main-container" slot="appContent">
          <div id="app-bar">
            <img src="/assets/images/logo/top-bar.png" />

            <a href="/app">App</a>

            <div id="nav-actions">
              <mwc-button @click="${this.showSignInDialog}"
                >Se connecter</mwc-button
              >
              <mwc-button id="sign-up" @click="${this.showSignUpDialog}"
                >S'inscrire</mwc-button
              >
            </div>
          </div>
          <div id="content">
            <section id="brand">
              <div>
                Il y aura toujours un <mark class="agent-text">Agent</mark>
                <mark class="special-text">Special</mark> prêt à accepter votre
                mission
              </div>
            </section>

            <section id="infos">
              <div>
                <div class="info-header">
                  <mark class="special-text">Special</mark>
                  Missions
                </div>
                <div class="info-content">
                  Les missions proposées par Special Agency sont spéciales.
                  Elles vous permettent de gagner du temps, de l'échanger.
                  Special Agency pourvoie différents types de missions dans des
                  secteurs variés et à la hauteur de l'expertise de nos agents.
                </div>
              </div>
              <div>
                <div class="info-header">
                  <mark class="special-text">Special</mark>
                  Agents
                </div>
                <div class="info-content">
                  Chez Special Agency, les agents sont sous couvertures. Ils
                  peuvent être vous, eux ou nous. Vous ne pouvez pas savoir.
                  Mais sachez que nous ne recrutons que les meilleurs dans leur
                  domaine. Et si un problème devait survenir, nous serions là
                  pour vous aider.
                </div>
              </div>
              <div>
                <div class="info-header">
                  <mark class="special-text">Special</mark>
                  Sponsors
                </div>
                <div class="info-content">
                  Special Agency peut être contacter par tout le monde pour
                  demander de l'aide. Vous aussi devenez un sponsor de l'agence.
                  En tant que sponsor, la seule chose que nous vous demandons
                  est votre temps. Prennez le temps d'expliquer votre problème.
                  Nos agents vous contacterons pour plus de détails.
                </div>
              </div>
            </section>
          </div>
        </div>

        <mwc-dialog id="sign-in-dialog">
          <sign-in></sign-in>
        </mwc-dialog>

        <mwc-dialog id="sign-up-dialog">
          <sign-up
            @on-success="${(value: boolean) => {
              if (value) {
                (this.shadowRoot?.querySelector(
                  '#sign-up-dialog'
                ) as Dialog).close();
                Router.go('/app');
              }
            }}"
          ></sign-up>
        </mwc-dialog>
      </main>
    `;
  }
}

customElements.define('home-page', HomePage);
