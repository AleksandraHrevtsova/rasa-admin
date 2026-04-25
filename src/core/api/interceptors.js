import api from '@/core/api/apiClient';
import { auth } from '@/firebase';

const getFirebaseToken = async () => {
  const user = auth.currentUser;

  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch (e) {
    console.error('Token error:', e);
    return null;
  }
};

const addAuthorizationHeaders = async (config) => {
  const token = await getFirebaseToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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