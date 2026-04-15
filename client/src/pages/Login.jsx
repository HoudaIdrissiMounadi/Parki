import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success(result.message);
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 bg-blue-100 rounded-full text-primary">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bon retour !</h1>
          <p className="text-gray-600 text-center mt-2">Connectez-vous pour gérer vos réservations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
