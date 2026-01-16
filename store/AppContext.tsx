
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Notification, Review } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  markNotificationRead: (id: string) => void;
  reviews: Review[];
  addReview: (review: Review) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cart logic
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    addNotification({
      id: Date.now().toString(),
      title: 'Added to Cart',
      message: `${product.name} has been added to your shopping cart.`,
      date: new Date().toLocaleString(),
      read: false,
      type: 'system'
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  // Wishlist logic
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  // Order logic
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    addNotification({
      id: Date.now().toString(),
      title: 'Order Placed',
      message: `Your order #${order.id.slice(-6)} has been placed successfully.`,
      date: new Date().toLocaleString(),
      read: false,
      type: 'order'
    });
  };

  // Notification logic
  const addNotification = (notif: Notification) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Review logic
  const addReview = (review: Review) => {
    setReviews(prev => [...prev, review]);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      wishlist, toggleWishlist,
      user, setUser,
      orders, addOrder,
      notifications, addNotification, markNotificationRead,
      reviews, addReview,
      searchQuery, setSearchQuery,
      isDarkMode, toggleDarkMode
    }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
