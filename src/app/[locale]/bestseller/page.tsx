import { CollectionPage } from "@/components/CollectionPage";

export default function BestsellerPage() {
    return (
        <CollectionPage
            title="Bestseller"
            description="Was die Community liebt. Unsere meistverkauften Produkte auf einen Blick."
            filter={(p) => p.badge === 'Bestseller' || p.badge === 'LIMITED'}
        />
    );
}
