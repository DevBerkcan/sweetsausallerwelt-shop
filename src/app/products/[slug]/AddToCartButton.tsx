'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductDto } from '@/lib/api/types';

interface AddToCartButtonProps {
  product: ProductDto;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-400">Menge:</span>
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-l-xl"
          >
            -
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-r-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
        }`}
      >
        {added ? (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Hinzugefügt!</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>In den Warenkorb</span>
          </>
        )}
      </button>

      {/* Buy Now Button */}
      <a
        href="/checkout"
        className="block w-full py-4 rounded-xl font-bold text-lg text-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
      >
        Jetzt kaufen
      </a>
    </div>
  );
}
