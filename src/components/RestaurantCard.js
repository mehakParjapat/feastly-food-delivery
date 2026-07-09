import Link from 'next/link';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="card group block">
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700">
          <i className="fa-solid fa-star text-yellow-500 mr-1" />
          {Number(restaurant.rating).toFixed(1)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 group-hover:text-brand-600">{restaurant.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span><i className="fa-regular fa-clock mr-1" />{restaurant.deliveryTime || '30-40 min'}</span>
          <span><i className="fa-solid fa-truck mr-1" />${Number(restaurant.deliveryFee).toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
