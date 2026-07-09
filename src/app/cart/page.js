'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import CartSummary from '../../components/CartSummary';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="h-20 w-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-400 mb-5">
          <i className="fa-solid fa-cart-shopping" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Add some delicious dishes to get started.</p>
        <Link href="/restaurants" className="btn-primary mt-6 inline-flex">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.foodId} className="card p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-brand-600 font-bold mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => updateQty(item.foodId, item.quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:text-brand-600">
                  <i className="fa-solid fa-minus text-xs" />
                </button>
                <span className="px-3 font-semibold">{item.quantity}</span>
                <button onClick={() => updateQty(item.foodId, item.quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:text-brand-600">
                  <i className="fa-solid fa-plus text-xs" />
                </button>
              </div>
              <div className="text-right w-20">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.foodId)} className="text-red-500 text-sm mt-1 hover:text-red-600">
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
