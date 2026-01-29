'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onLanguageChange(newLocale: string) {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    }

    return (
        <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5">
            <button
                onClick={() => onLanguageChange('de')}
                className={`transition-colors ${locale === 'de' ? 'text-black' : 'text-black/30 hover:text-black/60'} ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            >
                DE
            </button>
            <span className="text-black/10">|</span>
            <button
                onClick={() => onLanguageChange('en')}
                className={`transition-colors ${locale === 'en' ? 'text-black' : 'text-black/30 hover:text-black/60'} ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            >
                EN
            </button>
            <span className="text-black/10">|</span>
            <button
                onClick={() => onLanguageChange('fr')}
                className={`transition-colors ${locale === 'fr' ? 'text-black' : 'text-black/30 hover:text-black/60'} ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            >
                FR
            </button>
        </div>
    );
}
