
import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { OrderStatus, Product } from '../types';
import { LayoutDashboard, ShoppingBag, Users, Settings, Plus, Trash2, Edit2, Lock, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const Admin: React.FC = () => {
  const { products, setProducts, orders, user } = useAppContext();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authForm, setAuthForm] = useState({ password: '', code: '' });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.password === 'Mugdho' && authForm.code === '8520') {
      setIsAuthorized(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold dark:text-white">Admin Portal</h2>
            <p className="text-gray-500 dark:text-gray-400">Restricted access area</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                value={authForm.password}
                onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security Code</label>
              <input 
                type="text" 
                value={authForm.code}
                onChange={(e) => setAuthForm(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none">
              Verify Identity
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalSales = orders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="md:w-64 space-y-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Products</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          <Clock className="h-5 w-5" />
          <span>Orders</span>
        </button>
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 mt-8">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 px-6 mb-4">System</p>
          <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Users className="h-5 w-5" />
            <span>Manage Users</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 space-y-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 text-sm font-medium mb-1">Total Sales</p>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">${totalSales.toLocaleString()}</h3>
                <div className="mt-4 flex items-center text-green-500 text-sm font-bold">
                  <span>+12.5%</span>
                  <span className="ml-2 font-medium text-gray-400">from last month</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 text-sm font-medium mb-1">Orders</p>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">{orders.length}</h3>
                <div className="mt-4 flex items-center text-blue-500 text-sm font-bold">
                  <span>Active orders</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-500 text-sm font-medium mb-1">Customers</p>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">1,284</h3>
                <div className="mt-4 flex items-center text-green-500 text-sm font-bold">
                  <span>+48 today</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8">
              <h3 className="text-xl font-bold mb-6 dark:text-white">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700 text-sm text-gray-400 uppercase tracking-wider">
                      <th className="py-4">Order ID</th>
                      <th className="py-4">Status</th>
                      <th className="py-4">Total</th>
                      <th className="py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id}>
                        <td className="py-4 font-medium dark:text-white">#{o.id.slice(-6).toUpperCase()}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            o.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                            o.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-4 font-bold dark:text-white">${o.total}</td>
                        <td className="py-4 text-gray-500">{o.date}</td>
                      </tr>
                    ))}
                    {orders.length === 0 && <tr><td colSpan={4} className="py-12 text-center text-gray-400">No orders yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold dark:text-white">Product Inventory</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <img src={p.images[0]} className="h-16 w-16 object-cover rounded-xl" alt={p.name} />
                    <div>
                      <h4 className="font-bold dark:text-white">{p.name}</h4>
                      <p className="text-sm text-gray-500">{p.category} • {p.stock} in stock</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold dark:text-white mr-4">${p.price}</span>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="h-5 w-5" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="h-5 w-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold dark:text-white">Manage Orders</h2>
            <div className="space-y-6">
              {orders.map(o => (
                <div key={o.id} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl font-extrabold dark:text-white">#{o.id.toUpperCase()}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {o.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{o.date} • {o.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black dark:text-white">${o.total}</p>
                      <p className="text-xs font-bold text-blue-600">{o.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-green-100 transition-colors">
                      <CheckCircle className="h-4 w-4" /> <span>Mark Delivered</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-blue-100 transition-colors">
                      <Eye className="h-4 w-4" /> <span>View Details</span>
                    </button>
                    <button className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-bold flex items-center space-x-1 hover:bg-red-100 transition-colors">
                      <XCircle className="h-4 w-4" /> <span>Cancel Order</span>
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div className="text-center py-20 text-gray-400">No orders found.</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
