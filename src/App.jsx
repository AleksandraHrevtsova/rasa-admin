import { AuthProvider } from '@/contexts/AuthContext';
import AppRouter from '@/routes/AppRouter';
import '@/core/api/interceptors';

function App() {

  return (
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
  )
}

export default App
