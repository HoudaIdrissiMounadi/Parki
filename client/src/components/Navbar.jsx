import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Car } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-[1001] w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Park<span className="text-primary">i</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/search" className="font-bold text-gray-600 hover:text-primary transition-colors">Explorer</Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-2 font-bold text-gray-600 hover:text-primary transition-colors">
                <LayoutDashboard size={18} />
                Tableau de bord
              </Link>
              <div className="h-8 w-[1px] bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-primary/10" />
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-bold text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors">Connexion</Link>
              <Link to="/register" className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-900">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-4 shadow-xl space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/search" className="block p-4 font-bold text-gray-900 bg-gray-50 rounded-2xl" onClick={() => setIsOpen(false)}>Explorer</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block p-4 font-bold text-gray-900 bg-gray-50 rounded-2xl" onClick={() => setIsOpen(false)}>Tableau de bord</Link>
              <button onClick={handleLogout} className="w-full text-left p-4 font-bold text-red-500 bg-red-50 rounded-2xl">Déconnexion</button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Link to="/login" className="p-4 text-center font-bold text-gray-900 bg-gray-100 rounded-2xl" onClick={() => setIsOpen(false)}>Connexion</Link>
              <Link to="/register" className="p-4 text-center font-bold text-white bg-primary rounded-2xl" onClick={() => setIsOpen(false)}>S'inscrire</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
