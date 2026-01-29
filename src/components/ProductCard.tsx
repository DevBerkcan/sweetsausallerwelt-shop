'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Product {
    id: string;
    name: string;
    slug?: string;
    benefit: string;
    price: string | number;
    image?: string;
    imageUrl?: string | null;
    rating?: number;
    reviews?: number;
    badge?: string;
}

// Parse price string to number (e.g., "49,99 €" -> 49.99)
function parsePrice(priceStr: string): number {
    return parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, ''));
}

export function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        const numericPrice = typeof product.price === 'string'
            ? parsePrice(product.price)
            : product.price;

        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
            price: numericPrice,
            imageUrl: product.imageUrl || product.image,
        });
    };

    const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-');
    const displayPrice = typeof product.price === 'number'
        ? `${product.price.toFixed(2).replace('.', ',')} €`
        : product.price;

    return (
        <div className="group relative bg-white overflow-hidden border border-gray-100 hover:border-black transition-all duration-500 rounded-none">
            {/* Image */}
            <Link href={`/products/${productSlug}`}>
                <div className="aspect-[4/5] bg-[#f9f9f9] w-full relative overflow-hidden cursor-pointer">
                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                                {product.badge}
                            </span>
                        </div>
                    )}

                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-700 opacity-20">
                            🍬
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </Link>

            <div className="p-6">
                <div className="mb-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                        {product.benefit}
                    </p>
                    <Link href={`/products/${productSlug}`}>
                        <h3 className="font-black text-xl text-black leading-tight uppercase tracking-tight group-hover:text-black/70 transition-colors cursor-pointer">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="font-black text-black text-lg tracking-tight">{displayPrice}</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-white text-black border-2 border-black font-black px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest"
                    >
                        Hinzufügen
                    </button>
                </div>
            </div>
        </div>
    );
}
