import AuthorizationService from './authorization';

const BASE_URL = 'https://special-agency.herokuapp.com/v1';

export interface FecthInfo {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  callback?: (data: any) => any;
}

export default {
  LOGIN: {
    path: `${BASE_URL}/auth/login`,
    method: 'POST',
    callback: reponseBody => {
      if (!reponseBody || !reponseBody.data.token) throw new Error('Bad data format on login');
    },
  } as FecthInfo,

  SIGNUP: {
    path: `${BASE_URL}/auth`,
    method: 'POST',
    callback: reponseBody => {
      if (!reponseBody || !reponseBody.data.token) throw new Error('Bad data format on login');
      AuthorizationService.instance().setToken(reponseBody.data.token);
    }
  } as FecthInfo,

  SIGNUP_GOOGLE: {
    path: `${BASE_URL}/auth/google`,
    method: 'POST'
  } as FecthInfo,

  fetch: async (infos: FecthInfo, body?: any) => {
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

      infos.callback?.(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
