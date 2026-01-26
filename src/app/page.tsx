import { Hero } from "@/components/Hero";
import { BenefitBlock } from "@/components/BenefitBlock";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const products = [
    {
      id: '1',
      name: 'Ramadan Essentials Box',
      benefit: 'Energie für den ganzen Tag',
      price: '49,90 €',
      rating: 5,
      reviews: 124
    },
    {
      id: '2',
      name: 'Pistazien Traum',
      benefit: 'Luxus für den Gaumen',
      price: '29,90 €',
      rating: 4.8,
      reviews: 89
    },
    {
      id: '3',
      name: 'Family Sharing Pack',
      benefit: 'Gemeinsam genießen',
      price: '69,90 €',
      rating: 4.9,
      reviews: 210
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-black">
      <Hero />

      {/* USP Section */}
      <section className="w-full py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum Naschkatzen uns lieben</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Keine 08/15 Süßigkeiten. Wir kuratieren Momente, die bleiben.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitBlock
              title="Handverlesene Qualität"
              description="Nichts vom Fließband. Jedes Stück wird auf Geschmack und Frische geprüft."
              icon={<span className="text-2xl">🍯</span>}
            />
            <BenefitBlock
              title="Blitzschneller Versand"
              description="Heute bestellt, morgen genießen. Weil Heißhunger nicht warten kann."
              icon={<span className="text-2xl">🚀</span>}
            />
            <BenefitBlock
              title="Freude schenken"
              description="Perfekt verpackt als Geschenk. Für dich selbst oder deine Liebsten."
              icon={<span className="text-2xl">🎁</span>}
            />
          </div>
        </div>
      </section>

      {/* Bestseller Section */}
      <section className="w-full py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Unsere Bestseller</h2>
              <p className="text-gray-500">Das kaufen andere Kunden am liebsten</p>
            </div>
            <button className="hidden md:block text-purple-600 font-bold hover:underline">Alle ansehen &rarr;</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button className="text-purple-600 font-bold hover:underline">Alle ansehen &rarr;</button>
          </div>
        </div>
      </section>

      {/* Trust / Story Section */}
      <section className="w-full py-24 px-4 bg-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Mehr als nur Süßigkeiten</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Wir glauben, dass jeder Moment des Genießens etwas Besonderes sein sollte.
            Deshalb verzichten wir auf unnötige Zusätze und setzen auf echten Geschmack.
            Seit 2024 begleiten wir über 10.000 Kunden auf ihrer Geschmacksreise.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10.000+</div>
              <div className="text-purple-200">Glückliche Kunden</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-purple-200">Durchschnittsbewertung</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-purple-200">Versandzeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="w-full py-12 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-gray-500 text-sm">Bereit für den ersten Biss?</p>
      </section>
    </main>
  );
}
