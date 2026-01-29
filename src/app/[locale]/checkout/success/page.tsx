'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-black pt-24 pb-16">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vielen Dank für deine Bestellung!
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Deine Bestellung wurde erfolgreich aufgegeben und wird bald zu dir unterwegs sein.
        </p>

        {/* Order Info */}
        {orderId && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
            <p className="text-gray-500 mb-2">Bestellnummer</p>
            <p className="font-mono text-lg font-bold break-all">{orderId}</p>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm mb-8 text-left">
          <h2 className="text-xl font-bold mb-4">Was passiert als Nächstes?</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">1</span>
              <div>
                <h3 className="font-semibold">Bestätigung per E-Mail</h3>
                <p className="text-gray-500 text-sm">Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">2</span>
              <div>
                <h3 className="font-semibold">Verpackung & Versand</h3>
                <p className="text-gray-500 text-sm">Wir verpacken deine Bestellung liebevoll und senden sie auf den Weg.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600 font-bold">3</span>
              <div>
                <h3 className="font-semibold">Lieferung</h3>
                <p className="text-gray-500 text-sm">Dein Paket wird innerhalb von 1-3 Werktagen bei dir ankommen.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Weiter einkaufen
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 font-bold rounded-xl hover:border-purple-600 hover:text-purple-600 transition-colors"
          >
            Hilfe & Kontakt
          </Link>
        </div>

        {/* Trust Message */}
        <p className="mt-12 text-gray-500 text-sm">
          Fragen? Schreib uns an support@sweetshop.de
        </p>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Laden...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
