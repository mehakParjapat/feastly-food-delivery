'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../services/api';
import FoodCard from '../../../components/FoodCard';
import Loading from '../../../components/Loading';

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api
      .get(`restaurants/${id}`)
      .then((r) => setRestaurant(r.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!restaurant) return <div className="text-center py-20 text-gray-500">Restaurant not found.</div>;

  const categories = ['All', ...new Set(restaurant.foods.map((f) => f.category?.name).filter(Boolean))];
  const foods =
    activeCategory === 'All'
      ? restaurant.foods
      : restaurant.foods.filter((f) => f.category?.name === activeCategory);

  return (
    <div>
      <div className="relative h-64 md:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 py-6 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold">{restaurant.name}</h1>
          <p className="mt-1 text-gray-200">{restaurant.cuisine}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span><i className="fa-solid fa-star text-yellow-400 mr-1" />{Number(restaurant.rating).toFixed(1)}</span>
            <span><i className="fa-regular fa-clock mr-1" />{restaurant.deliveryTime || '30-40 min'}</span>
            <span><i className="fa-solid fa-truck mr-1" />${Number(restaurant.deliveryFee).toFixed(2)} delivery</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600 mb-6 max-w-3xl">{restaurant.description}</p>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategory === c
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {foods.length === 0 ? (
          <p className="text-gray-500 py-10 text-center">No dishes in this category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.map((f) => (
              <FoodCard key={f.id} food={{ ...f, restaurantId: restaurant.id }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
