# Slik jobber du i dette repoet

Magnus, som du jobber for, programmerer ikke. Han ser ikke på siden lokalt og kjenner ikke til branches, commits eller pull requests. Han ser bare på nettsiden. Snakk med ham i vanlig norsk og ikke spør ham om git.

Siden finnes i to versjoner:

| Versjon | Adresse | Branch |
|---|---|---|
| Betasiden, for å se endringer før de publiseres | https://beta.bergerudblomsterutsalg.no | `beta` |
| Live-siden, som kundene ser | https://bergerudblomsterutsalg.no | `main` |

Vercel publiserer begge automatisk når du pusher til branchen. Det tar vanligvis under ett minutt.

## Endringer går alltid til betasiden først

Alt Magnus ber om, som «lag dette», «endre åpningstidene» eller «legg inn et nytt bilde», skal til betasiden, ikke live. Det gjelder også når han ikke nevner beta.

1. Start på oppdatert `beta`:
   ```
   git fetch origin
   git checkout beta
   git pull --ff-only origin beta
   ```
2. Gjør endringen og commit den.
3. Push til beta: `git push origin beta`
4. Vent til endringen er ute. Hent siden med `curl -s https://beta.bergerudblomsterutsalg.no/` og sjekk at den nye teksten er der. Prøv igjen hvert 10. sekund i opptil 3 minutter.
5. Fortell Magnus kort hva du endret, og gi ham lenken https://beta.bergerudblomsterutsalg.no. Si at endringen ikke er på live-siden ennå, og at han kan si «publiser» når han er fornøyd.

Flere endringer kan samle seg på beta før han publiserer. Det er helt greit.

## Publisere til live-siden

Når Magnus sier noe som «publiser», «legg det ut», «send til live» eller «dette er godkjent», skal alt som ligger på beta ut på live-siden.

1. Se hva som skal ut: `git fetch origin && git log --oneline origin/main..origin/beta`
   Er listen tom, er det ingenting nytt å publisere. Si det til ham.
2. Fortell ham i vanlige ord hvilke endringer som går ut, slik at han vet om noe han ikke mente å godkjenne er med.
3. Flytt beta inn i main og push:
   ```
   git checkout main
   git pull --ff-only origin main
   git merge --ff-only origin/beta
   git push origin main
   ```
   Feiler `--ff-only`, har noen lagt noe rett på main. Kjør da `git merge origin/beta` (vanlig merge), løs eventuelle konflikter og push.
4. Sørg for at beta er lik main igjen:
   ```
   git checkout beta
   git merge --ff-only main
   git push origin beta
   ```
5. Sjekk at endringen er på https://bergerudblomsterutsalg.no på samme måte som i steg 4 over, og si til Magnus at den er ute.

## Rett på live-siden bare når han ber om det

Bare hvis Magnus tydelig ber om å endre live-siden direkte, for eksempel «rett på live» eller «hopp over beta», committer du på `main` og pusher dit. Etterpå tar du endringen inn i beta med `git checkout beta && git merge main && git push origin beta`, så beta ikke blir liggende bak.

## Angre

- **Forkaste det som ligger på beta og ikke er publisert:** Gjør dette bare når han ber om det, og si først at det sletter alle upubliserte endringer.
  ```
  git checkout beta
  git reset --hard origin/main
  git push --force-with-lease origin beta
  ```
- **Fjerne noe fra live-siden:** Lag en `git revert` av committen på beta, vis ham betasiden og publiser på vanlig måte. Haster det, kan du gjøre revert rett på main og ta det inn i beta etterpå.

## Ikke gjør dette

- Ikke force-push til `main`, og ikke slett `main` eller `beta`.
- Ikke endre `vercel.json`. Den hindrer Google i å vise betasiden i søk.
- Ikke endre DNS, domenet, Vercel-prosjektet eller Gigahost. Det er det Ola som tar seg av.
- Ikke fjern `canonical`, `robots.txt`, `sitemap.xml` eller de strukturerte dataene i `<head>`. De gjør at siden blir funnet på Google.

Detaljer om filene og vanlige endringer står i `README.md`.
