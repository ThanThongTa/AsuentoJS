[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

On my way to learning coding basics, I want to create this Javascript app,
where a user can change and save settings for a mathematically computated 3D knot

Anleitung für Mac Development Machines, um ein Zertifikat zu erstellen,
dem self signed certificate zu vertrauen, und den Live Server im VS Code
so einzustellen, dass die Zertifikate verwendet werden.

Kein apache, MAMP, XAMPP, nodeJS oder sonstiger SSL Server erforderlich.
Es muss nur ein Zertifikat vorhanden sein, dem vertraut werden soll.

Die folgenden 5 Schritte sind nicht notwendig, wenn bereits ein Zertifikat vorhanden ist,
und können übersprungen werden. Weiter geht es dann bei Schritt 6, Zertifikat vertrauen.

Benötigt:
Terminal-Zugriff / CommandLine
Homebrew
OpenSSL

Schritt 1: Überprüfen, ob OpenSSL installiert ist:

- Terminal öffnen
- Folgendes Command eingeben: `openssl version`
- wenn eine Version angezeigt wird, ist openssl installiert
- wenn nicht, am besten über HomeBrew nach installieren

Schritt 2: Überprüfen, ob HomeBrew installiert ist:

- dazu im Terminal diesen Command ausführen: `brew --version`
- falls HomeBrew nicht installiert ist, gibt es in GitHub unter
  'Assets' eine .pkg als Installation
  [Homebrew Github](https://github.com/Homebrew/brew/releases)
- .pkg herunterladen und installieren

Schritt 4: Installation von OpenSSL über HomeBrew:

- im Terminal diesen Command ausführen: `brew install openssl@3`

Schritt 5: Zertifikat erstellen

Wenn OpenSSL installiert ist:
Laut [Let's encrypt](https://letsencrypt.org/docs/certificates-for-localhost/)

- Terminal öffnen und folgenden OpenSSL Command ausführen:

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=localhost' -extensions EXT -config <( \
 printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

Es werden zwei Dateien erzeugt. `localhost.key` und `localhost.cert`

Schritt 6: Zertifikat vertrauen

Diese können im Finder in ein Verzeichnis deiner Wahl verschoben werden
(z.B. /User/Student/certs)

- Verzeichnis mit dem Zertifikat im Finder öffnen
- localhost.cert Datei doppelt anklicken
- Wenn eine Anfrage kommt: im Dropdown Login bzw. Anmeldung auswählen und bestätigen
- => KeyChain Access / Schlüsselbundverwaltung öffnet sich
- Name des Zertifikats (localhost) in der Liste suchen und doppelt drauf klicken
- Zertifikat öffnet sich. Register 'Trust' bzw. 'Vertrauen' öffnen
- 'Always trust' bzw. 'Immer vertrauen' auswählen
- Dialog schließen. Wenn nötig, Passwort eingeben und bestätigen.
- Fertig.

Schritt 7: Live Server für den VS Code einstellen

Für die Einstellungen des Live Servers, die settings.json in VS Code öffnen:

- VS Code öffnen
- Command + Komma öffnet die VS Code Settings
- Rechts oben in der Leiste befinden sich drei Icons. Auf das linke Icon klicken.
- die settings.json öffnet sich. Möglicherweise ist sie leer,
  oder es gibt sie noch gar nicht

Einstellungen in der VS Code settings.json für den Live Server:

```
{
    ... other settings ...
  "liveServer.settings.host": "localhost",
  "liveServer.settings.https": {
    "enable": true, //set it true to enable the feature.
    "cert": "/Users/Student/certs/localhost.crt", //full path of the certificate
    "key": "/Users/Student/certs/localhost.key", //full path of the private key
    "passphrase": ""
  },
}
```

Wichtig ist hier, dass die Settings für host genauso heißen muss, wie im Zertifikat angegeben.
In unserem Fall also "localhost". Bei einem unterschiedlichen Namen oder wenn der Eintrag
vergessen wird, wird das Zertifikat als ungültig angesehen vom Browser und es erscheint eine
Fehlermeldung.
