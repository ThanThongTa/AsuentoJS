On my way to learning coding basics, I want to create this Javascript app, where a user can change and save settings for a mathematically computated 3D knot

Nur für Mac Development Machines:

Benötigt:
Terminal-Zugriff / CommandLine
Homebrew
OpenSSL

Überprüfen, ob OpenSSL installiert ist:

- Terminal öffnen
- Folgendes Command eingeben: `openssl version`
- wenn eine Version angezeigt wird, ist openssl installiert
- wenn nicht, am besten über HomeBrew nach installieren

Überprüfen, ob HomeBrew installiert ist:

- dazu im Terminal diesen Command ausführen: `brew --version`
- falls HomeBrew nicht installiert ist, gibt es in GitHub unter 'Assets' eine .pkg als Installation
  [Homebrew Github](https://github.com/Homebrew/brew/releases)
- .pkg herunterladen und installieren

Installation von OpenSSL über HomeBrew:

- im Terminal diesen Command ausführen: `brew install openssl@3`

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

Diese können dann im Finder in ein Verzeichnis deiner Wahl verschoben werden
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

Für die Einstellungen des Live Servers, die settings.json in VS Code öffnen:

- Command + Komma öffnet die VS Code Settings
- Rechts oben in der Leiste befinden sich drei Icons. Auf das linke Icon klicken.
- die settings.json öffnet sich. Möglicherweise ist sie leer, oder es gibt sie noch gar nicht

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
