const TOKEN_KEY = 'Bearer_Token';
export default class AuthorizationService {
    constructor() { }
    static instance() {
        if (!this._instance)
            this._instance = new AuthorizationService();
        return this._instance;
    }
    setToken(token) {
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    getToken() {
        return window.localStorage.getItem(TOKEN_KEY);
    }
    isAuthorized() {
        const token = this.getToken();
        if (token)
            return true;
        return false;
    }
}
;
//# sourceMappingURL=authorization.js.map