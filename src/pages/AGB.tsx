import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AGB() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-slate max-w-none">
          <h2>§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der
            Webanwendung "hauspilot" und alle damit verbundenen Dienstleistungen.
          </p>

          <h2>§ 2 Leistungsbeschreibung</h2>
          <p>
            hauspilot ist eine kostenlose Webanwendung zur Organisation und
            Verwaltung von Hausbau-Projekten. Der Funktionsumfang umfasst:
          </p>
          <ul>
            <li>Bauphasen-Tracker</li>
            <li>Terminplaner</li>
            <li>Budgetmonitor</li>
            <li>Bautagebuch</li>
            <li>Ratgeber</li>
          </ul>

          <h2>§ 3 Registrierung und Nutzerkonto</h2>
          <p>
            Für die Nutzung von hauspilot ist eine Registrierung erforderlich.
            Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten
            und vor dem Zugriff Dritter zu schützen.
          </p>

          <h2>§ 4 Verfügbarkeit</h2>
          <p>
            Wir bemühen uns um eine hohe Verfügbarkeit des Dienstes. Ein
            Anspruch auf ununterbrochene Verfügbarkeit besteht nicht.
            Wartungsarbeiten werden nach Möglichkeit angekündigt.
          </p>

          <h2>§ 5 Datenschutz</h2>
          <p>
            Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß
            unserer Datenschutzerklärung und den geltenden
            Datenschutzbestimmungen.
          </p>

          <h2>§ 6 Haftung</h2>
          <p>
            Die Nutzung von hauspilot erfolgt auf eigene Verantwortung. Für die
            Richtigkeit, Vollständigkeit und Aktualität der in hauspilot
            eingetragenen Daten ist der Nutzer selbst verantwortlich.
          </p>

          <h2>§ 7 Kündigung</h2>
          <p>
            Der Nutzer kann sein Konto jederzeit löschen. Mit der Löschung
            werden alle gespeicherten Daten unwiderruflich gelöscht.
          </p>

          <h2>§ 8 Änderungen der AGB</h2>
          <p>
            Wir behalten uns vor, diese AGB jederzeit zu ändern. Über
            wesentliche Änderungen werden registrierte Nutzer per E-Mail
            informiert.
          </p>

          <h2>§ 9 Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne
            Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der
            übrigen Bestimmungen unberührt.
          </p>
        </div>
      </div>
    </div>
  )
}
