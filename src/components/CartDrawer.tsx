'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">
            Warenkorb ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Warenkorb schließen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl mb-6 block grayscale">🛒</span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Dein Warenkorb ist leer</p>
              <button
                onClick={closeCart}
                className="bg-black text-white px-10 py-4 font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                Kollektion entdecken
              </button>
            </div>
          ) : (
            <ul className="space-y-8">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-6 items-center"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-50 relative flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🍬</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-sm uppercase tracking-tight leading-tight pr-4">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-black transition-colors"
                        aria-label="Artikel entfernen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm font-black mb-4">
                      {item.price.toFixed(2).replace('.', ',')} €
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-100 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-xs"
                      >
                        —
                      </button>
                      <span className="w-10 text-center font-black text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Zwischensumme</span>
              <span className="font-black text-xl tracking-tight">
                {totalAmount.toFixed(2).replace('.', ',')} €
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-5 bg-black text-white text-center font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
            >
              Sicher zur Kasse
            </Link>

            {/* Express Checkout */}
            <div className="space-y-2">
              <button className="w-full py-3 bg-[#ffc439] rounded-none flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <span className="font-bold italic text-[#003087]">PayPal</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-3 bg-black text-white rounded-none flex items-center justify-center hover:opacity-90 transition-opacity">
                  <span className="font-bold text-sm"> Pay</span>
                </button>
                <button className="py-3 bg-white border border-gray-200 text-black rounded-none flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-sm">G Pay</span>
                </button>
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center hover:text-black transition-colors"
            >
              Weiter einkaufen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
