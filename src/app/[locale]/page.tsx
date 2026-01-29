import { CollectionGrid } from "@/components/CollectionGrid";
import { PhilosophySection } from "@/components/PhilosophySection";
import { TrustSection } from "@/components/TrustSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductDto } from "@/lib/api/types";
import { Link } from "@/i18n/routing";
import Image from "next/image";

async function getProducts(): Promise<ProductDto[]> {
  const apiUrl = process.env.API_URL || 'http://localhost:5044';

  try {
    const response = await fetch(`${apiUrl}/api/products`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Map API product to display format
function mapProductToDisplay(product: ProductDto) {
  const benefits: Record<string, string> = {
    'ramadan-essentials-box': 'Energie für den ganzen Tag',
    'pistazien-traum': 'Luxus für den Gaumen',
    'family-sharing-pack': 'Gemeinsam genießen',
    'premium-datteln-selection': 'Natürliche Süße pur',
    'baklava-klassik-mix': 'Orientalischer Genuss',
  };

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    benefit: benefits[product.slug] || 'Premium Qualität',
    price: `${product.price.toFixed(2).replace('.', ',')} €`,
    rating: 4.8 + Math.random() * 0.2,
    reviews: Math.floor(80 + Math.random() * 150),
    imageUrl: product.imageUrl,
  };
}

import { products } from "@/lib/data/products";

import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations('HomePage');
  const bestsellers = products.filter(p => p.badge === 'Bestseller' || p.badge === 'LIMITED').slice(0, 4);
  const boxes = products.filter(p => p.category === 'Boxen');
  const calendars = products.filter(p => p.category === 'Kalender');
  const sweets = products.filter(p => p.category === 'Sweets');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-end overflow-hidden mt-[98px] md:mt-[102px]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://sweetsausallerwelt.de/cdn/shop/files/05_v2.png?v=1769164037&width=2048"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pb-20 z-10 relative">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white mb-4 uppercase leading-[0.85]">
              Viral <br />Sweets
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-10 max-w-lg tracking-[0.2em] uppercase font-bold">
              {t('hero.description')}
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="inline-block bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 border-2 border-white"
              >
                {t('hero.cta')}
              </Link>
              <Link
                href="/kalender"
                className="hidden md:inline-block bg-transparent text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 border-2 border-white"
              >
                Kalender 2026
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Bestseller Section */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-black text-black/40 uppercase tracking-[0.3em] mb-4 block">Hype des Monats</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">{t('bestseller.title')}</h2>
              <p className="text-gray-500 tracking-[0.1em] uppercase text-xs font-bold">{t('bestseller.subtitle')}</p>
            </div>
            <Link href="/products" className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">
              {t('bestseller.viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <CollectionGrid />

      {/* Kalender Section (High Conversion Focus) */}
      <section className="w-full py-24 bg-black text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative aspect-square">
              <Image
                src="/01 v2.png"
                alt="Ramadan Kalender"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4 block">Saison Highlight</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">Ramadan 2026</h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium">
                Sichere dir jetzt den limitierten Ramadankalender 2026. Gefüllt mit 24 Halal-Süßigkeiten aus aller Welt. Der perfekte Begleiter für dich oder als Geschenk.
              </p>
              <Link
                href="/products/ramadankalender-2026"
                className="inline-block bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 border-2 border-white"
              >
                In den Warenkorb — 59,90€
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section (UGC) */}
      <section className="w-full py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-12">Was Kunden sagen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex text-black mb-4">{'★'.repeat(5)}</div>
                <p className="text-lg font-bold uppercase tracking-tight mb-4">"Beste Box die ich je hatte!"</p>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">— Sarah K.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <PhilosophySection />
    </main >
  );
}
