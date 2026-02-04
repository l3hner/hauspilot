# hauspilot

Ihr digitaler Baubegleiter - Eine moderne Webanwendung zur Organisation und Verwaltung von Hausbau-Projekten.

## Features

- **Bauphasen-Tracker**: 10 vordefinierte Bauphasen mit Aufgabenverwaltung
- **Terminplaner**: Kalender- und Listenansicht für alle Bautermine
- **Budgetmonitor**: Ausgaben erfassen und Budget im Blick behalten
- **Bautagebuch**: Baufortschritt dokumentieren mit Text und Fotos
- **Ratgeber**: Hilfreiche Artikel zu Planung, Finanzierung, Verträgen und Baurecht
- **Dashboard**: Alle wichtigen Informationen auf einen Blick

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui Komponenten
- Framer Motion
- Lucide Icons
- Firebase Auth & Firestore

## Lokale Entwicklung

### 1. Dependencies installieren

```bash
cd hauspilot
npm install
```

### 2. Firebase einrichten

1. Erstelle ein neues Firebase-Projekt unter [console.firebase.google.com](https://console.firebase.google.com)
2. Aktiviere **Authentication** mit E-Mail/Passwort
3. Erstelle eine **Firestore Database** (im Test-Modus für Entwicklung)
4. Gehe zu Projekteinstellungen > Allgemein > Deine Apps > Web-App hinzufügen
5. Kopiere die Firebase-Config-Werte

### 3. Umgebungsvariablen konfigurieren

Erstelle eine `.env` Datei im Projektordner:

```bash
cp .env.example .env
```

Fülle die Werte aus:

```
VITE_FIREBASE_API_KEY=dein_api_key
VITE_FIREBASE_AUTH_DOMAIN=dein_projekt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dein_projekt_id
VITE_FIREBASE_STORAGE_BUCKET=dein_projekt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=deine_sender_id
VITE_FIREBASE_APP_ID=deine_app_id
```

### 4. Firestore-Regeln (Entwicklung)

Für die Entwicklung kannst du folgende Regeln in der Firebase Console setzen:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Wichtig**: Für Produktion sollten spezifischere Regeln erstellt werden.

### 5. App starten

```bash
npm run dev
```

Die App läuft unter [http://localhost:5173](http://localhost:5173)

## Projektstruktur

```
src/
├── components/
│   ├── ui/           # shadcn/ui Komponenten
│   ├── layout/       # App Shell, Sidebar, Navigation
│   └── landing/      # Landingpage Komponenten
├── contexts/         # Auth & Project Context
├── data/             # Statische Daten (Artikel)
├── lib/
│   └── firebase/     # Firebase Konfiguration
├── pages/            # Seitenkomponenten
└── types/            # TypeScript Definitionen
```

## Firestore Datenmodell

- `users`: Benutzerprofile
- `projects`: Bauprojekte
- `phases`: Bauphasen (automatisch angelegt)
- `tasks`: Aufgaben pro Phase
- `events`: Termine
- `expenses`: Budget-Einträge
- `diaryEntries`: Bautagebuch-Einträge

## Scripts

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktions-Build erstellen
- `npm run preview` - Produktions-Build lokal testen
