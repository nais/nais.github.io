---
title: "nais cli støtter verifisering av audit oppsett for Cloud SQL Postgres"
date: 2025-12-17T10:25:00+01:00
author: Sten Ivar Røkke
tags: [ cli, audit, cloudsql, postgres ]
layout: log
---

*nais cli støtter `verify-audit` for å sjekke om databasen er korrekt satt opp for auditlogging.*

Det er nå mulig å sjekke oppsettet i sin Cloud SQL Postgres database. 
Det gjør det litt enklere å verifisere at nødvendige parametere er satt riktig. 

Dette gjelder da spesielt for de som har applikasjoner som er underlagt krav om audit logging.

*Hvordan gjøres det?*

```shell
nais postgres verify-audit <appname> [-n team-namespace] [--context gcp-context]
```
appname må benyttes og angir applikasjonen som eier databasen

team-namespace og gcp-context er valgfrie parametere som spesifiserer hvilket namespace og GCP-cluster som skal benyttes.

*Hva gjør kommandoen?*

- Verifiserer nødvendige databaseflagg og viser verdien av disse
- Verifiserer pgaudit extension
- Verifiserer konfigurasjon for applikasjonsbrukerens logging

*Hvilke forutsetninger gjelder?*

- Innlogget bruker
- Medlem av teamet som eier databasen

👉 [Les mer og kom i gang i dokumentasjonen](https://doc.nais.io/operate/cli/reference/postgres#verify-audit)
