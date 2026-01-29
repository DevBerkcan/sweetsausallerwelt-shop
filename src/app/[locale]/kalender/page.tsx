import { CollectionPage } from "@/components/CollectionPage";

export default function KalenderPage() {
    return (
        <CollectionPage
            title="Kalender 2026"
            description="Dein täglicher Begleiter. Exklusive Ramadan- und Advent-Editionen."
            filter={(p) => p.category === 'Kalender'}
        />
    );
}
