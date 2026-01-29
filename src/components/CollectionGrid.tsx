import Image from 'next/image';
import Link from 'next/link';

interface Collection {
    title: string;
    href: string;
    image: string;
}

const collections: Collection[] = [
    {
        title: 'Ramadan Edition',
        href: '/products/ramadankalender-2026',
        image: 'https://images.unsplash.com/photo-1581063625345-420042457813?q=80&w=2000'
    },
    {
        title: 'World Discovery',
        href: '/products',
        image: 'https://images.unsplash.com/photo-1582208995045-2d0bf599781a?q=80&w=2000'
    },
    {
        title: 'Premium Selection',
        href: '/products/labuchoc-premium',
        image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?q=80&w=2000'
    },
];

export function CollectionGrid() {
    return (
        <section className="w-full py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">Entdecke Geschmack</h2>
                        <p className="text-gray-500 tracking-[0.1em] uppercase text-xs font-bold">Kurationen aus aller Welt für anspruchsvolle Genießer</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link
                            key={collection.title}
                            href={collection.href}
                            className="group relative aspect-[3/4] overflow-hidden bg-black"
                        >
                            <Image
                                src={collection.image}
                                alt={collection.title}
                                fill
                                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <h3 className="text-3xl font-black text-white tracking-[0.1em] uppercase leading-none group-hover:translate-y-[-10px] transition-transform duration-500">
                                    {collection.title}
                                </h3>
                                <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-500">
                                    <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        Entdecken →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
