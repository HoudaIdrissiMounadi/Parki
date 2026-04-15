import React, { useState } from 'react';
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

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      toast.success(result.message);
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 bg-gray-50 py-12">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 bg-blue-100 rounded-full text-primary">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-600 text-center mt-2">Rejoignez la communauté Parki au Maroc</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Ex: Ahmed Alaoui"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (Format Maroc)</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="+212600000000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Je suis un :</label>
            <select
              name="role"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
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
            className="w-full py-4 mt-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Création...' : "S'inscrire"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
