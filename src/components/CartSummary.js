import Link from 'next/link';

export default function CartSummary({ subtotal, deliveryFee = 2.99, showCheckout = true }) {
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);
  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg mb-4">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${(subtotal > 0 ? deliveryFee : 0).toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex justify-between text-base font-bold">
          <span>Total</span>
          <span className="text-brand-600">${total.toFixed(2)}</span>
        </div>
      </div>
      {showCheckout && (
        <Link href="/checkout" className="btn-primary w-full mt-5">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
