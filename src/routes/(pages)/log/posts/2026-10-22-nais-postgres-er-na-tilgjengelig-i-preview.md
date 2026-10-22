---
title: "Nais Postgres er nå tilgjengelig i Preview"
date: 2026-10-22T10:30:00+02:00
author: Nais-teamet
tags: [postgres, preview, console, cli]
layout: log
---

Nå kan dere ta i bruk Nais Postgres for nye databaser i både utvikling og produksjon.
Dere får PostgreSQL 18, administrert av plattformen, med selvbetjent opprettelse, tilgangsstyring, sikkerhetskopiering og gjenoppretting.

## Databasen som en selvstendig ressurs

En endring fra tidligere er at Postgres-databasen nå er en selvstendig ressurs med sin egen livssyklus, og ikke underordnet en workload.
Det betyr at dere oppretter og administrerer databasen separat fra applikasjoner og jobber, gjennom [Nais Console](https://console.nais.io), [Nais CLI](https://cli.nais.io) eller et [manifest i Git](https://docs.nais.io/persistence/postgres/reference/example/).

Applikasjoner og jobber får tilgang ved å [referere til databasen i manifestet sitt](https://docs.nais.io/persistence/postgres/how-to/use-in-workload/).
En applikasjon eller jobb kan kobles til flere databaser, og flere applikasjoner og jobber i teamet kan bruke samme database.

## Sikkerhetskopiering og auditlogging som standard

Plattformen tar automatisk backup som beholdes i 30 dager.
Dere kan gjenopprette til et tidligere tidspunkt innenfor denne perioden, uten å overskrive den eksisterende databasen.

Auditlogging for personlige databasebrukere kommer også ut av boksen og kan ikke skrus av.
Dette omfatter lesing, skriving, skjemaendringer og rolleendringer, inkludert SQL-parametere.

## Personlig tilgang ved behov

Når dere trenger å undersøke data eller feilsøke, kan man via Nais CLI få tilgang med sin egen personlige bruker.
Tilgangen opprettes når dere ber om den, og utløper automatisk.
Dere oppgir en begrunnelse og velger nødvendig tilgangsnivå, i stedet for å bruke applikasjonens credentials.
Man trenger ikke lenger naisdevice, `kubectl` eller `gcloud` for å koble til.

## Hva betyr Preview?

Vi åpner for reell bruk, også i produksjon, men dette er fortsatt **Preview**.
API-et og de støttede arbeidsflytene kan endre seg noe, og ikke alle aspekter er testet i skala med ekte brukere ennå.
Ta dette med i vurderingen av om løsningen passer for tjenesten deres.

## Hva med Cloud SQL?

For Cloud SQL er det foreløpig ingen endring, og vi oppfordrer ingen til å migrere ennå.
For nye tjenester anbefaler vi Nais Postgres.

Basert på erfaringene vi gjør oss underveis vurderer vi skjebnen og evt. migrering og verktøystøtte rundt dette.

## Kom i gang

Opprett deres første Nais Postgres rett i [Console](https://console.nais.io), med `nais postgres create` i [Nais CLI](https://cli.nais.io) eller med et [manifest](https://docs.nais.io/persistence/postgres/reference/example/).
Se [dokumentasjonen](https://docs.nais.io/persistence/postgres/) mer info.

Tilbakemeldinger i #nais eller på DM settes stor pris på.
