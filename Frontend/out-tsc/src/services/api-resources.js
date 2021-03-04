import AuthorizationService from './authorization';
const BASE_URL = 'https://special-agency.herokuapp.com/v1';
export default {
    LOGIN: {
        path: `${BASE_URL}/auth/login`,
        method: 'POST',
        callback: reponseBody => {
            if (!reponseBody || !reponseBody.data.token)
                throw new Error('Bad data format on login');
        },
    },
    SIGNUP: {
        path: `${BASE_URL}/auth`,
        method: 'POST',
        callback: reponseBody => {
            if (!reponseBody || !reponseBody.data.token)
                throw new Error('Bad data format on login');
            AuthorizationService.instance().setToken(reponseBody.data.token);
        }
    },
    SIGNUP_GOOGLE: {
        path: `${BASE_URL}/auth/google`,
        method: 'POST'
    },
    fetch: async (infos, body) => {
        var _a;
        try {
            const token = AuthorizationService.instance().getToken();
            const response = await window.fetch(infos.path, {
                method: infos.method,
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
            const data = await response.json();
            if (!response.ok)
                throw data;
            (_a = infos.callback) === null || _a === void 0 ? void 0 : _a.call(infos, data);
            return data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },
};
//# sourceMappingURL=api-resources.js.map