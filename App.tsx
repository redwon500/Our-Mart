
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

// Placeholder for other pages to keep the code concise
const ProductsPage = () => <div className="max-w-7xl mx-auto p-12"><h1 className="text-4xl font-bold dark:text-white">Our Collection</h1><p className="mt-4 text-gray-500">Coming soon in full detail...</p></div>;
const WishlistPage = () => <div className="max-w-7xl mx-auto p-12 text-center"><h1 className="text-4xl font-bold dark:text-white">Your Wishlist</h1><p className="mt-4 text-gray-500">Save your favorite items here.</p></div>;
const CartPage = () => <div className="max-w-7xl mx-auto p-12"><h1 className="text-4xl font-bold dark:text-white">Shopping Cart</h1><Navigate to="/checkout" /></div>;
const ProfilePage = () => <div className="max-w-7xl mx-auto p-12"><h1 className="text-4xl font-bold dark:text-white">Your Account</h1><p className="mt-4 text-gray-500">Manage your orders and profile details.</p></div>;
const NotificationsPage = () => <div className="max-w-7xl mx-auto p-12"><h1 className="text-4xl font-bold dark:text-white">Notifications</h1><p className="mt-4 text-gray-500">Stay updated with your latest alerts.</p></div>;
const AuthPage = () => <div className="max-w-md mx-auto p-12 bg-white dark:bg-gray-800 rounded-3xl mt-12"><h2 className="text-3xl font-bold mb-6 dark:text-white">Join Luxe</h2><form className="space-y-4"><input className="w-full p-4 border rounded-xl" placeholder="Email or Phone" /><button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Sign In</button></form></div>;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LuxeCommerce</span>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">© 2024 LuxeCommerce. Built for excellence.</p>
              <div className="flex justify-center space-x-6 mt-6">
                <a href="#" className="text-gray-400 hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-600">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-600">Support</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
