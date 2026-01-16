
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useAppContext();
  const featured = products.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover" 
            alt="Hero background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Elevate Your <span className="text-blue-400">Lifestyle</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Discover our curated collection of premium essentials designed for modern living. Quality meets minimalism in every piece.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
              >
                Shop Collection
              </Link>
              <Link 
                to="/products" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <ShieldCheck className="h-8 w-8 text-blue-600" />, title: "Secure Payment", desc: "100% encrypted" },
          { icon: <Truck className="h-8 w-8 text-blue-600" />, title: "Fast Delivery", desc: "2-3 business days" },
          { icon: <RotateCcw className="h-8 w-8 text-blue-600" />, title: "Easy Returns", desc: "30-day window" },
          { icon: <CreditCard className="h-8 w-8 text-blue-600" />, title: "Installment", desc: "0% EMI plans" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {item.icon}
            <h3 className="mt-4 font-bold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Most Popular</h2>
            <p className="text-gray-500 dark:text-gray-400">Our best-selling items this month</p>
          </div>
          <Link to="/products" className="text-blue-600 font-semibold flex items-center hover:underline">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Subscribe to our newsletter and receive exclusive offers, early access to new arrivals, and lifestyle inspiration.</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
