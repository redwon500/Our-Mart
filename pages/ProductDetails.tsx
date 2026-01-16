
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Product } from '../types';
import { getAIRecommendations } from '../services/geminiService';
import ProductCard from '../components/ProductCard';
import { Star, ShoppingCart, Heart, Shield, RotateCcw, Truck, MessageSquare } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, wishlist, reviews, addReview, user } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImage(found.images[0]);
      
      // Get AI recommendations
      getAIRecommendations(found, products).then(setRecommendations);
    } else {
      navigate('/products');
    }
  }, [id, products, navigate]);

  const handleAddReview = () => {
    if (!product) return;
    addReview({
      id: Date.now().toString(),
      productId: product.id,
      userName: user?.name || 'Guest User',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    });
    setNewReview({ rating: 5, comment: '' });
  };

  if (!product) return null;

  const productReviews = reviews.filter(r => r.productId === product.id);
  const isWishlisted = wishlist.some(p => p.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-blue-600' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`${product.name} thumbnail`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold uppercase tracking-widest mb-2">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.subCategory}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-400 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <button className="text-gray-500 hover:text-blue-600 text-sm font-medium">{product.reviewCount} Reviews</button>
            </div>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-xl text-gray-400 line-through">${product.price}</span>
            )}
            <span className={`text-sm px-3 py-1 rounded-full font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
            </span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 py-6 border-y border-gray-100 dark:border-gray-800">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-2xl font-bold px-3 text-gray-500 hover:text-gray-900">-</button>
              <span className="w-8 text-center font-bold text-lg dark:text-white">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-2xl font-bold px-3 text-gray-500 hover:text-gray-900">+</button>
            </div>
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-full font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Add to Cart</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`h-14 w-14 rounded-full border flex items-center justify-center transition-colors ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700'}`}
            >
              <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><Truck className="h-5 w-5 text-blue-600" /></div>
              <div><h4 className="font-bold text-sm dark:text-white">Free Delivery</h4><p className="text-xs text-gray-500">Orders over $500</p></div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><RotateCcw className="h-5 w-5 text-blue-600" /></div>
              <div><h4 className="font-bold text-sm dark:text-white">Returns</h4><p className="text-xs text-gray-500">30 days easy returns</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-24">
        <div className="border-t border-gray-100 dark:border-gray-800 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <span className="ml-2 font-bold text-gray-900 dark:text-white">4.8 out of 5</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full max-w-md">
              <h3 className="font-bold mb-4 dark:text-white">Write a Review</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className={`${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this product..."
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
                <button 
                  onClick={handleAddReview}
                  className="bg-gray-900 dark:bg-blue-600 text-white px-8 py-3 rounded-full font-bold w-full hover:bg-gray-800 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {productReviews.length > 0 ? productReviews.map(review => (
              <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold dark:text-white">{review.userName}</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.comment}</p>
              </div>
            )) : (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No reviews yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended for You (AI)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
