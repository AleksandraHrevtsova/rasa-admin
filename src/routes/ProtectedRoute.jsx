import { Navigate, useLocation } from "react-router";

import { useAuth } from "../contexts/AuthContext";
import { NAV } from '../constants/navigation';

import { Loading } from "../components/Loading";

export const ProtectedRoute = ({ children }) => {
  const { appUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />

  if (appUser) {
    return children;
  } else {
    return (
      <Navigate 
        to={NAV.login} 
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
};