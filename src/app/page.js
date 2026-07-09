'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';
import Loading from '../components/Loading';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      api.get('restaurants?limit=6'),
      api.get('foods/popular'),
      api.get('categories'),
    ])
      .then(([r, f, c]) => {
        setRestaurants(r.data.data.items);
        setFoods(f.data.data);
        setCategories(c.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    router.push(`/restaurants?search=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Craving something delicious?
            </h1>
            <p className="mt-4 text-brand-50 text-lg">
              Order from the best local restaurants with fast delivery to your door.
            </p>
            <form onSubmit={onSearch} className="mt-8 flex gap-2 bg-white rounded-xl p-2 max-w-md">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurants or dishes..."
                className="flex-1 px-4 text-gray-800 outline-none"
              />
              <button type="submit" className="btn-primary">
                <i className="fa-solid fa-magnifying-glass" /> Search
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
              alt="Delicious food"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <section className="py-14">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/restaurants`}
                  className="card p-4 flex flex-col items-center text-center hover:shadow-md transition"
                >
                  <img src={c.image} alt={c.name} className="h-16 w-16 rounded-full object-cover mb-2" />
                  <span className="text-sm font-medium">{c.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Restaurants</h2>
              <Link href="/restaurants" className="text-brand-600 font-medium text-sm hover:underline">
                View all <i className="fa-solid fa-arrow-right ml-1" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </section>

          <section className="py-14">
            <h2 className="text-2xl font-bold mb-6">Popular Dishes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {foods.map((f) => (
                <FoodCard key={f.id} food={f} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
