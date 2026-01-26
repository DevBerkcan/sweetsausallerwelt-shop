import React from 'react';
import { TrustBadge } from './TrustBadge';

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[100px] opacity-40 mix-blend-multiply filter animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full blur-[100px] opacity-40 mix-blend-multiply filter animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">

                {/* Trust Hint (Top) */}
                <div className="mb-6 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/30 border border-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-purple-900 dark:text-purple-100">
                        Über 10.000 glückliche Naschkatzen
                    </span>
                </div>

                {/* Headline: Problem -> Solution */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-gray-900 dark:text-white leading-tight">
                    Schluss mit langweiligen Snacks. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        Erlebe Süßigkeiten neu.
                    </span>
                </h1>

                {/* Subheadline: Value */}
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                    Handverlesene Premium-Sweets, die nicht nur gut schmecken, sondern dich in eine andere Welt entführen. Morgen bei dir.
                </p>

                {/* Action + Trust */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
                    <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
                        Jetzt entdecken
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>⭐️ 4.9/5 auf Trustpilot</span>
                        <span>•</span>
                        <span>Blitzversand</span>
                    </div>
                </div>

                {/* Trust Badges (Floating/Integrated) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
                    <TrustBadge text="Bekannte Marken" subtext="Nur das Original" />
                    <TrustBadge text="Frische-Garantie" subtext="Jeden Tag neu" />
                    <TrustBadge text="Sicher bezahlen" subtext="PayPal, Klarna & Co" />
                    <TrustBadge text="Gratis Versand" subtext="Ab 50€ Einkauf" />
                </div>
            </div>
        </section>
    );
}
