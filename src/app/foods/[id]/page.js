'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../../services/api';
import Loading from '../../../components/Loading';
import { useCart } from '../../../context/CartContext';

export default function FoodDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api
      .get(`foods/${id}`)
      .then((r) => setFood(r.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!food) return <div className="text-center py-20 text-gray-500">Food not found.</div>;

  const add = () => {
    addItem({ ...food, restaurantId: food.restaurantId }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => router.back()} className="text-sm text-gray-500 mb-6 hover:text-brand-600">
        <i className="fa-solid fa-arrow-left mr-2" />Back
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <img src={food.image} alt={food.name} className="rounded-3xl shadow-lg w-full h-80 object-cover" />
        <div>
          {food.category && (
            <span className="inline-block bg-brand-50 text-brand-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {food.category.name}
            </span>
          )}
          <h1 className="text-3xl font-extrabold">{food.name}</h1>
          {food.restaurant && (
            <Link href={`/restaurants/${food.restaurant.id}`} className="text-brand-600 text-sm hover:underline mt-1 inline-block">
              <i className="fa-solid fa-store mr-1" />{food.restaurant.name}
            </Link>
          )}
          <p className="text-gray-600 mt-4">{food.description}</p>
          <p className="text-3xl font-bold text-brand-600 mt-6">${Number(food.price).toFixed(2)}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-gray-600 hover:text-brand-600">
                <i className="fa-solid fa-minus" />
              </button>
              <span className="px-4 font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-gray-600 hover:text-brand-600">
                <i className="fa-solid fa-plus" />
              </button>
            </div>
            <button onClick={add} className="btn-primary flex-1">
              <i className="fa-solid fa-cart-plus" /> Add to Cart
            </button>
          </div>
          {added && (
            <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mt-4">
              <i className="fa-solid fa-circle-check mr-2" />Added to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
