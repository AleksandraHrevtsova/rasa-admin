import AppRouter from '@/routes/AppRouter';
import { useAuth } from '@/core/auth/hooks/useAuth';
import '@/core/api/interceptors';
import { SplashScreen } from '@/ui/components/SplashScreen';

function App() {
  const { ready } = useAuth();

  if (!ready) return <SplashScreen />;
  if (ready) return (
    
    <div className="text-sm font-medium text-gray-600 tracking-wide">
      <AppRouter/> 
    </div>
  )
}

export default App;
