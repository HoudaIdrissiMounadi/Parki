import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Shield, Zap, Camera } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ParkingCard = ({ parking, isHighlighted }) => {
  const { _id, title, address, pricePerHour, images, averageRating, numReviews, features, status } = parking;

  const statusColors = {
    available: 'bg-green-100 text-green-700',
    limited: 'bg-orange-100 text-orange-700',
    full: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    available: 'Disponible',
    limited: 'Limité',
    full: 'Complet',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/parking/${_id}`}
        className={cn(
          "group block bg-white rounded-2xl overflow-hidden transition-all duration-300",
          "border border-transparent hover:border-primary/20",
          "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
          isHighlighted && "ring-2 ring-primary border-transparent"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={images?.[0] || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-primary font-bold text-lg">{pricePerHour} MAD</span>
            <span className="text-gray-500 text-sm font-medium">/h</span>
          </div>
          <div className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider",
            statusColors[status] || 'bg-gray-100'
          )}>
            {statusLabels[status]}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold">{averageRating || '5.0'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
            <MapPin size={14} />
            <span className="truncate">{address}</span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            {features?.includes('camera') && <Camera size={16} className="text-gray-400" />}
            {features?.includes('guarded') && <Shield size={16} className="text-gray-400" />}
            {features?.includes('24/7') && <Zap size={16} className="text-gray-400" />}
            <span className="text-xs text-gray-400 ml-auto">{numReviews} avis</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ParkingCard;
