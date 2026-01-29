import { CollectionPage } from "@/components/CollectionPage";

export default function ShopAllPage() {
    return (
        <CollectionPage
            title="Shop All"
            description="Entdecke unsere gesamte Auswahl an viralen Süßigkeiten, Mystery Boxen und exklusiven Kalendern."
            filter={() => true}
        />
    );
}
