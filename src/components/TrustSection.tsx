import React from 'react';
import { getTranslations } from 'next-intl/server';

export async function TrustSection() {
    const t = await getTranslations('HomePage.trustSection');

    const highlights = [
        {
            title: t('shipping'),
            description: t('shippingSub'),
            icon: '🚚'
        },
        {
            title: t('support'),
            description: t('supportSub'),
            icon: '💬'
        },
        {
            title: t('selection'),
            description: t('selectionSub'),
            icon: '🌍'
        },
        {
            title: t('return'),
            description: t('returnSub'),
            icon: '🔄'
        }
    ];

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
