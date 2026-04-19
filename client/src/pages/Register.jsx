import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'driver',
  });

  const [phoneSuffix, setPhoneSuffix] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // Sync suffix with full phone number
  useEffect(() => {
    setFormData(prev => ({ ...prev, phone: `+212${phoneSuffix}` }));
  }, [phoneSuffix]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 9) {
      setPhoneSuffix(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneSuffix.length !== 9) {
      toast.error('Le numéro de téléphone doit contenir exactement 9 chiffres après le +212');
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
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 bg-blue-100 rounded-full text-primary">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 font-medium text-center mt-2">Rejoignez la communauté Parki au Maroc</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Nom complet</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bold transition-all"
              placeholder="Ex: Ahmed Alaoui"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bold transition-all"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Téléphone</label>
            <div className="flex group transition-all">
              <div className="flex items-center bg-gray-100 px-4 border border-transparent rounded-l-xl text-gray-500 font-black text-sm">
                +212
              </div>
              <input
                type="tel"
                required
                className="flex-1 px-4 py-3.5 bg-gray-50 border border-transparent rounded-r-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-black text-gray-900 transition-all"
                placeholder="600000000"
                value={phoneSuffix}
                onChange={handlePhoneChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bold transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Je suis un :</label>
            <select
              name="role"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none font-bold transition-all appearance-none cursor-pointer"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="driver">Conducteur (cherche un parking)</option>
              <option value="owner">Propriétaire (loue son parking)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-primary text-white font-black text-lg rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Création...' : "S'inscrire"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary font-black hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
