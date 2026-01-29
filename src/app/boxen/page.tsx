import { CollectionPage } from "@/components/CollectionPage";

export default function BoxenPage() {
    return (
        <CollectionPage
            title="Mystery Boxen"
            description="Die Welt in einer Box. Handverlesene Überraschungen aus verschiedenen Kulturen."
            filter={(p) => p.category === 'Boxen'}
        />
    );
}
