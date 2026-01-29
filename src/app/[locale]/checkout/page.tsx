'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { redirectToCheckout } from '@/lib/stripe';

type PaymentMethod = 'stripe' | 'direct';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'DE',
  });

  const shippingCost = totalAmount >= 50 ? 0 : 4.99;
  const finalTotal = totalAmount + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await redirectToCheckout(
        items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        formData.email
      );
      // User will be redirected to Stripe
    } catch (err) {
      console.error('Stripe checkout error:', err);
      setError('Stripe Checkout ist momentan nicht verfügbar. Bitte nutze die direkte Bestellung.');
      setPaymentMethod('direct');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: formData.email,
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        router.push(`/checkout/success?orderId=${order.id}`);
      } else {
        const errorText = await response.text();
        setError(errorText || 'Bestellung fehlgeschlagen. Bitte versuche es erneut.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'stripe') {
      await handleStripeCheckout();
    } else {
      await handleDirectCheckout();
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-8xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-bold mb-4">Dein Warenkorb ist leer</h1>
          <p className="text-gray-500 mb-8">Füge Produkte hinzu, um zur Kasse zu gehen.</p>

          <Link
            href="/"
            className="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
          >
            Weiter einkaufen
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Kontakt</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail Adresse"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Lieferadresse</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Vorname"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nachname"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="PLZ"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stadt"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="DE">Deutschland</option>
                  <option value="AT">Österreich</option>
                  <option value="CH">Schweiz</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Zahlungsmethode</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'stripe'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                      }`}
                  >
                    <span className="text-2xl">💳</span>
                    <span className={`font-bold text-sm ${paymentMethod === 'stripe' ? 'text-purple-600' : ''}`}>
                      Stripe
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('direct')}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'direct'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                      }`}
                  >
                    <span className="text-2xl">📦</span>
                    <span className={`font-bold text-sm ${paymentMethod === 'direct' ? 'text-purple-600' : ''}`}>
                      Rechnung
                    </span>
                  </button>
                  <button
                    type="button"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <span className="text-2xl">🅿️</span>
                    <span className="font-bold text-sm">PayPal</span>
                  </button>
                  <button
                    type="button"
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <span className="text-2xl">🍎</span>
                    <span className="font-bold text-sm">Apple Pay</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {paymentMethod === 'stripe'
                    ? 'Sichere Zahlung über Stripe mit Kreditkarte, Klarna, und mehr.'
                    : 'Bezahle bequem per Rechnung nach Erhalt der Ware.'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Wird verarbeitet...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentMethod === 'stripe' ? 'Mit Stripe bezahlen' : 'Jetzt bestellen'}</span>
                    <span>({finalTotal.toFixed(2).replace('.', ',')} €)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Bestellübersicht</h2>

              {/* Items */}
              <ul className="space-y-4 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      🍬
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Menge: {item.quantity}</p>
                    </div>
                    <div className="font-bold">
                      {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Zwischensumme</span>
                  <span>{totalAmount.toFixed(2).replace('.', ',')} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Versand</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-500">Kostenlos</span>
                    ) : (
                      `${shippingCost.toFixed(2).replace('.', ',')} €`
                    )}
                  </span>
                </div>
                {totalAmount < 50 && (
                  <p className="text-sm text-purple-600">
                    Noch {(50 - totalAmount).toFixed(2).replace('.', ',')} € bis zum kostenlosen Versand!
                  </p>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span>Gesamt</span>
                  <span>{finalTotal.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🔒</span>
                  <span>SSL-verschlüsselte Zahlung</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>↩️</span>
                  <span>14 Tage Rückgaberecht</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📞</span>
                  <span>Kundenservice per E-Mail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
