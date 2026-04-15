import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Shield, Zap, Clock, Star, ArrowRight, Play } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?city=${city}`);
  };

  const popularCities = [
    { name: 'Casablanca', img: 'https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&q=80', count: 124 },
    { name: 'Rabat', img: 'https://images.unsplash.com/photo-1574187010467-334346e4575f?auto=format&fit=crop&q=80', count: 86 },
    { name: 'Marrakech', img: 'https://images.unsplash.com/photo-1597212618440-8062a284ef43?auto=format&fit=crop&q=80', count: 95 },
    { name: 'Tanger', img: 'https://images.unsplash.com/photo-1563884391307-2856f62b489d?auto=format&fit=crop&q=80', count: 54 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center px-4 overflow-hidden bg-gray-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero background"
        />
        <div className="relative z-10 w-full max-w-5xl text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight"
          >
            Garez-vous sans <br /> <span className="text-primary">stress</span> au Maroc
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium"
          >
            Réservez votre place de parking en quelques secondes parmi plus de 500 emplacements vérifiés.
          </motion.p>

          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSearch}
            className="bg-white p-3 rounded-[32px] md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto"
          >
            <div className="flex-1 flex items-center gap-3 px-6 w-full">
              <MapPin className="text-primary shrink-0" size={24} />
              <input
                type="text"
                placeholder="Quelle ville ? (Casablanca, Rabat...)"
                className="w-full py-4 text-lg font-bold text-gray-900 placeholder-gray-400 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>
            <div className="flex-1 flex items-center gap-3 px-6 w-full">
              <Clock className="text-gray-400 shrink-0" size={24} />
              <span className="text-lg font-bold text-gray-400">Maintenant</span>
            </div>
            <Button type="submit" size="lg" className="rounded-full w-full md:w-auto px-10">
              <Search className="mr-2" size={20} />
              Chercher
            </Button>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            <div className="flex items-center gap-2 text-white/90 font-bold">
              <Shield className="text-primary" size={20} />
              Paiement Sécurisé
            </div>
            <div className="flex items-center gap-2 text-white/90 font-bold">
              <Star className="text-primary fill-primary" size={20} />
              Parkings Vérifiés
            </div>
            <div className="flex items-center gap-2 text-white/90 font-bold">
              <Zap className="text-primary" size={20} />
              Accès Instantané
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-2">Villes populaires</h2>
            <p className="text-gray-500 font-medium text-lg">Découvrez les meilleurs spots dans tout le Maroc</p>
          </motion.div>
          <button className="hidden md:flex items-center gap-2 font-black text-primary hover:gap-3 transition-all">
            Voir tout <ArrowRight size={20} />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {popularCities.map((city) => (
            <motion.div
              key={city.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative h-80 rounded-[32px] overflow-hidden cursor-pointer shadow-xl"
              onClick={() => navigate(`/search?city=${city.name}`)}
            >
              <img src={city.img} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-black mb-1">{city.name}</h3>
                <p className="text-white/80 font-bold text-sm">{city.count} places disponibles</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-gray-500 text-lg font-medium">Réserver une place n'a jamais été aussi simple</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: '01',
                title: 'Recherchez',
                desc: 'Trouvez le parking idéal à proximité de votre destination.',
                icon: Search,
                bg: 'bg-blue-50 text-blue-600'
              },
              {
                step: '02',
                title: 'Réservez',
                desc: 'Choisissez votre créneau et payez en toute sécurité.',
                icon: Clock,
                bg: 'bg-purple-50 text-purple-600'
              },
              {
                step: '03',
                title: 'Garez-vous',
                desc: 'Accédez au parking avec votre QR code et profitez.',
                icon: Zap,
                bg: 'bg-orange-50 text-orange-600'
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center group"
              >
                <div className={`w-24 h-24 ${item.bg} rounded-[32px] flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-6 shadow-sm`}>
                  <item.icon size={40} />
                </div>
                <span className="text-6xl font-black text-gray-100 absolute -top-4 left-1/2 -translate-x-1/2 -z-10">{item.step}</span>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Owner CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-[48px] overflow-hidden relative p-12 md:p-24 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="relative z-10 flex-1">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Gagnez de l'argent avec <br /> votre place de parking
            </h2>
            <p className="text-xl text-gray-400 mb-10 font-medium">
              Rejoignez des milliers de propriétaires au Maroc et commencez à générer des revenus passifs dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-10">Devenir Propriétaire</Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                <Play className="mr-2" size={20} /> En savoir plus
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-primary/20 absolute inset-0 blur-3xl rounded-full"></div>
            <motion.img
              whileHover={{ rotate: 0, scale: 1.05 }}
              src="https://images.unsplash.com/photo-1590674867551-11c3a2df5bb8?auto=format&fit=crop&q=80"
              className="relative z-10 rounded-3xl shadow-2xl rotate-3 transition-all duration-500"
              alt="Owner"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
