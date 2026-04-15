import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Search as SearchIcon, MapPin, Navigation, Inbox, Map as MapIcon, List as ListIcon } from 'lucide-react';
import ParkingCard from '../components/ParkingCard';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarker = (status) => {
  const color = status === 'available' ? '#10b981' : status === 'limited' ? '#f59e0b' : '#ef4444';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

const Search = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [mapCenter, setMapCenter] = useState([33.5731, -7.5898]);
  const [highlightedId, setHighlightedId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map' for mobile

  const fetchParkings = async (searchCity = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/parkings`, { params: { city: searchCity } });
      setParkings(response.data.data);
      if (response.data.data.length > 0 && searchCity) {
        const first = response.data.data[0];
        setMapCenter([first.location.coordinates[1], first.location.coordinates[0]]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParkings(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchParkings(city);
    if (window.innerWidth < 1024) setViewMode('list');
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/parkings/nearby`, { params: { lat: latitude, lng: longitude } });
          setParkings(response.data.data);
          setViewMode('map');
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden relative">
      {/* Sidebar - Hidden on mobile if map view is active */}
      <div className={`w-full lg:w-[450px] flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        viewMode === 'map' ? 'hidden lg:flex' : 'flex'
      }`}>
        <div className="p-4 border-b border-gray-100">
          <form onSubmit={handleSearch} className="relative mb-4">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Casablanca, Rabat, Marrakech..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm md:text-base"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </form>
          <div className="flex gap-2">
            <button onClick={locateMe} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold active:scale-95 transition-transform">
              <Navigation size={16} /> Me localiser
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
          {loading ? (
            Array(3).fill(0).map((_, i) => <div key={i} className="space-y-3"><Skeleton className="h-48 w-full rounded-2xl" /><Skeleton className="h-4 w-3/4" /></div>)
          ) : parkings.length > 0 ? (
            <>
              <h2 className="text-lg font-black text-gray-900">{parkings.length} parkings trouvés</h2>
              {parkings.map((p) => (
                <div key={p._id} onMouseEnter={() => setHighlightedId(p._id)} onMouseLeave={() => setHighlightedId(null)}>
                  <ParkingCard parking={p} isHighlighted={highlightedId === p._id} />
                </div>
              ))}
            </>
          ) : (
            <EmptyState
              title="Aucun résultat"
              description="Nous n'avons pas trouvé de parking correspondant à votre recherche."
              icon={Inbox}
              actionLabel="Voir tout"
              onAction={() => { setCity(''); fetchParkings(''); }}
            />
          )}
        </div>
      </div>

      {/* Map - Hidden on mobile if list view is active */}
      <div className={`flex-1 relative bg-gray-200 z-10 ${
        viewMode === 'list' ? 'hidden lg:block' : 'block'
      }`}>
        <MapContainer center={mapCenter} zoom={13} className="h-full w-full">
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeView center={mapCenter} />
          {parkings.map((p) => (
            <Marker key={p._id} position={[p.location.coordinates[1], p.location.coordinates[0]]} icon={customMarker(p.status)}>
              <Popup>
                <div className="w-48 overflow-hidden rounded-xl">
                  <img src={p.images[0]} alt="" className="w-full h-24 object-cover" />
                  <div className="p-3 bg-white">
                    <h4 className="font-bold text-gray-900 truncate">{p.title}</h4>
                    <p className="text-primary font-black mt-1">{p.pricePerHour} MAD/h</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="bg-gray-900 text-white px-6 py-3.5 rounded-full font-black shadow-2xl flex items-center gap-2 active:scale-95 transition-transform"
        >
          {viewMode === 'list' ? <><MapIcon size={20} /> Carte</> : <><ListIcon size={20} /> Liste</>}
        </button>
      </div>
    </div>
  );
};

export default Search;
