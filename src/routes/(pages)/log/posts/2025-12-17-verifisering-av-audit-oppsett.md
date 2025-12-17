---
title: "nais cli støtter verifisering av audit oppsett for Cloud SQL Postgres"
date: 2025-12-17T10:25:00+01:00
author: Sten Ivar Røkke
tags: [ cli, audit, cloudsql, postgres ]
layout: log
---

:naisely-done: nais cli støtter `verify-audit` for å sjekke om databasen er korrekt satt opp for auditlogging.

Det er nå mulig å sjekke oppsettet i sin Cloud SQL Postgres database med kommandoen:

```shell
nais postgres verify-audit <appname>
```

appname er applikasjonen som eier databasen.

Kommandoen vil verifisere at nødvendige databaseflagg er satt, at pgaudit extension er installert og at applikasjonsbrukeren ikke har logging aktivert.

Kjøring av kommando krever at man er logget inn med gcloud auth og er medlem av teamet som eier databasen.

👉 [Les mer og kom i gang i dokumentasjonen](https://doc.nais.io/operate/cli/reference/postgres#verify-audit)
