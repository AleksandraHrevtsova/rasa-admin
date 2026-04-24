import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { getMe } from '@/core/auth/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setFirebaseUser(user);

      try {
        if (!user) {
          setAppUser(null);
          fetchRef.current = false;
          setLoading(false);
          return;
        }

        if (fetchRef.current) return;
        fetchRef.current = true;

        const data = await getMe();
        setAppUser(data.user);

      } catch (err) {
        console.error('Auth sync error:', err);
        setAppUser(null);
      } finally {
        setLoading(false);
      }
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