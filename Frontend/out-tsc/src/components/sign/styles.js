import { css } from 'lit-element';
export default css `
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--drawer-background-color);
  }

  h3 {
    color: var(--text-primary-color);
    margin-bottom: 32px;
  }

  #social-button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  #social-button-container > * {
    margin: 16px;
  }

  #form {
    width: 100%;
    margin-top: 16px;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    opacity: 1;
    transition: 0.5s;
  }

  #form[success] {
    opacity: 0;
  }

  mwc-icon-button {
    background-color: white;
    border-radius: 50%;
  }

  mwc-icon-button[twitter] {
    color: white;
    background-color: var(--twitter-color);
  }

  mwc-icon-button[facebook] {
    color: white;
    background-color: var(--facebook-color);
  }

  mwc-textfield {
    --mdc-text-field-fill-color: var(--drawer-background-secondary-color);
    --mdc-text-field-filled-border-radius: 16px;
    margin-bottom: 8px;
    --mdc-theme-primary: var(--secondary-text-color);
    --mdc-text-field-ink-color: var(--secondary-text-color);
  }

  mwc-button {
    background-color: var(--accent-color);
    width: 100%;
    --mdc-theme-primary: var(--text-primary-color);
  }
`;
//# sourceMappingURL=styles.js.map