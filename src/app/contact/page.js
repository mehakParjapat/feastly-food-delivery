'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Get in Touch</h1>
        <p className="mt-3 text-gray-500">We'd love to hear from you. Send us a message!</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            { icon: 'fa-location-dot', title: 'Address', text: '123 Flavor Street, Food City' },
            { icon: 'fa-phone', title: 'Phone', text: '+1 555 0100' },
            { icon: 'fa-envelope', title: 'Email', text: 'hello@feastly.app' },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <i className={`fa-solid ${c.icon}`} />
              </div>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-gray-500 text-sm">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="card p-6 space-y-4"
        >
          {sent && (
            <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3">
              <i className="fa-solid fa-circle-check mr-2" />Message sent! We'll be in touch soon.
            </div>
          )}
          <div>
            <label className="label">Name</label>
            <input className="input" required placeholder="Your name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" required placeholder="you@example.com" />
          </div>
          <div>
            <label className="label">Message</label>
            <textarea className="input" rows={4} required placeholder="How can we help?" />
          </div>
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}
