import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { LayoutDashboard, Wallet, Calendar, Car, ArrowUpRight, TrendingUp } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Skeleton from '../components/Skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.token) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [statsRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/stats/owner`, config),
          axios.get(`${API_URL}/bookings/my`, config)
        ]);
        setStats(statsRes.data.data);
        setBookings(bookingsRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.token]);

  if (loading) return <div className="p-8"><Skeleton className="h-[600px] w-full rounded-3xl" /></div>;

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-10">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Revenu Total" value={`${stats?.totalRevenue || 0} MAD`} icon={Wallet} color="bg-blue-500" />
        <StatCard title="Réservations" value={stats?.totalBookings || 0} icon={Calendar} color="bg-purple-500" />
        <StatCard title="Mes Parkings" value={stats?.totalParkings || 0} icon={Car} color="bg-orange-500" />
      </div>
    </div>
  );
};

export default Dashboard;
