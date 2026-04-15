import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, Shield, Star, Camera, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import Skeleton from '../components/Skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState({ date: new Date().toISOString().split('T')[0], startTime: '09:00', duration: 1 });

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const response = await axios.get(`${API_URL}/parkings/${id}`);
        setParking(response.data.data);
      } catch (error) {
        toast.error('Parking non trouvé');
        navigate('/search');
      } finally {
        setLoading(false);
      }
    };
    fetchParking();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour réserver');
      navigate('/login');
      return;
    }
    setBookingLoading(true);
    try {
      const start = new Date(`${bookingData.date}T${bookingData.startTime}`);
      const end = new Date(start.getTime() + bookingData.duration * 60 * 60 * 1000);
      const response = await axios.post(`${API_URL}/bookings`, { parkingId: id, startTime: start, endTime: end }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Réservation créée !');
      navigate(`/checkout/${response.data.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8"><Skeleton className="h-96 w-full rounded-2xl" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{parking.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <img src={parking.images?.[0] || 'https://via.placeholder.com/800x450'} alt="" className="w-full rounded-3xl shadow-lg mb-8" />
          <p className="text-gray-600 text-lg leading-relaxed">{parking.description}</p>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-gray-100 shadow-2xl rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-8">{parking.pricePerHour} MAD / h</h3>
            <button onClick={handleBooking} disabled={bookingLoading} className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50">
              {bookingLoading ? 'Réservation...' : 'Réserver maintenant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetails;
