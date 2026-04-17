import api from '@/core/api/apiClient';
import { clearToken, getToken, setToken } from '@/core/auth/tokenManager';
import { auth } from '@/firebase';

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

const refreshTokenIfNeeded = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const newToken = await user.getIdToken(true);
  setToken(newToken);
  return newToken;
};

const refreshToken = async (error) => {
  if (error.response?.status === 401) {
    try {
      const newToken = await refreshTokenIfNeeded();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      }
    } catch (err) {
      clearToken();
    }
  }
  return Promise.reject(error);
}

api.interceptors.request.use(addAuthorizationHeaders);
api.interceptors.response.use((response) => response, refreshToken);