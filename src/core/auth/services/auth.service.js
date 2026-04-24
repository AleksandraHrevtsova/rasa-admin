import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import api from '@/core/api/apiClient';
import { ENDPOINTS, NAV } from '@/config/constants';

const { LOGIN, LOGOUT, ME } = ENDPOINTS.API.AUTH;

function mapAuthError(error) {
  const code = error?.code;

  switch (code) {
    case 'auth/invalid-credential':
      return { field: 'input', message: 'invalid_credentials' };
    case 'auth/too-many-requests':
      return { field: 'form', message: 'too_many_requests' };
    case 'auth/network-request-failed':
      return { field: 'form', message: 'network_error' };
    default:
      return { field: 'form', message: 'authorization_error' };
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const { data } = await api.post(LOGIN);
    return data;
  } catch (err) {
    console.error('Auth error:', err.code);
    return {
      user: null,
      error: mapAuthError(err),
    };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    await api.post(LOGOUT);
  } finally {
    window.location.href = NAV.login;
  }
};

export const getMe = async () => {
  const { data } = await api.get(ME);
  return data;
};