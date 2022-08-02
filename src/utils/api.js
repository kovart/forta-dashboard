import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept-Language'] = 'en';

export const createApi = (token, apiBaseUrl) => {
  const headers = {};

  if (token) {
    // not implemented yet
  }

  const instance = axios.create({
    headers,
    baseURL: apiBaseUrl
  });

  instance.interceptors.request.use(
    (config) => ({
      ...config,
      url: encodeURI(config.url)
    }),
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use((res) => res.data);

  return instance;
};

const Api = createApi();

export default Api;
