import { useState } from 'react';
import { useI18n } from '@/ui/hooks/useI18n';
import { formItemTypes } from "@/config/constants";
import { login } from '@/core/auth/services/auth.service';
import { useLocation, useNavigate } from 'react-router';
import { NAV } from '@/config/constants';
import { buttonActionTypes } from "@/config/constants";

import { Button } from '@/ui/components/Button';

export default function Login() {
  const { t, k } = useI18n();

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from || NAV.home;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
    navigate(from, { replace: true });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-bold text-primary mb-6'>{t(k.auth.title)}</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <input
          id='login'
          name='login'
          type={formItemTypes.input.email}
          className='w-full p-2 mb-4 border rounded'
          placeholder={t(k.auth.email)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id='password'
          name='password'
          type={formItemTypes.input.password}
          className='w-full p-2 mb-4 border rounded'
          placeholder={t(k.auth.password)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type='submit' 
          label={t(k.auth.submit)}
          onClick={null} 
          action={buttonActionTypes.submit} 
          disabled={!email && !password}
        />
      </form>
    </div>
  );
}