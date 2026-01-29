export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    imageUrl: string;
    category: string;
    benefit: string;
    badge?: 'LIMITED' | 'NEW' | 'RESTOCK' | 'Bestseller';
    rating: number;
    reviews: number;
    description: string;
    whatsInside: string[];
    usps: string[];
}

export const products: Product[] = [
    {
        id: 'ramadan-2026',
        name: 'Ramadankalender 2026 - Halal Edition',
        slug: 'ramadankalender-2026',
        price: 59.90,
        currency: 'EUR',
        imageUrl: '/01 v2.png',
        category: 'Kalender',
        benefit: '24 Tage voller Entdeckungen',
        badge: 'LIMITED',
        rating: 5.0,
        reviews: 124,
        description: 'Dein täglicher Begleiter durch den gesegneten Monat. Jedes Türchen birgt eine handverlesene Halal-Spezialität aus aller Welt.',
        whatsInside: [
            'Premium Datteln aus Medina',
            'Exklusive türkische Baklava',
            'Dubai Schokolade Minis',
            'Wilde Feigen in Honig'
        ],
        usps: [
            '100% Halal zertifiziert',
            'Handkuratiert in Deutschland',
            'Limitiert auf 500 Stück'
        ]
    },
    {
        id: 'dubai-classic',
        name: 'Dubai Mytcha Schokolade - Classic',
        slug: 'dubai-schokolade-classic',
        price: 14.90,
        currency: 'EUR',
        imageUrl: '/02 v2.png',
        category: 'Sweets',
        benefit: 'Der virale Genuss',
        badge: 'Bestseller',
        rating: 4.8,
        reviews: 512,
        description: 'Die originale Pistazien-Engelshaar-Füllung in feinster Vollmilchschokolade. Knusprig, cremig, unvergleichlich.',
        whatsInside: ['1x 100g Tafel Premium Schokolade'],
        usps: ['Originalrezeptur', 'Direkt aus Dubai', 'Frisch produziert']
    },
    {
        id: 'asia-box',
        name: 'Asia Mystery Box - Premium Mix',
        slug: 'asia-box-premium',
        price: 34.90,
        currency: 'EUR',
        imageUrl: '/03 v2.png',
        category: 'Boxen',
        benefit: 'Eine Reise durch Asien',
        badge: 'NEW',
        rating: 4.9,
        reviews: 89,
        description: 'Tauche ein in die Welt der asiatischen Snacks. Von japanischen KitKats bis zu koreanischen Chips.',
        whatsInside: ['15-20 Originale Snacks', '1x Japanisches Getränk', 'Glückskekse'],
        usps: ['Originalimport', 'Jede Box ein Unikat', 'Über 20€ Ersparnis']
    },
    {
        id: 'usa-box',
        name: 'USA Bestseller Box',
        slug: 'usa-box-bestseller',
        price: 39.90,
        currency: 'EUR',
        imageUrl: '/04 v2.png',
        category: 'Boxen',
        benefit: 'American Dream in einer Box',
        badge: 'Bestseller',
        rating: 4.7,
        reviews: 210,
        description: 'Alle Klassiker aus den Staaten. Reese\'s, Hershey\'s, Takis und mehr.',
        whatsInside: ['Mix aus süß & salzig', 'Rare Sammlerstücke', 'Original Import'],
        usps: ['Blitzversand', 'Frischegarantie', 'Amerikanischer Lifestyle']
    },
    {
        id: 'advent-2025',
        name: 'Exklusiver Adventkalender 2025',
        slug: 'adventkalender-2025',
        price: 49.90,
        currency: 'EUR',
        imageUrl: '/05 v2.png',
        category: 'Kalender',
        benefit: 'Vorfreude garantiert',
        badge: 'RESTOCK',
        rating: 4.9,
        reviews: 432,
        description: 'Die süßeste Art, auf Weihnachten zu warten. Gefüllt mit Bestsellern aus aller Welt.',
        whatsInside: ['24 Überraschungen', 'Inkl. Goodies', 'Festliches Design'],
        usps: ['Hochwertige Box', 'Wiederverwendbar', 'Top Marken']
    },
    {
        id: 'sour-mix',
        name: 'Sauerste Bonbons der Welt - Mix',
        slug: 'sauerste-bonbons',
        price: 9.90,
        currency: 'EUR',
        imageUrl: '/06 v2.png',
        category: 'Sweets',
        benefit: 'Mutprobe gefällig?',
        badge: 'NEW',
        rating: 4.6,
        reviews: 156,
        description: 'Nichts für schwache Nerven. Ein Mix aus den extremsten Sauren der Welt.',
        whatsInside: ['Toxic Waste', 'Warheads', 'Brain Blasterz'],
        usps: ['Extrem Sauer', 'Viraler Trend', 'Perfekt für Challenges']
    }
];
