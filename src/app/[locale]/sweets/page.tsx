import { CollectionPage } from "@/components/CollectionPage";

export default function SweetsPage() {
    return (
        <CollectionPage
            title="Sweets"
            description="Virale Trends und zeitlose Klassiker. Premium Süßigkeiten aus aller Welt."
            filter={(p) => p.category === 'Sweets'}
        />
    );
}
