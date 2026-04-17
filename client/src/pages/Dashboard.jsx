import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';
import {
  LayoutDashboard, Wallet, Calendar, Car, ArrowUpRight, TrendingUp, User, MapPin
} from 'lucide-react';
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

  // Process data for BarChart (Bookings per Parking)
  const bookingsPerParking = bookings.reduce((acc, curr) => {
    const name = curr.parking.title;
    const existing = acc.find(item => item.name === name);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name, count: 1 });
    }
    return acc;
  }, []).slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">
            <ArrowUpRight size={14} />
            {trend}%
          </div>
        )}
      </div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-orange-100 text-orange-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 font-medium tracking-tight">Gérez vos revenus et vos réservations en temps réel.</p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenu Total" value={`${stats?.totalRevenue || 0} MAD`} icon={Wallet} color="bg-blue-500" trend={12} />
        <StatCard title="Réservations" value={stats?.totalBookings || 0} icon={Calendar} color="bg-purple-500" trend={8} />
        <StatCard title="Mes Parkings" value={stats?.totalParkings || 0} icon={Car} color="bg-orange-500" />
        <StatCard title="Taux d'occupation" value="78%" icon={TrendingUp} color="bg-green-500" trend={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-8">Analyse des revenus (MAD)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueStats || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1A56DB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  itemStyle={{fontWeight: '900', color: '#1A56DB'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1A56DB" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings per Parking Chart */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-8">Réservations par parking</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsPerParking} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="count" fill="#1A56DB" radius={[0, 10, 10, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings List */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Dernières réservations</h3>
          <button className="text-primary font-black text-sm hover:underline">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Parking</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Prix</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                        <User size={18} />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">Ahmed Alaoui</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="font-bold text-sm">{booking.parking.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-gray-500">
                      {new Date(booking.startTime).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">{booking.totalPrice} MAD</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <StatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
