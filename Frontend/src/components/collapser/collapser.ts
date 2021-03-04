import { LitElement, html, css, property } from 'lit-element';

class WcCollapser extends LitElement {
  @property({ type: Boolean }) collapse = false;
  @property({ type: Number }) transition = 500;

  static styles = css`
    .collapse {
      transition: 500ms;
      max-height: 100vh;
      opacity: 1;
    }

    .collapse[collapse] {
      max-height: 0;
      opacity: 0;
    }
  `;

  render() {
    return html`
      <div class="collapse" ?collapse="${this.collapse}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('wc-collapser', WcCollapser);
