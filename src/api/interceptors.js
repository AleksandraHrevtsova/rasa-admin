import api from "./index";
import { clearToken, getToken } from "../auth/tokenManager";
// import { getLocale } from '../';

const addAuthorizationHeaders = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // const locale = getLocale();
  // if (locale) {
  //   config.headers['Accept-Language'] = locale;
  // }

  return config;
};

const refreshToken = async (error) => {
  if (error.response?.status === 401) {
    console.warn("Unauthorized");
    clearToken();
  }
  return Promise.reject(error);
}

api.interceptors.request.use(addAuthorizationHeaders);

api.interceptors.response.use((response) => response, refreshToken);