'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import api from '../../services/api';
import Loading from '../../components/Loading';

const STATUS_STYLES = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-orange-100 text-orange-700',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
};

function OrdersInner() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('orders').then((r) => setOrders(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="h-20 w-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-400 mb-5">
          <i className="fa-solid fa-receipt" />
        </div>
        <h1 className="text-2xl font-bold">No orders yet</h1>
        <p className="text-gray-500 mt-2">Your order history will appear here.</p>
        <Link href="/restaurants" className="btn-primary mt-6 inline-flex">Start Ordering</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`} className="card p-5 flex items-center justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold">Order #{order.id}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-700'}`}>
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {order.restaurant?.name || 'Feastly'} • {order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-600">${Number(order.total).toFixed(2)}</p>
              <span className="text-sm text-gray-400">View <i className="fa-solid fa-arrow-right ml-1" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersInner />
    </ProtectedRoute>
  );
}
