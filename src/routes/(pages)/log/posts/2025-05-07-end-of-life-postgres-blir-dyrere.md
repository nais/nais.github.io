---
title: Bruk av PostgreSQL versjoner som er End-of-Life blir dyrere
date: 2025-04-07T10:00:00+02:00
author: Morten Lied Johansen
tags: [nais, cloudsql, postgres, gcp, end-of-life]
layout: log
---

Det er fortsatt en del applikasjoner som bruker Postgres 12 i GCP.
Vi minner om at Postgres 12 egentlig hadde End-of-Life 21. november 2024, og det er anbefalt å oppgradere til nyere versjoner.

Vi har også fått varsel fra Google om at bruk av Postgres-versjoner som har passert End-of-Life vil ble vesentlig dyrere fra 1. mai.
Kjappe overslag antyder omtrent $115 ekstra i måneden per CPU.

Vi anbefaler alle team om å oppgradere Postgres jevnlig, for å unngå å havne alt for langt på etterskudd.
Nyeste major versjon av Postgres er 17.

For å oppgradere kan man velge en av disse tilnærmingene:

* Gjøre en enkel in-place oppgradering: https://docs.nais.io/persistence/postgres/how-to/upgrade-postgres/, eller
* Gjøre en migrering til ny instans: https://docs.nais.io/persistence/postgres/how-to/migrate-to-new-instance/
