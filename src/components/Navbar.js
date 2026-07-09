'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-600">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
            <i className="fa-solid fa-utensils" />
          </span>
          Feastly
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <Link href="/restaurants" className="hover:text-brand-600">Restaurants</Link>
          <Link href="/about" className="hover:text-brand-600">About</Link>
          <Link href="/contact" className="hover:text-brand-600">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-brand-600">
            <i className="fa-solid fa-cart-shopping text-lg" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/orders" className="text-sm font-medium text-gray-700 hover:text-brand-600">
                My Orders
              </Link>
              <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-brand-600">
                {user.name?.split(' ')[0]}
              </Link>
              <button onClick={logout} className="btn-outline py-1.5 px-3 text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="btn-outline py-1.5 px-3 text-sm">Login</Link>
              <Link href="/register" className="btn-primary py-1.5 px-3 text-sm">Sign Up</Link>
            </div>
          )}

          <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen((o) => !o)}>
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 text-sm font-medium">
          <Link href="/" className="block py-1" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/restaurants" className="block py-1" onClick={() => setOpen(false)}>Restaurants</Link>
          <Link href="/about" className="block py-1" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className="block py-1" onClick={() => setOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link href="/orders" className="block py-1" onClick={() => setOpen(false)}>My Orders</Link>
              <Link href="/profile" className="block py-1" onClick={() => setOpen(false)}>Profile</Link>
              <button onClick={() => { logout(); setOpen(false); }} className="block py-1 text-brand-600">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-1" onClick={() => setOpen(false)}>Login</Link>
              <Link href="/register" className="block py-1" onClick={() => setOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
