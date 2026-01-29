import { products, Product } from "@/lib/data/products";
import { ProductCard } from "@/components/ProductCard";
import { TrustSection } from "@/components/TrustSection";

interface CollectionPageProps {
    title: string;
    description: string;
    filter: (product: Product) => boolean;
}

export function CollectionPage({ title, description, filter }: CollectionPageProps) {
    const filteredProducts = products.filter(filter);

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 pt-40 pb-24">
                <div className="max-w-4xl mb-24">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                        {title}
                    </h1>
                    <p className="text-sm md:text-base text-gray-400 max-w-lg tracking-[0.2em] uppercase font-bold">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                price: product.price // ProductCard expects string | number
                            }}
                        />
                    ))}
                </div>
            </div>
            <TrustSection />
        </main>
    );
}
