import { __decorate } from "tslib";
import { LitElement, html, css, property } from 'lit-element';
class AppPage extends LitElement {
    constructor() {
        super(...arguments);
        this.title = 'My app';
    }
    render() {
        return html `
      <div>APP</div>
    `;
    }
}
AppPage.styles = css `
    
  `;
__decorate([
    property({ type: String })
], AppPage.prototype, "title", void 0);
customElements.define('app-page', AppPage);
//# sourceMappingURL=app-page.js.map