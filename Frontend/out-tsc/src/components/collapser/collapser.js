import { __decorate } from "tslib";
import { LitElement, html, css, property } from 'lit-element';
class WcCollapser extends LitElement {
    constructor() {
        super(...arguments);
        this.collapse = false;
        this.transition = 500;
    }
    render() {
        return html `
      <div class="collapse" ?collapse="${this.collapse}">
        <slot></slot>
      </div>
    `;
    }
}
WcCollapser.styles = css `
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
__decorate([
    property({ type: Boolean })
], WcCollapser.prototype, "collapse", void 0);
__decorate([
    property({ type: Number })
], WcCollapser.prototype, "transition", void 0);
customElements.define('wc-collapser', WcCollapser);
//# sourceMappingURL=collapser.js.map