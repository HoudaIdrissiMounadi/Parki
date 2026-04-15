import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuthStore from '../store/authStore';
import Skeleton from '../components/Skeleton';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Search = lazy(() => import('../pages/Search'));
const ParkingDetails = lazy(() => import('../pages/ParkingDetails'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const PageLoader = () => (
  <div className="p-8 max-w-7xl mx-auto">
    <Skeleton className="h-[500px] w-full rounded-3xl" />
  </div>
);

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/parking/:id" element={<ParkingDetails />} />
            <Route path="/checkout/:id" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default AppRouter;
