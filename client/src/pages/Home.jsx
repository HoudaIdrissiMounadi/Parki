import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Shield, Zap, Clock, Star, ArrowRight, Play, Car } from 'lucide-react';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import PersonParking from '../components/illustrations/PersonParking';
import PersonCar from '../components/illustrations/PersonCar';

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [heroText, setHeroText] = useState('stress');

  useEffect(() => {
    const timer = setTimeout(() => setHeroText('facilement'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?city=${city}&datetime=${dateTime}`);
  };

  const popularCities = [
    { name: 'Casablanca', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Casablanca_Hassan_II_mosque.jpg/1280px-Casablanca_Hassan_II_mosque.jpg', count: 124 },
    { name: 'Rabat', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rabat_Hassan_Tower.jpg/1280px-Rabat_Hassan_Tower.jpg', count: 86 },
    { name: 'Marrakech', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Marrakesch_Djemaa_el_Fna_Markt_1.jpg/1280px-Marrakesch_Djemaa_el_Fna_Markt_1.jpg', count: 95 },
    { name: 'Tanger', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Tangiers_harbour_1.jpg/1280px-Tangiers_harbour_1.jpg', count: 54 },
  ];

  return (
    <div className="space-y-32 pb-32 overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 bg-white">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 w-full max-w-6xl text-center">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-8">
            <Car size={14} /> Nouveau : Paiement à la sortie
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            Garez-vous sans <br />
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={heroText === 'stress' ? 'line-through decoration-primary decoration-8 text-gray-300' : 'text-primary'}
                >
                  {heroText}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <form onSubmit={handleSearch} className="bg-white p-2 rounded-[32px] border-2 border-gray-900 shadow-[8px_8px_0_0_#0F0F0F] flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto mb-16 mt-12 transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0_0_#0F0F0F]">
            <div className="flex-[1.5] flex items-center gap-3 px-6 w-full">
              <MapPin className="text-gray-900" size={24} />
              <input type="text" placeholder="Quelle ville ? (Casablanca, Rabat...)" className="w-full py-5 text-xl font-black text-gray-900 placeholder-gray-300 outline-none" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div className="h-12 w-[2px] bg-gray-900 hidden md:block"></div>
            <div className="flex-1 flex items-center gap-3 px-6 w-full">
              <Clock className="text-gray-900" size={24} />
              <input type="datetime-local" className="w-full py-5 text-lg font-black text-gray-900 outline-none bg-transparent cursor-pointer" value={dateTime} onChange={e => setDateTime(e.target.value)} />
            </div>
            <Button type="submit" size="lg" className="rounded-[24px] w-full md:w-auto px-12 bg-gray-900 text-white hover:bg-black">
              Chercher
            </Button>
          </form>
        </div>

        <PersonParking className="absolute bottom-10 right-10 hidden xl:block z-20" />
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Villes populaires</h2>
            <p className="text-gray-400 font-bold text-xl mt-2 italic">Les meilleurs spots du Royaume</p>
          </div>
          <button onClick={() => navigate('/search')} className="group flex items-center gap-3 font-black text-gray-900 text-lg hover:gap-5 transition-all underline decoration-4 underline-offset-8 decoration-primary/30">
            Voir tout <ArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularCities.map((city) => (
            <motion.div
              key={city.name}
              whileHover={{ scale: 0.98, rotate: -1 }}
              onClick={() => navigate(`/search?city=${city.name}`)}
              className="group relative h-[450px] rounded-[40px] overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-900 transition-all shadow-xl"
            >
              <img
                src={city.img}
                alt={city.name}
                onError={(e) => { e.target.style.display='none'; }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-black mb-1">{city.name}</h3>
                <p className="text-gray-300 font-black text-xs uppercase tracking-widest">{city.count} places</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works - Black Theme */}
      <section id="how-it-works" className="bg-gray-900 py-32 -mx-4 px-4 overflow-hidden rounded-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">Simple comme bonjour.</h2>
            <p className="text-gray-400 text-xl font-bold italic">Réservation instantanée sans ticket papier</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Recherchez', desc: 'Trouvez un parking vérifié à Casablanca, Rabat ou Marrakech.', icon: Search },
              { step: '02', title: 'Réservez', desc: 'Choisissez votre créneau et payez par carte sécurisée.', icon: Clock },
              { step: '03', title: 'Garez-vous', desc: 'Entrez avec votre plaque détectée par nos caméras.', icon: Zap },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="relative p-12 bg-white/5 rounded-[40px] border border-white/10 group hover:bg-white/10 transition-colors">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-white opacity-[0.05] group-hover:opacity-10 transition-opacity leading-none select-none">{item.step}</span>
                <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Owner CTA - Sketch Style */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-50 rounded-[60px] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 border-2 border-gray-900 shadow-[16px_16px_0_0_#0F0F0F]">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              Gagnez de l'argent avec <br /> votre place.
            </h2>
            <p className="text-xl text-gray-500 font-bold max-w-lg italic">
              Rejoignez les 500+ propriétaires qui font confiance à Parki pour rentabiliser leur garage ou parking sous-sol.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button size="lg" onClick={() => navigate('/register?role=owner')} className="bg-gray-900 text-white rounded-[24px] px-12 h-20 text-xl">Devenir Propriétaire</Button>
              <Button variant="ghost" size="lg" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="text-gray-900 font-black h-20 px-8">En savoir plus</Button>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full"></div>
            <PersonCar className="relative z-10 scale-125" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
