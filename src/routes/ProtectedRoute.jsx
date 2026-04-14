import { Navigate, useLocation } from 'react-router';

import { useAuth } from '../contexts/AuthContext';
import { NAV } from '../config/constants';

import { Loading } from '../ui/components/Loading';

export const ProtectedRoute = ({ children }) => {
  const { appUser, loading } = useAuth();
  const location = useLocation();

  const locationState = { from: location.pathname + location.search };

  if (loading) return <Loading />
  if (!appUser) return <Navigate to={NAV.login} replace state={locationState}/>
  return children;
};