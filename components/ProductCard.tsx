
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../store/AppContext';
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface Props {
  product: Product;
  view?: 'grid' | 'list';
}

const ProductCard: React.FC<Props> = ({ product, view = 'grid' }) => {
  const { addToCart, toggleWishlist, wishlist } = useAppContext();
  const isWishlisted = wishlist.some(p => p.id === product.id);

  if (view === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row group border border-gray-100 dark:border-gray-700">
        <Link to={`/product/${product.id}`} className="sm:w-48 h-48 sm:h-auto overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">{product.category}</span>
              <div className="flex items-center text-yellow-400 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium text-gray-600 dark:text-gray-300">{product.rating}</span>
              </div>
            </div>
            <Link to={`/product/${product.id}`} className="block mt-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
              {product.name}
            </Link>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.discountPrice || product.price}</span>
              {product.discountPrice && <span className="text-sm text-gray-400 line-through">${product.price}</span>}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-2 rounded-full border transition-colors ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => addToCart(product)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </Link>
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 p-2.5 rounded-full glass-morphism shadow-sm transition-all transform hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        {product.discountPrice && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">{product.category}</span>
          <div className="flex items-center text-yellow-400 text-xs">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-gray-600 dark:text-gray-400 font-medium">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block text-base font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">${product.discountPrice || product.price}</span>
            {product.discountPrice && <span className="text-xs text-gray-400 line-through">${product.price}</span>}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm hover:shadow-blue-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
