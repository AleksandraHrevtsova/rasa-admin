import { createContext, useContext, useState, useEffect, useRef } from "react";
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { setToken, clearToken } from '../auth/tokenManager';

import { getMe } from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [appUser, setAppUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const isFetched = useRef(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      try {
        if (user) {
          const token = await user.getIdToken();
          setToken(token);
          setFirebaseUser(user);

          if (!isFetched.current) {
            const data = await getMe();
            setAppUser(data.user);
            isFetched.current = true;
          }
        } else {
          setFirebaseUser(null);
          setAppUser(null);
          clearToken();
          isFetched.current = false;
        }
      } catch (err) {
        console.error('Auth sync error:', err);
        setAppUser(null);
        clearToken();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);