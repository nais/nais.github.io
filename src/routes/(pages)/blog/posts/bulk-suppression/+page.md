---
title: "Rydd opp i falske positiver på en gang"
description: "Du kan nå undertrykke en sårbarhet for flere workloads i en operasjon"
date: 2026-05-27T15:00:00+02:00
draft: false
author: Youssef Bel Mekki
tags: [security, vulnerabilities]
language: no
---

Team med mange workloads som deler samme image ser ofte den samme CVE-en flagget flere ganger. Tidligere måtte man undertrykke hver enkelt manuelt en om gangen. For et team med ti workloads betyr en falsk positiv minst ti klikk.

Det er nå mulig å undertrykke en sårbarhet for flere workloads i en operasjon direkte fra Console. Funksjonen finner du på teamsiden under "Vulnerabilities" ved å bruke søkefeltet "Search for vulnerability". Søk opp sårbarheten, velg hvilke workloads som er berørt, angi årsak, og det er gjort.

Siden undertrykkingen er knyttet til selve imaget og ikke den enkelte workloaden, trenger man bare å gjøre det en gang per unikt image selv om mange workloads bruker det. Endringen vises umiddelbart i sårbarhetsoversikten.

Dette er en del av det løpende arbeidet med å gjøre sårbarhetshåndtering mindre støyete og mer handlingsrettet for team på Nais.
