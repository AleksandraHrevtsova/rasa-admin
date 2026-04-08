import api from "./index";
import { clearToken, getToken, setToken } from "../auth/tokenManager";
import { auth } from '../firebase';

const addAuthorizationHeaders = async (config) => {
  let token = getToken();

  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken(true);
    setToken(token);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const handleResponseError = async (error) => {
  if (error.response?.status === 401) {
    console.warn("Unauthorized, clearing token");
    clearToken();
  }
  return Promise.reject(error);
}

api.interceptors.request.use(addAuthorizationHeaders);
api.interceptors.response.use((response) => response, handleResponseError);