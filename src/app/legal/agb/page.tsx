export default function AGBPage() {
    return (
        <main className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

            <div className="prose dark:prose-invert">
                <h2>1. Geltungsbereich</h2>
                <p>
                    Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. Das Angebot richtet sich ausschließlich an Verbraucher.
                </p>

                <h2>2. Vertragspartner, Vertragsschluss</h2>
                <p>
                    Der Kaufvertrag kommt zustande mit Sweet Shop GmbH.
                </p>

                <h2>3. Vertragssprache, Vertragstextspeicherung</h2>
                <p>
                    Die für den Vertragsschluss zur Verfügung stehende Sprache ist Deutsch.
                </p>

                <h2>4. Lieferbedingungen</h2>
                <p>
                    Zuzüglich zu den angegebenen Produktpreisen kommen noch Versandkosten hinzu. Näheres zur Höhe der Versandkosten erfahren Sie bei den Angeboten.
                </p>

                <h2>5. Bezahlung</h2>
                <p>
                    In unserem Shop stehen Ihnen grundsätzlich die folgenden Zahlungsarten zur Verfügung:
                </p>
                <ul>
                    <li>Kreditkarte (Stripe)</li>
                    <li>Rechnung</li>
                </ul>

                <h2>6. Eigentumsvorbehalt</h2>
                <p>
                    Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
                </p>
            </div>
        </main>
    );
}
