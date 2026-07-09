'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '../../services/api';
import RestaurantCard from '../../components/RestaurantCard';
import Loading from '../../components/Loading';

function RestaurantsInner() {
  const params = useSearchParams();
  const [data, setData] = useState({ items: [], totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(params.get('search') || '');
  const [cuisine, setCuisine] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get('cuisines').then((r) => setCuisines(r.data.data)).catch(() => {});
  }, []);

  const fetchData = () => {
    setLoading(true);
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    if (cuisine) q.set('cuisine', cuisine);
    q.set('page', page);
    api
      .get(`restaurants?${q.toString()}`)
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, cuisine]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <form onSubmit={onSearch} className="flex-1 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            placeholder="Search restaurants..."
          />
          <button type="submit" className="btn-primary">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </form>
        <select
          value={cuisine}
          onChange={(e) => { setCuisine(e.target.value); setPage(1); }}
          className="input md:w-56"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : data.items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <i className="fa-solid fa-magnifying-glass text-4xl mb-3" />
          <p>No restaurants found.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-outline py-2 px-3"
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <span className="text-sm text-gray-600">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-outline py-2 px-3"
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RestaurantsInner />
    </Suspense>
  );
}
