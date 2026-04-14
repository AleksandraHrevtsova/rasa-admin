// import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext';
import { LocaleProvider } from './contexts/LocaleContext';
import AppRouter from './routes/AppRouter';
import './core/api/interceptors';

function App() {

  return (
    <LocaleProvider>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </LocaleProvider>
  )
}

export default App
