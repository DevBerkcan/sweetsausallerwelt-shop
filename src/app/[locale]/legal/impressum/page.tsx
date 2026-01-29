export default function ImpressumPage() {
    return (
        <main className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Impressum</h1>

            <div className="prose dark:prose-invert">
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    Sweet Shop GmbH (Musterfirma)<br />
                    Musterstraße 123<br />
                    12345 Musterstadt
                </p>

                <h2>Kontakt</h2>
                <p>
                    Telefon: +49 (0) 123 44 55 66<br />
                    E-Mail: info@sweets-homepage.com
                </p>

                <h2>Vertreten durch</h2>
                <p>Geschäftsführer: Max Mustermann</p>

                <h2>Registereintrag</h2>
                <p>
                    Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht Musterstadt<br />
                    Registernummer: HRB 12345
                </p>

                <h2>Umsatzsteuer-ID</h2>
                <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE 123 456 789
                </p>

                <h2>Streitschlichtung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>

                <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </div>
        </main>
    );
}
