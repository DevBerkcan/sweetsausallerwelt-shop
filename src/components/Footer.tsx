import Link from 'next/link';
import React from 'react';

export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4 inline-block">
                            Sweet Shop
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                            Dein Premium-Shop für handverlesene Süßigkeiten, Baklava und Datteln.
                            Qualität, die man schmeckt.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:scale-110 transition-all shadow-sm">
                                📷
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:scale-110 transition-all shadow-sm">
                                📘
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:scale-110 transition-all shadow-sm">
                                🎵
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h3>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li><Link href="/products" className="hover:text-purple-600 transition-colors">Alle Produkte</Link></li>
                            <li><Link href="/products/ramadan-essentials-box" className="hover:text-purple-600 transition-colors">Bestseller</Link></li>
                            <li><Link href="/#faq" className="hover:text-purple-600 transition-colors">Häufige Fragen</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Rechtliches</h3>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li><Link href="/legal/impressum" className="hover:text-purple-600 transition-colors">Impressum</Link></li>
                            <li><Link href="/legal/datenschutz" className="hover:text-purple-600 transition-colors">Datenschutz</Link></li>
                            <li><Link href="/legal/agb" className="hover:text-purple-600 transition-colors">AGB</Link></li>
                            <li><Link href="/legal/widerruf" className="hover:text-purple-600 transition-colors">Widerrufsrecht</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Sweet Shop GmbH. Alle Rechte vorbehalten.</p>
                    <p>Made with 💜 in Germany</p>
                </div>
            </div>
        </footer>
    );
}
