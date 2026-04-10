import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";
import { login } from "../services/auth.service";
import { useLocation, useNavigate } from 'react-router';
import { NAV } from "../constants/navigation";
import { Button } from "../components/Button";

export default function Login() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-primary mb-6">{t['login.title']}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder={t['login.email']}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder={t['login.password']}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type='submit' 
          label={t['login.submit']}
          onClick={null} 
          action='submit' 
          disabled={!email && !password}
        />
      </form>
    </div>
  );
}