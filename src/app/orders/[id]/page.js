'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';
import api from '../../../services/api';
import Loading from '../../../components/Loading';
import OrderTracker from '../../../components/OrderTracker';

function OrderDetailsInner() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`orders/${id}`).then((r) => setOrder(r.data.data)).catch(() => setOrder(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return <div className="text-center py-20 text-gray-500">Order not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/orders" className="text-sm text-gray-500 mb-6 inline-block hover:text-brand-600">
        <i className="fa-solid fa-arrow-left mr-2" />Back to orders
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-8">
        <OrderTracker status={order.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-bold text-lg mb-4">Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.food?.image} alt={item.food?.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.food?.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Delivery</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><i className="fa-solid fa-user mr-2 text-gray-400" />{order.deliveryName}</p>
              <p><i className="fa-solid fa-phone mr-2 text-gray-400" />{order.deliveryPhone}</p>
              <p><i className="fa-solid fa-location-dot mr-2 text-gray-400" />{order.deliveryAddress}</p>
              {order.notes && <p><i className="fa-solid fa-note-sticky mr-2 text-gray-400" />{order.notes}</p>}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Payment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span>${Number(order.deliveryFee).toFixed(2)}</span></div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base"><span>Total</span><span className="text-brand-600">${Number(order.total).toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <ProtectedRoute>
      <OrderDetailsInner />
    </ProtectedRoute>
  );
}
