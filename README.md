[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Die Grundidee ist inspiriert von [Daniel Shiffman](https://thecodingtrain.com/)'s [Video über 3D Knoten](https://youtu.be/r6YMKr1X0VA?si=yIIioADU-ZaG7ccO)
und [Paul Bourke](https://paulbourke.net/geometry/)'s [Artikel über Knoten](https://paulbourke.net/geometry/knots/)
Die Glassmorphism Effekte sind zum großen Teil von [Online Tutorials](https://www.youtube.com/playlist?list=PL5e68lK9hEzdn0O-OkMNNKHmP1iU6e6Dj)
und [Kevin Powell](https://www.youtube.com/@KevinPowell) inspiriert

Dies ist meine Projektarbeit für den Javascript Aufbaukurs mit Klaus Domass bei CimData

In dieser Anwendung kann ein User einen 3D Knoten anzeigen und verschiedene Parameter verändern.
Je nachdem, mit welchen mathematischen Formeln die einzelnen Punkte der Knoten berechnet werden,
habe ich die Knoten in 3 Kategorien unterteilt und diese mit einem Namen versehen. Diese Namen
sind nicht unbedingt mathematisch korrekt.

Je nach Kategorie gibt es links verschiedene Slider, mit denen der User die Parameter für den Knoten
ändern kann. Bei jeder Änderung zeichnet sich dann der Knoten neu.

Der Knoten kann auch in die IndexedDB gespeichert und wieder geladen werden.

Beim erstmaligen Start der Anwendung werden eine Reihe von Knoten in die IndexedDB gespeichert.

Knoten können aus der rechts angezeigten Liste geladen werden. Sie können dort auch aus der
Liste und aus der IndexedDB gelöscht werden.

Der Install Button erstellt Offline Version als Chrome App.

Diese Anwendung verwendet p5js und WebGL als Grundlage für die Darstellung der Knoten. p5js
stellt auch Orbital Controls zur Verfügung, damit der User mit der Maus hinein und hinaus zoomen
kann, und den Knoten drehen kann.
