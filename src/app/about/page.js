export const metadata = { title: 'About Us — Feastly' };

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">About Feastly</h1>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          We connect hungry customers with the best local restaurants, delivering fresh meals
          quickly and reliably.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80"
        alt="Our kitchen"
        className="rounded-3xl shadow-lg w-full h-72 object-cover mb-12"
      />
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: 'fa-bolt', title: 'Fast Delivery', text: 'Hot meals delivered in 30 minutes or less.' },
          { icon: 'fa-utensils', title: 'Quality Food', text: 'Partnered with top-rated local kitchens.' },
          { icon: 'fa-heart', title: 'Made with Love', text: 'Every order handled with care and passion.' },
        ].map((f) => (
          <div key={f.title} className="card p-6 text-center">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl mb-4">
              <i className={`fa-solid ${f.icon}`} />
            </div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
