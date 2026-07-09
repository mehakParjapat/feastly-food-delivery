'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function CheckoutInner() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    deliveryName: user?.name || '',
    deliveryPhone: user?.phone || '',
    deliveryAddress: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const placeOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setError('');
    setLoading(true);
    try {
      const payload = {
        restaurantId: items[0]?.restaurantId || null,
        deliveryName: form.deliveryName,
        deliveryPhone: form.deliveryPhone,
        deliveryAddress: form.deliveryAddress,
        notes: form.notes,
        items: items.map((i) => ({ foodId: i.foodId, quantity: i.quantity, price: i.price })),
      };
      const res = await api.post('orders', payload);
      clear();
      router.push(`/orders/${res.data.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6 space-y-4">
          <h3 className="font-bold text-lg">Delivery Information</h3>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
              <i className="fa-solid fa-circle-exclamation mr-2" />{error}
            </div>
          )}
          <div>
            <label className="label">Full Name</label>
            <input className="input" required value={form.deliveryName} onChange={(e) => setForm({ ...form, deliveryName: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" required value={form.deliveryPhone} onChange={(e) => setForm({ ...form, deliveryPhone: e.target.value })} />
          </div>
          <div>
            <label className="label">Delivery Address</label>
            <textarea className="input" rows={3} required value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} placeholder="Street, city, apartment..." />
          </div>
          <div>
            <label className="label">Order Notes (optional)</label>
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions?" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 max-h-52 overflow-y-auto mb-3">
              {items.map((i) => (
                <div key={i.foodId} className="flex justify-between text-sm">
                  <span className="text-gray-600">{i.quantity}× {i.name}</span>
                  <span className="font-medium">${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span className="text-brand-600">${total.toFixed(2)}</span></div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <i className="fa-solid fa-spinner fa-spin" /> : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutInner />
    </ProtectedRoute>
  );
}
