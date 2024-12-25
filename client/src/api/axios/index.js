import axios from 'axios';

import { serverExpress } from '../../config/environment';
import { lsAccessToken } from '../../constants/localstorage';

export const myAxios = axios.create({
  // что бы куки цеплялись автоматически
  withCredentials: true,
  baseURL: serverExpress,
});

myAxios.interceptors.request.use((config) => {
  config.headers.Authorization = ` Bearer ${localStorage.getItem(lsAccessToken)}`;
  return config;
});

myAxios.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/api/auth/refresh',
          withCredentials: true,
        });
        localStorage.setItem(lsAccessToken, response.data.accessToken);
        return myAxios.request(originalRequest);
      } catch (error) {
        console.log('After refresh. Need auth.'); // eslint-disable-line no-console
      }
    }
    throw error;
  }
);
