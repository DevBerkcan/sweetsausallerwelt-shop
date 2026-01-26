import React from 'react';

interface Product {
    id: string;
    name: string;
    benefit: string;
    price: string;
    image?: string;
    rating?: number;
    reviews?: number;
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 w-full relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    {/* Placeholder for real image */}
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    Bestseller
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            {product.benefit}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-gray-900 dark:text-white">{product.price}</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 text-xs text-yellow-500">
                    {'★'.repeat(5)} <span className="text-gray-400 ml-1">({product.reviews})</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-gray-900 dark:text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <span>In den Warenkorb</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            </div>
        </div>
    );
}
