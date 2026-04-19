import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 bg-gray-50 font-inter">
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-[40px] border border-gray-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-4 mb-4 bg-gray-900 rounded-[20px] text-white -rotate-3">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Bon retour !</h1>
          <p className="text-gray-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Gérez vos stationnements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Email</label>
            <input type="email" required className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Mot de passe</label>
            <input type={showPassword ? "text" : "password"} required className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[44px] text-gray-400 hover:text-gray-900">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-5 bg-gray-900 text-white font-black text-lg rounded-[20px] hover:bg-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-95 disabled:opacity-50">
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-400 font-bold text-sm">
          Pas de compte ? <Link to="/register" className="text-gray-900 font-black hover:underline">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
