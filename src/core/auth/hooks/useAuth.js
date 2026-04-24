import { useContext } from 'react';
import { AuthContext } from '@/core/auth/context/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};