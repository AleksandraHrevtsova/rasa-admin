import AppRouter from '@/routes/AppRouter';
import { useAuth } from '@/core/auth/hooks/useAuth';
import '@/core/api/interceptors';
import { Loading } from '@/ui/components/Loading';

function App() {
  const { ready } = useAuth();

  if (!ready) return <Loading />;
  if (ready) return (
    
    <div className='text-sm font-medium text-gray-600 tracking-wide'>
      <AppRouter/> 
    </div>
  )
}

export default App;
