import { html, fixture, expect } from '@open-wc/testing';
describe('SpecialAgency', () => {
    let element;
    beforeEach(async () => {
        element = await fixture(html `<special-agency></special-agency>`);
    });
    it('renders a h1', () => {
        const h1 = element.shadowRoot.querySelector('h1');
        expect(h1).to.exist;
        expect(h1.textContent).to.equal('My app');
    });
    it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible();
    });
});
//# sourceMappingURL=special-agency.test.js.map