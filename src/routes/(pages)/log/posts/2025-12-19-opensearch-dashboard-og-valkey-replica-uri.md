---
title: "OpenSearch Dashboard og Valkey Replica URI"
date: 2025-12-19T15:11:00+01:00
author: Morten Lied Johansen
tags: [opensearch, valkey]
layout: log
---

Ved neste rotering (neste deploy etter helgen antageligvis) av secret for OpenSearch og Valkey, vil det dukke opp noen flere felter.

For alle OpenSearch instanser så vil det nå også være mulig å finne URI, host og port for Dashboardet.
Dette er neppe relevant for applikasjonen direkte, men gjør det lettere for utviklere å se hva disse verdiene er.
Bruk [nais cli](https://docs.nav.cloud.nais.io/persistence/opensearch/how-to/dashboard/) for å få en secret hvor disse verdiene er synlige.
Mer informasjon i [dokumentasjonen](https://docs.nav.cloud.nais.io/persistence/opensearch/reference/#environment-variables).

For Valkey instanser på business eller premium plan (med flere noder), så har de alltid hatt en read replica som tidligere har vært skjult for applikasjonene.
De instansene som har disse vil nå få ekstra felter i secreten for å kunne snakke med replica, for leseoperasjoner.
Mer informasjon i [dokumentasjonen](https://docs.nav.cloud.nais.io/persistence/valkey/reference/#environment-variables).
