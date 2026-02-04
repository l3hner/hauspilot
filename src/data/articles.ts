import type { Article } from '@/types'

export const articles: Article[] = [
  // Planung
  {
    id: 'planung-1',
    category: 'planung',
    title: 'Die richtige Grundstückswahl',
    summary: 'Worauf Sie bei der Auswahl Ihres Baugrundstücks achten sollten.',
    readTime: 5,
    content: `
# Die richtige Grundstückswahl

Die Wahl des richtigen Grundstücks ist eine der wichtigsten Entscheidungen beim Hausbau. Hier erfahren Sie, worauf Sie achten sollten.

## Lage und Infrastruktur

Die Lage bestimmt maßgeblich die Lebensqualität. Prüfen Sie:
- Anbindung an öffentliche Verkehrsmittel
- Nähe zu Schulen, Kindergärten und Einkaufsmöglichkeiten
- Freizeitmöglichkeiten in der Umgebung
- Lärmbelastung (Straßen, Flughafen, Gewerbe)

## Bebauungsplan prüfen

Der Bebauungsplan gibt vor:
- Erlaubte Bauweise (offen, geschlossen)
- Maximale Geschosszahl
- Dachform und -neigung
- Grenzabstände

## Bodenbeschaffenheit

Lassen Sie vor dem Kauf ein Bodengutachten erstellen:
- Tragfähigkeit des Bodens
- Grundwasserstand
- Altlasten
- Erforderliche Gründungsmaßnahmen

## Erschließung

Klären Sie die Erschließungskosten:
- Wasser und Abwasser
- Strom und Gas
- Telekommunikation
- Straßenanbindung
    `,
  },
  {
    id: 'planung-2',
    category: 'planung',
    title: 'Den richtigen Architekten finden',
    summary: 'Tipps für die Auswahl des passenden Architekten für Ihr Bauprojekt.',
    readTime: 4,
    content: `
# Den richtigen Architekten finden

Ein guter Architekt ist der Schlüssel zu einem erfolgreichen Bauprojekt.

## Qualifikation prüfen

- Mitgliedschaft in der Architektenkammer
- Referenzprojekte besichtigen
- Spezialisierung (Einfamilienhaus, Mehrfamilienhaus, etc.)

## Das Erstgespräch

Im Erstgespräch sollten Sie klären:
- Verständnis für Ihre Wünsche und Ihr Budget
- Kommunikationsstil und Erreichbarkeit
- Zeitliche Verfügbarkeit
- Honorargestaltung nach HOAI

## Leistungsphasen verstehen

Die HOAI definiert 9 Leistungsphasen:
1. Grundlagenermittlung
2. Vorplanung
3. Entwurfsplanung
4. Genehmigungsplanung
5. Ausführungsplanung
6. Vorbereitung der Vergabe
7. Mitwirkung bei der Vergabe
8. Objektüberwachung
9. Objektbetreuung

## Vertrag abschließen

Achten Sie auf einen detaillierten Architektenvertrag mit:
- Klaren Leistungsbeschreibungen
- Terminvereinbarungen
- Honorarregelungen
- Haftungsvereinbarungen
    `,
  },
  {
    id: 'planung-3',
    category: 'planung',
    title: 'Energieeffizientes Bauen',
    summary: 'So planen Sie ein energieeffizientes Haus und sparen langfristig Kosten.',
    readTime: 6,
    content: `
# Energieeffizientes Bauen

Ein energieeffizientes Haus schont die Umwelt und Ihren Geldbeutel.

## Gebäudestandards

- **KfW-Effizienzhaus 55**: 55% des Referenzgebäudes
- **KfW-Effizienzhaus 40**: 40% des Referenzgebäudes
- **Passivhaus**: Extrem niedriger Energiebedarf
- **Plusenergiehaus**: Erzeugt mehr Energie als verbraucht

## Wichtige Komponenten

### Dämmung
- Außenwände mindestens 16-20 cm
- Dach mindestens 20-30 cm
- Kellerdämmung nicht vergessen

### Fenster
- Dreifachverglasung (U-Wert < 0,8)
- Thermisch getrennte Rahmen
- Optimale Ausrichtung (große Fenster nach Süden)

### Heizung
- Wärmepumpe
- Pelletheizung
- Solarthermie zur Warmwasserbereitung

### Lüftung
- Kontrollierte Wohnraumlüftung
- Wärmerückgewinnung

## Fördermittel nutzen

- KfW-Kredite und Zuschüsse
- BAFA-Förderung für Heizungen
- Regionale Förderprogramme
    `,
  },

  // Finanzierung
  {
    id: 'finanzierung-1',
    category: 'finanzierung',
    title: 'Baufinanzierung richtig planen',
    summary: 'Die wichtigsten Schritte zur optimalen Baufinanzierung.',
    readTime: 7,
    content: `
# Baufinanzierung richtig planen

Eine solide Finanzierung ist das Fundament Ihres Bauprojekts.

## Eigenkapital ermitteln

Empfohlen werden mindestens 20-30% Eigenkapital:
- Barvermögen
- Bausparverträge
- Wertpapiere
- Eigenleistungen (Muskelhypothek)

## Gesamtkosten kalkulieren

Neben den reinen Baukosten fallen an:
- Grundstückskosten
- Grunderwerbsteuer (3,5-6,5%)
- Notar- und Grundbuchkosten (~2%)
- Maklergebühren (falls zutreffend)
- Erschließungskosten
- Außenanlagen
- Puffer für Unvorhergesehenes (10-15%)

## Monatliche Belastung berechnen

Faustregel: Maximal 35-40% des Nettoeinkommens für:
- Zins und Tilgung
- Nebenkosten (Heizung, Strom, Wasser)
- Instandhaltungsrücklage

## Angebote vergleichen

- Mehrere Banken anfragen
- Effektivzins vergleichen (nicht nur Nominalzins)
- Auf Sondertilgungsrechte achten
- Zinsbindung wählen (10, 15, 20 Jahre)

## Forward-Darlehen

Bei steigenden Zinsen: Forward-Darlehen für Anschlussfinanzierung sichern.
    `,
  },
  {
    id: 'finanzierung-2',
    category: 'finanzierung',
    title: 'KfW-Förderung verstehen',
    summary: 'Alle wichtigen KfW-Programme für Bauherren im Überblick.',
    readTime: 5,
    content: `
# KfW-Förderung verstehen

Die KfW bietet attraktive Förderprogramme für Bauherren.

## Wohngebäude-Kredit (261)

Für klimafreundliche Neubauten:
- Bis zu 150.000 € pro Wohneinheit
- Günstige Zinssätze
- Tilgungszuschüsse möglich

## Voraussetzungen

- Effizienzhaus-Standard erfüllen
- Qualitätssicherung durch Energieeffizienz-Experten
- Antrag VOR Baubeginn stellen

## Antragsprozess

1. Finanzierungspartner (Bank) einbinden
2. Energieeffizienz-Experten beauftragen
3. Antrag über die Bank stellen
4. Zusage abwarten
5. Mit dem Bau beginnen

## Wichtige Hinweise

- Kombination mit anderen Förderprogrammen prüfen
- Fristen und Nachweise beachten
- Änderungen während der Bauphase melden
    `,
  },

  // Verträge
  {
    id: 'vertraege-1',
    category: 'vertraege',
    title: 'Der Bauvertrag',
    summary: 'Was Sie über Bauverträge wissen müssen.',
    readTime: 6,
    content: `
# Der Bauvertrag

Ein wasserdichter Bauvertrag schützt Sie vor bösen Überraschungen.

## Vertragsarten

### Werkvertrag nach BGB
- Gilt für Einzelgewerke
- Abnahme und Gewährleistung nach BGB

### Verbraucherbauvertrag
- Seit 2018 für private Bauherren
- Besondere Schutzrechte
- Widerrufsrecht 14 Tage

### VOB-Vertrag
- Vergabe- und Vertragsordnung für Bauleistungen
- Kürzere Gewährleistung (4 statt 5 Jahre)
- Eher für gewerbliche Bauherren

## Wichtige Vertragsbestandteile

- Detaillierte Leistungsbeschreibung
- Festpreis oder Kostenschätzung
- Zahlungsplan (max. 90% vor Fertigstellung)
- Fertigstellungstermin mit Vertragsstrafe
- Gewährleistungsregelungen
- Sicherheitsleistungen

## Vor der Unterschrift

- Vertrag von unabhängigem Experten prüfen lassen
- Unklare Formulierungen klären
- Alle Zusagen schriftlich festhalten
    `,
  },
  {
    id: 'vertraege-2',
    category: 'vertraege',
    title: 'Abnahme und Gewährleistung',
    summary: 'Ihre Rechte bei der Bauabnahme und in der Gewährleistungszeit.',
    readTime: 5,
    content: `
# Abnahme und Gewährleistung

Die Abnahme ist ein entscheidender Moment beim Hausbau.

## Die Abnahme

### Bedeutung
- Übergang der Beweislast auf den Bauherrn
- Beginn der Gewährleistungsfrist
- Fälligkeit der Schlusszahlung
- Übergang der Gefahr

### Vorbereitung
- Sachverständigen hinzuziehen
- Checkliste erstellen
- Ausreichend Zeit einplanen
- Mängelprotokoll vorbereiten

### Durchführung
- Gemeinsame Begehung mit dem Bauunternehmer
- Alle Mängel protokollieren
- Frist zur Mängelbeseitigung setzen
- Abnahmeprotokoll unterschreiben

## Gewährleistung

### Fristen
- BGB: 5 Jahre
- VOB: 4 Jahre
- Ab dem Tag der Abnahme

### Mängelansprüche
- Nacherfüllung (Beseitigung oder Neuherstellung)
- Minderung
- Schadensersatz
- Rücktritt (bei erheblichen Mängeln)

### Mängel dokumentieren
- Schriftliche Mängelanzeige
- Fotos anfertigen
- Frist setzen
- Zugang nachweisen
    `,
  },

  // Baurecht
  {
    id: 'baurecht-1',
    category: 'baurecht',
    title: 'Die Baugenehmigung',
    summary: 'Alles Wichtige zum Thema Baugenehmigung.',
    readTime: 5,
    content: `
# Die Baugenehmigung

Ohne Baugenehmigung kein legaler Hausbau.

## Genehmigungspflichtige Vorhaben

- Neubau von Wohngebäuden
- Wesentliche Änderungen am Gebäude
- Nutzungsänderungen
- Je nach Bundesland unterschiedlich

## Erforderliche Unterlagen

- Lageplan
- Bauzeichnungen (Grundrisse, Schnitte, Ansichten)
- Baubeschreibung
- Statik / Standsicherheitsnachweis
- Wärmeschutznachweis
- Schallschutznachweis
- Entwässerungsplan

## Verfahrensablauf

1. Bauvoranfrage (optional, aber empfehlenswert)
2. Bauantrag einreichen
3. Prüfung durch Bauamt
4. Beteiligung Nachbarn/Träger öffentlicher Belange
5. Genehmigung oder Ablehnung

## Kosten

- Abhängig vom Bundesland und Bauvorhaben
- Ca. 0,5-1% der Baukosten
- Zusätzlich: Prüfingenieur für Statik

## Wichtige Hinweise

- Nicht ohne Genehmigung bauen!
- Genehmigung gilt meist 3 Jahre
- Abweichungen vom genehmigten Plan melden
    `,
  },
  {
    id: 'baurecht-2',
    category: 'baurecht',
    title: 'Nachbarrecht beim Bauen',
    summary: 'Was Sie über Grenzabstände und Nachbarrechte wissen sollten.',
    readTime: 4,
    content: `
# Nachbarrecht beim Bauen

Gute Nachbarschaft beginnt mit der Einhaltung von Regeln.

## Grenzabstände

### Landesbauordnung
- Mindestabstand zur Grundstücksgrenze (meist 3 m)
- Ausnahmen für Garagen und Nebengebäude
- Unterschiede je nach Bundesland

### Berechnung
- Gebäudehöhe x Faktor (z.B. 0,4)
- Mindestens 3 m
- Bei Grenzgaragen: meist 0 m möglich

## Nachbarbeteiligung

- Bei Unterschreitung von Grenzabständen
- Bei bestimmten Bauvorhaben
- Nachbar kann Einspruch erheben

## Häufige Konflikte

### Überbau
- Wenn Gebäudeteile über die Grenze ragen
- Duldungspflicht unter bestimmten Voraussetzungen

### Grenzeinrichtungen
- Gemeinsame Nutzung von Zäunen, Mauern, Hecken
- Kostenteilung

### Immissionen
- Lärm, Geruch, Staub während der Bauphase
- Gegenseitige Rücksichtnahme

## Tipps für gute Nachbarschaft

- Frühzeitig informieren
- Bedenken ernst nehmen
- Kompromisse suchen
- Im Zweifelsfall: Mediation
    `,
  },
]

export const getArticlesByCategory = (category: Article['category']) => {
  return articles.filter((article) => article.category === category)
}

export const getArticleById = (id: string) => {
  return articles.find((article) => article.id === id)
}

export const categoryLabels: Record<Article['category'], string> = {
  planung: 'Planung',
  finanzierung: 'Finanzierung',
  vertraege: 'Verträge',
  baurecht: 'Baurecht',
}
