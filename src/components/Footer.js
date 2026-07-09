import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold text-white mb-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <i className="fa-solid fa-utensils" />
            </span>
            Feastly
          </div>
          <p className="text-sm text-gray-400">
            Delicious meals from your favorite local restaurants, delivered fast to your door.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-400">Home</Link></li>
            <li><Link href="/restaurants" className="hover:text-brand-400">Restaurants</Link></li>
            <li><Link href="/about" className="hover:text-brand-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-brand-400">Login</Link></li>
            <li><Link href="/register" className="hover:text-brand-400">Register</Link></li>
            <li><Link href="/orders" className="hover:text-brand-400">My Orders</Link></li>
            <li><Link href="/profile" className="hover:text-brand-400">Profile</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><i className="fa-solid fa-location-dot mr-2" />123 Flavor Street, Food City</li>
            <li><i className="fa-solid fa-phone mr-2" />+1 555 0100</li>
            <li><i className="fa-solid fa-envelope mr-2" />hello@feastly.app</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Feastly. All rights reserved.
      </div>
    </footer>
  );
}
