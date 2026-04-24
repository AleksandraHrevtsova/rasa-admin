import api from '@/core/api/apiClient';
import { auth } from '@/firebase';

const addAuthorizationHeaders = async (config) => {
  const user = auth.currentUser;

  if (!user) return config;

  try {
    const token = await user.getIdToken();

    config.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.error('Auth token error:', err);
  }

  return config;
};

const handleResponseError = (error) => {
  return Promise.reject(error);
};

api.interceptors.request.use(addAuthorizationHeaders);
api.interceptors.response.use(
  (response) => response,
  handleResponseError
);