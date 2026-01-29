import { products } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustSection } from "@/components/TrustSection";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-40 pb-32">
        <div className="flex flex-col lg:flex-row gap-20 xl:gap-32 items-start">
          {/* Sticky Image Column */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-40">
            <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden group">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              {product.badge && (
                <div className="absolute top-10 left-10 z-10">
                  <span className="bg-black text-white text-[10px] font-black px-5 py-2 uppercase tracking-[0.3em]">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Scrolling Content Column */}
          <div className="w-full lg:w-[45%]">
            <div className="max-w-xl">
              <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 mb-10">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">{product.category}</Link>
                <span>/</span>
                <span className="text-black/60">{product.name}</span>
              </nav>

              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6 mb-12">
                <span className="text-4xl font-black">{product.price.toFixed(2).replace('.', ',')} €</span>
                <div className="flex items-center gap-2">
                  <div className="flex text-black text-xs">
                    {'★'.repeat(Math.round(product.rating))}
                    <span className="text-gray-200">{'★'.repeat(5 - Math.round(product.rating))}</span>
                  </div>
                  <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">({product.reviews} Reviews)</span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-1 gap-6 mb-16 border-y border-gray-100 py-12">
                {product.usps.map((usp, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-black/80">{usp}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-12">
                <p className="text-xl font-medium text-black/70 leading-relaxed italic">
                  "{product.benefit}"
                </p>
                <div className="h-px w-20 bg-black opacity-10" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-12">
                <button className="w-full bg-black text-white py-6 rounded-none font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-all duration-500">
                  In den Warenkorb — {product.price.toFixed(2).replace('.', ',')}€
                </button>

                {/* Express Checkout */}
                <div className="space-y-2">
                  <button className="w-full py-4 bg-[#ffc439] hover:opacity-90 transition-opacity flex items-center justify-center">
                    <span className="font-bold italic text-[#003087] text-lg">PayPal</span>
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-4 bg-black text-white hover:opacity-90 transition-opacity flex items-center justify-center font-bold text-lg">
                       Pay
                    </button>
                    <button className="py-4 bg-white border border-gray-200 text-black hover:bg-gray-50 transition-colors flex items-center justify-center font-bold text-lg">
                      G Pay
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Toggles */}
              <div className="space-y-12 mt-24">
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/30 mb-8">Inhalt der Box</h3>
                  <ul className="space-y-4">
                    {product.whatsInside.map((item, i) => (
                      <li key={i} className="flex justify-between items-end border-b border-gray-50 pb-4">
                        <span className="text-sm font-bold uppercase tracking-tight">{item}</span>
                        <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">Premium quality</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-[#f9f9f9] p-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-6">Versand & Logistik</h3>
                  <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
                    Blitzversand innerhalb von 24h. <br />
                    Gratis Versand ab 40€. <br />
                    Sicher verpackt für maximalen Genuss.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustSection />
    </main>
  );
}
