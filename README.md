# Bergerud Blomsterutsalg

Nettsiden til blomsterutsalget i Hasleveien 51 på Dilling. Vanlig HTML og CSS uten byggesteg.

## Filer

- `index.html` har all tekst og alle bilder
- `stil.css` har farger, skrift og oppsett
- `side.js` viser dagens åpningstid, velger årstid og skjuler oppslag som er gått ut på dato
- `bilder/` og `fonter/` er det som lastes av siden

## Vanlige endringer

Åpningstidene står to steder og må endres begge steder. Tabellen ligger i `index.html`, og tallene som styrer teksten øverst på siden ligger i `side.js`.

Enkeltdager med andre tider, som arrangementer, jul og helligdager, legges i `avvik` øverst i `side.js` (dato og tider, eller `null` for stengt). Da blir teksten «Åpent nå» / «Åpner … i morgen» riktig. Tabellen viser fortsatt de vanlige tidene, så si gjerne fra om avvikene i et oppslag eller en egen seksjon.

Den gule lappen på forsiden er `<aside class="oppslag" data-til="2026-11-22">`. Den forsvinner av seg selv dagen etter datoen.

Siden har tre deler, hver i en `<div class="fane" id="...">` i `index.html`: forsiden (`#forsiden`), åpningstider og adresse (`#besok`) og om oss (`#om-oss`). Menyknappen oppe til høyre (`.meny-knapp` og `<nav class="meny">`) bytter mellom dem, og lenker til noe inne på forsiden, som `#julemarked` og `#utvalget`, ruller dit. Julemarkedet har `data-til` både på menypunktet og på seksjonen, så begge forsvinner etter datoen. Nye arrangementer legges inn på samme måte.

Årstidene bytter av seg selv etter måned. Tekst og bilder for hver årstid ligger i `sesong-panel` i `index.html`.

I november og desember viser `side.js` seksjonen «I drivhuset nå» (`class="sortiment"`, `data-tid="jul"`) i stedet for det vanlige utvalget (`data-tid="ellers"`), og beholder julebildene (`class="jul-bilde"`) først i bildebåndet. Resten av året fjernes julebildene. Kortene i «I drivhuset nå» redigeres direkte i `index.html`.

Kartet er et stillbilde fra Kartverket (`bilder/kart.webp`). Prikken plasseres med prosentverdiene i `.kart-merke` i `stil.css`, så de må regnes ut på nytt hvis kartutsnittet byttes.

Nye bilder bør være rundt 1000 piksler brede og lagres som webp i `bilder/`.

## Se siden lokalt

```
python3 -m http.server
```

Åpne deretter http://localhost:8000

## Publisering

Siden ligger på Vercel. Endringer går først til `beta`, som vises på https://beta.bergerudblomsterutsalg.no, og publiseres ved å ta `beta` inn i `main`, som vises på https://bergerudblomsterutsalg.no. Fremgangsmåten står i `CLAUDE.md`. Betasiden har `noindex` via `vercel.json`, så den ikke dukker opp på Google.

Domenet er registrert hos Gigahost, der DNS-postene som peker til Vercel ligger.
