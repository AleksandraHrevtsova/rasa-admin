import { createContext, useContext, useState, useEffect } from "react";
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { setToken, clearToken } from '../auth/tokenManager';

import { getMe } from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [appUser, setAppUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          setToken(token);
          setFirebaseUser(user);

          const data = await getMe();
          setAppUser(data.user);
        } catch (err) {
          console.error('Auth sync error:', err);
          setAppUser(null);
          clearToken();
        }
      } else {
        setFirebaseUser(null);
        setAppUser(null);
        clearToken();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);