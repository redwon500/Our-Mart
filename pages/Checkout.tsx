
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { PaymentMethod, PaymentStatus, OrderStatus } from '../types';
import { ShieldCheck, MapPin, CreditCard, ChevronRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, clearCart, user, addOrder } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(user?.addresses[0] || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);

  const subtotal = cart.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total,
      status: OrderStatus.PENDING,
      paymentMethod,
      paymentStatus: paymentMethod === PaymentMethod.COD ? PaymentStatus.UNPAID : PaymentStatus.PAID,
      address,
      date: new Date().toLocaleDateString()
    };
    addOrder(newOrder);
    clearCart();
    navigate('/profile');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="bg-blue-600 text-white px-8 py-3 rounded-full">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center space-x-4 mb-12">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>1</div>
          <span className="font-semibold">Shipping</span>
        </div>
        <ChevronRight className="text-gray-300" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>2</div>
          <span className="font-semibold">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {step === 1 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-8">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold dark:text-white">Delivery Address</h2>
              </div>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none h-32"
              />
              <button 
                onClick={() => setStep(2)}
                disabled={!address}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-full font-bold transition-colors disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-8">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold dark:text-white">Payment Method</h2>
              </div>
              <div className="space-y-4">
                {[PaymentMethod.BKASH, PaymentMethod.NAGAD, PaymentMethod.ROCKET, PaymentMethod.CARD, PaymentMethod.COD].map(method => (
                  <label key={method} className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-100 dark:border-gray-700'}`}>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === method} 
                        onChange={() => setPaymentMethod(method)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-bold text-gray-900 dark:text-white">{method}</span>
                    </div>
                    {/* Add small icons for payment providers here if needed */}
                  </label>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-gray-200 dark:border-gray-700 rounded-full font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-900 dark:text-white">x{item.quantity}</span>
                    <span className="text-gray-600 dark:text-gray-400 line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-medium dark:text-white">${(item.discountPrice || item.price) * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Your data is secured with industry-standard TLS encryption. We do not store full credit card numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
