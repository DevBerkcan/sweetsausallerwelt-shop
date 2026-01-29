import { CollectionPage } from "@/components/CollectionPage";

export default function NeuPage() {
    return (
        <CollectionPage
            title="Neuheiten"
            description="Frisch eingetroffen. Entdecke als Erster die neuesten viralen Sweets-Trends."
            filter={(p) => p.badge === 'NEW'}
        />
    );
}
