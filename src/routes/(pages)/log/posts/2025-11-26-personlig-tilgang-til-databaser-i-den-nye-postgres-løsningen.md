---
title: "Personlig tilgang til databaser i den nye Postgres-løsningen"
date: 2025-11-26T12:30:00+01:00
author: Morten Lied Johansen
tags: [postgres, cli]
layout: log
---

*Personlig tilgang til databaser i den nye Postgres-løsningen*

Da vi annonserte den nye Postgres-løsningen var det en del ting som ikke var på plass ennå.

Nå har vi løst en av disse tingene: Tilgang til databasen fra utviklermaskin (med naisdevice).

Hvis man har en applikasjon som benytter den nye postgres-løsningen, kan man bruke noen av de samme kommandoene for tilgang som man bruker for CloudSQL.

På grunn av måten den nye løsningen oppretter databaser og roller, så er det ikke lenger nødvendig å bruke `grant`, `prepare`, `users` eller `revoke`.
Alt man trenger er `proxy` eller `psql`:

```shell
nais postgres proxy <app-navn>  # Setter opp en proxy, som man kan koble til med ønsket postgres-klient.
nais postgres psql <app-navn>   # Setter opp en proxy, og starter psql for deg.
```

*Hvordan fungerer det?*

Alle medlemmer i teamet som eier databasen blir lagt til i databasen med en egen rolle for menneskelige brukere.

Denne rollen har lese- og skrive-tilganger ut av boksen. Den har ikke tilgang til å gjøre strukturelle endringer, da slike bør gjøres gjennom applikasjonen.

Når man logger inn i databasen, så benyttes et kortlevd (1 time) token fra login.nais.io, som man får ved hjelp av `nais auth login --nais`.

*Videre planer for den nye postgres-løsningen?*

DBA tilgang:
I tillegg til at utviklere trenger tilgang til basen så vil det være situasjoner hvor man trenger hjelp av en DBA med utvidede tilganger.
Det er derfor planlagt å lage støtte for at DBA'ene skal kunne gå inn i databasene med Superuser-tilgang, men at teamet som eier databasen må gi dem tidsbegrenset tilgang.
Her må vi fortsatt finne ut av noen detaljer rundt hvordan det skal fungere og lage mekanismene teamet skal benytte.

Vise frem i Console:
Vi planlegger å vise de nye postgres clusterne i Console, på samme måte som CloudSQL instansene.

Katastrofebackups:
Vi tar i dag backups (nattlig og PITR) men disse lagres kun i GCP.
Vi vil lage løsninger for å få lagret nattlige backups til et annet sted, slik at vi har mulighet for restore i en katastrofe hvor GCP ikke er tilgjengelig.
Dette vil antageligvis bygges inn i løsningen som allerede benyttes for CloudSQL.

Migreringshjelp:
Vi skal se på mulighetene for å lage verktøystøtte for å migrere fra CloudSQL til Postgres, men dette er fortsatt på tegnebordet så helt nøyaktig hvordan det blir er vanskelig å si.

