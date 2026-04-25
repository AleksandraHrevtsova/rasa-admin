import { createContext, useEffect, useRef, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { hydrateAuth } from '../utils/authHydrator';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [ready, setReady] = useState(false);

  const hydratedRef = useRef(false);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      setFirebaseUser(user);
  
      if (!user) {
        setAppUser(null);
        hydratedRef.current = false;
        setReady(true);
        return;
      }
  
      // ✅ FIX: не выходим без setReady
      if (hydratedRef.current) {
        setReady(true);
        return;
      }
  
      hydratedRef.current = true;
  
      try {
        const appUser = await hydrateAuth();
        setAppUser(appUser);
      } catch (e) {
        console.error(e);
        // setAppUser(null);
      } finally {
        setReady(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, ready }}>
      {children}
    </AuthContext.Provider>
  );
};