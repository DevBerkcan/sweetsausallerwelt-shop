import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
