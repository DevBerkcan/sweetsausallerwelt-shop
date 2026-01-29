import React from 'react';

const highlights = [
    {
        title: 'Blitzversand',
        description: 'Gratis ab 40€ Bestellwert',
        icon: '🚚'
    },
    {
        title: '24/7 Support',
        description: 'Wir sind immer für dich da',
        icon: '💬'
    },
    {
        title: 'Weltweit Naschen',
        description: 'Exklusive Auswahl & Trends',
        icon: '🌍'
    },
    {
        title: 'Sichere Retoure',
        description: '14 Tage Rückgaberecht',
        icon: '🔄'
    }
];

export function TrustSection() {
    return (
        <section className="w-full py-16 border-y border-gray-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {highlights.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center group">
                            <div className="mb-4 text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                                {item.icon}
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed max-w-[140px]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
