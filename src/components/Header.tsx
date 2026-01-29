'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export function Header() {
  const { toggleCart, totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-gray-100 py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 -ml-2">
            <Menu className="w-5 h-5" />
          </button>

          {/* Navigation - Left */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            <Link
              href="/bestseller"
              className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 hover:text-black transition-all duration-300"
            >
              Bestseller
            </Link>
            <Link
              href="/boxen"
              className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 hover:text-black transition-all duration-300"
            >
              Boxen
            </Link>
          </nav>

          {/* Logo - Center */}
          <Link href="/" className="flex items-center justify-center flex-1">
            <div className="relative h-10 w-40 md:h-12 md:w-56 transition-transform duration-500 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Sweets aus aller Welt"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Icons - Right */}
          <div className="flex items-center justify-end gap-2 md:gap-5 flex-1">
            <nav className="hidden lg:flex items-center gap-8 mr-8">
              <Link
                href="/kalender"
                className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 hover:text-black transition-all duration-300"
              >
                Kalender
              </Link>
              <Link
                href="/sweets"
                className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 hover:text-black transition-all duration-300"
              >
                Sweets
              </Link>
            </nav>

            <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block">
              <Search className="w-5 h-5 text-black/80" strokeWidth={1.5} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors group"
              aria-label="Warenkorb öffnen"
            >
              <ShoppingBag
                className={`w-6 h-6 transition-all duration-300 ${isScrolled ? 'text-black' : 'text-black md:text-white'}`}
                strokeWidth={1.5}
              />
              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
