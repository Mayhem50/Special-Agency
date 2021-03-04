import { LitElement, html, css, property } from 'lit-element';

class AppPage extends LitElement {
  @property({ type: String }) title = 'My app';

  static styles = css`
    
  `;

  render() {
    return html`
      <div>APP</div>
    `;
  }
}

customElements.define('app-page', AppPage);
