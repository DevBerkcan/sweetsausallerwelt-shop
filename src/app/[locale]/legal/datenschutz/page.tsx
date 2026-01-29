export default function DatenschutzPage() {
    return (
        <main className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

            <div className="prose dark:prose-invert">
                <h2>1. Datenschutz auf einen Blick</h2>
                <h3>Allgemeine Hinweise</h3>
                <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                </p>

                <h3>Datenerfassung auf dieser Website</h3>
                <p>
                    <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h2>2. Server-Log-Dateien</h2>
                <p>
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                </p>

                <h2>3. Analyse-Tools und Werbung</h2>
                <p>
                    [Hier Platzhalter für Google Analytics, Matomo etc. falls verwendet]
                </p>

                <h2>4. Newsletter</h2>
                <p>
                    Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse.
                </p>

                <h2>5. Plugins und Tools</h2>
                <p>
                    [Hinweise zu YouTube, Google Fonts, etc.]
                </p>
            </div>
        </main>
    );
}
