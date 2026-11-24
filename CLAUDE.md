# Slik jobber du i dette repoet

Magnus, som du jobber for, programmerer ikke. Han ser ikke på siden lokalt og kjenner ikke til branches, commits eller pull requests. Han ser bare på nettsiden. Snakk med ham i vanlig norsk, ikke spør ham om git, og gjør git-arbeidet selv.

Siden finnes i to versjoner:

| Versjon | Adresse | Branch |
|---|---|---|
| Betasiden, for å se endringer før de publiseres | https://beta.bergerudblomsterutsalg.no | `beta` |
| Live-siden, som kundene ser | https://bergerudblomsterutsalg.no | `main` |

Vercel publiserer begge automatisk når en branch oppdateres. Det tar vanligvis under ett minutt.

**Hovedregel:** Endringer går til `beta`. Ingenting går til `main` før Magnus sier at det skal publiseres, med mindre han tydelig ber om å gå rett på live-siden.

## 1. Lag endringen på betasiden

Dette gjelder alt Magnus ber om, som «lag dette», «endre åpningstidene» eller «legg inn et nytt bilde», også når han ikke nevner beta.

1. Bygg på det som ligger på beta, ikke på main:
   ```
   git fetch origin
   git merge origin/beta
   ```
   Står du på en egen arbeidsbranch, for eksempel `claude/...`, gjør du dette i den branchen før du endrer noe.
2. Gjør endringen og commit den.
3. Få endringen inn i `beta`:
   - Prøv først å pushe rett dit: `git push origin HEAD:beta`
   - Får du ikke lov til det, pusher du arbeidsbranchen din og lager en pull request med **base `beta`**, ikke `main`. Slå den sammen selv med en vanlig merge. Hvis du ikke kan slå den sammen selv, ber du Magnus trykke på knappen for å slå sammen. Si at det bare oppdaterer betasiden.
4. Vent til endringen er ute. Hent `https://beta.bergerudblomsterutsalg.no/` med `curl -s` og sjekk at den nye teksten er der. Prøv igjen hvert 10. sekund i opptil 3 minutter.
5. Fortell Magnus kort hva du endret, og gi ham lenken https://beta.bergerudblomsterutsalg.no. Si at endringen ikke er på live-siden ennå, og at han kan si «publiser» når han er fornøyd.

Flere endringer kan samle seg på beta før han publiserer. Det er helt greit.

## 2. Publiser til live-siden

Når Magnus sier noe som «publiser», «legg det ut», «send til live» eller «dette er godkjent», skal alt som ligger på beta ut på live-siden.

1. Se hva som skal ut:
   ```
   git fetch origin
   git log --oneline origin/main..origin/beta
   ```
   Er listen tom, er det ingenting nytt å publisere. Si det til ham.
2. Fortell ham i vanlige ord hvilke endringer som går ut, slik at han vet om noe han ikke mente å godkjenne er med.
3. Oppdater `main` med det som ligger på `beta`:
   - Prøv først: `git push origin origin/beta:main`
   - Avvises det, lager du en pull request med **base `main` og head `beta`** og slår den sammen med en vanlig merge. Kan du ikke slå den sammen selv, ber du Magnus trykke på knappen. Si at det publiserer endringene på live-siden.
4. Sørg for at `beta` har alt som ligger på `main`, også merge-committen:
   - `git fetch origin && git push origin origin/main:beta`
   - Avvises det, lager du en pull request med base `beta` og head `main` og slår den sammen.
5. Sjekk at endringen er på https://bergerudblomsterutsalg.no på samme måte som i steg 1.4, og si til Magnus at den er ute.

## Rett på live-siden bare når han ber om det

Bare hvis Magnus tydelig ber om å endre live-siden direkte, for eksempel «rett på live» eller «hopp over beta», går endringen til `main`, enten ved push eller ved en pull request med base `main`. Etterpå tar du `main` inn i `beta` som i steg 2.4, så beta ikke blir liggende bak.

## Angre

- **Forkaste det som ligger på beta og ikke er publisert:** Gjør dette bare når han ber om det, og si først at det sletter alle upubliserte endringer. Sett `beta` lik `main`: `git push --force-with-lease origin origin/main:beta`. Får du ikke lov, lag en commit på beta som tilbakestiller filene til slik de er på main (`git checkout origin/main -- .`), og få den inn i beta som i steg 1.3.
- **Fjerne noe fra live-siden:** Lag en `git revert` av endringen, få den inn på beta, vis ham betasiden og publiser på vanlig måte. Haster det, kan du gå rett på live som beskrevet over.

## Ikke gjør dette

- Ikke lag pull requests mot `main` for vanlige endringer. De går til `beta`.
- Ikke force-push til `main`, og ikke slett `main` eller `beta`.
- Ikke endre `vercel.json`. Den hindrer Google i å vise betasiden i søk.
- Ikke endre DNS, domenet, Vercel-prosjektet eller Gigahost. Det er det Ola som tar seg av.
- Ikke fjern `canonical`, `robots.txt`, `sitemap.xml` eller de strukturerte dataene i `<head>`. De gjør at siden blir funnet på Google.

Detaljer om filene og vanlige endringer står i `README.md`.
