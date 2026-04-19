import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: searchParams.get('role') || 'driver',
  });

  const [phoneSuffix, setPhoneSuffix] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(prev => ({ ...prev, phone: `+212${phoneSuffix}` }));
  }, [phoneSuffix]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      setPhoneSuffix(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneSuffix.length !== 9) {
      toast.error('Numéro invalide (9 chiffres requis après +212)');
      return;
    }
    const result = await register(formData);
    if (result.success) {
      toast.success(result.message);
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 bg-gray-50 py-12 font-inter">
      <div className="w-full max-w-md p-10 bg-white shadow-xl rounded-[40px] border border-gray-100">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-4 mb-4 bg-gray-900 rounded-[20px] text-white rotate-3">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Créer un compte</h1>
          <p className="text-gray-400 font-bold mt-1 uppercase text-[10px] tracking-widest">Rejoignez la communauté Parki</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Nom complet</label>
            <input type="text" name="name" required className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all" placeholder="Ahmed Alaoui" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Email</label>
            <input type="email" name="email" required className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all" placeholder="votre@email.com" value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Téléphone (Maroc)</label>
            <div className="flex group transition-all">
              <div className="flex items-center bg-gray-200 px-5 border-2 border-transparent rounded-l-[20px] text-gray-600 font-black text-sm">+212</div>
              <input type="tel" required className="flex-1 px-5 py-4 bg-gray-50 border-2 border-transparent border-l-0 focus:border-gray-900 rounded-r-[20px] outline-none font-black text-gray-900 transition-all" placeholder="600000000" value={phoneSuffix} onChange={handlePhoneChange} />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Mot de passe</label>
            <input type={showPassword ? "text" : "password"} name="password" required className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[44px] text-gray-400 hover:text-gray-900">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-widest">Je suis un :</label>
            <select name="role" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-[20px] outline-none font-black text-gray-900 transition-all appearance-none cursor-pointer" value={formData.role} onChange={handleChange}>
              <option value="driver">Conducteur</option>
              <option value="owner">Propriétaire</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-5 mt-4 bg-gray-900 text-white font-black text-lg rounded-[20px] hover:bg-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-95 disabled:opacity-50">
            {isLoading ? 'Création...' : "S'inscrire"}
          </button>
        </form>

        <p className="mt-10 text-center text-gray-400 font-bold text-sm">
          Déjà un compte ? <Link to="/login" className="text-gray-900 font-black hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
