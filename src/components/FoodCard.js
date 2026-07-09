'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function FoodCard({ food }) {
  const { addItem } = useCart();

  return (
    <div className="card group flex flex-col">
      <Link href={`/foods/${food.id}`} className="relative h-40 overflow-hidden block">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/foods/${food.id}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600">{food.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{food.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-brand-600">${Number(food.price).toFixed(2)}</span>
          <button onClick={() => addItem(food)} className="btn-primary py-1.5 px-3 text-sm">
            <i className="fa-solid fa-plus" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
