import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sweet Shop | Premium Süßigkeiten & Orientalische Spezialitäten",
    description: "Handverlesene Süßigkeiten, Baklava, Datteln und orientalische Spezialitäten. Schneller Versand, beste Qualität. Jetzt entdecken!",
    keywords: ["Süßigkeiten", "Baklava", "Datteln", "Ramadan", "Orientalisch", "Premium"],
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <CartProvider>
                        <div className="relative">
                            {/* Fixed Announcement Bar */}
                            <div className="fixed top-0 left-0 right-0 z-50">
                                <AnnouncementBar />
                            </div>

                            {/* Sticky Header with spacing for announcement bar */}
                            <div className="pt-[34px] md:pt-[38px]">
                                <Header />
                            </div>
                        </div>
                        {children}
                        <Footer />
                        <CartDrawer />
                    </CartProvider>
                </NextIntlClientProvider>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Sweet Shop",
                            "url": "https://sweets-homepage.com",
                            "logo": "https://sweets-homepage.com/logo.png",
                            "sameAs": [
                                "https://facebook.com/sweetsshop",
                                "https://instagram.com/sweetsshop"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+49-123-456789",
                                "contactType": "Customer Support"
                            }
                        })
                    }}
                />
            </body>
        </html>
    );
}
