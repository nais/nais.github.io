---
title: "PostgreSQL i Nais - To steg frem og ett tilbake"
date: 2026-04-29T09:27:00+02:00
author: Morten Lied Johansen
tags: [postgres, cloudsql, experimental]
layout: log
---

Som vi annonserte i [juni i fjor](#2025-06-23-en-ny-m%C3%A5te-%C3%A5-kj%C3%B8re-postgres-i-nais), så jobber vi med en helt ny måte å kjøre PostgreSQL i Nais.

I løpet av året har vi lært mye, implementert og endret mye i bakgrunnen og gradvis bygget opp løsningen til noe som nærmer seg produksjonsklart.

For ca. 8 uker siden tok vi en fot i bakken og oppsummerte hva vi hadde lært, hva vi følte manglet, og hvordan vi skulle fortsette.
Oppsummeringen er at vi har fortsatt god tro på at det er mye å hente på å kjøre PostgreSQL i clusterne, både i form av kostnadsbesparelse, utvikleropplevelse og plattformdrift.
Vi er også ganske fornøyd med utviklergrensesnittet vi har lagt opp til, med en `Postgres` ressurs som beskriver databasen og en referanse fra `Application`/`Naisjob`.

Det vi derimot har mistet litt troen på er at Zalando sin postgres-operator er veien å gå.
Zalando har skiftet fokus til å kun fokusere på sine egne behov (og ikke open-source community), og der vi opplever problemer med operatoren så er det avhengig av at Zalando har det samme problemet for at det skal bli tatt tak i.

Før vi landet på Zalando i første omgang så evaluerte vi også [cloudnative-pg](https://cloudnative-pg.io), men kom til at prosjektet var for ungt og ustabilt.
Etter at vi fant ut at vi ikke var helt fornøyd med Zalando så tok vi en kort test av cloudnative-pg, for å se om de hadde løst noen av problemene vi fant i forrige evaluering for godt over et år siden.
Konklusjonen etter den testen er at vi har lyst til å prøve cloudnative-pg i stedet for Zalandos postgres-operator.

Det betyr at vi må ta noen steg tilbake og skrive om en del av det vi har gjort så langt, og eksisterende pilotbrukere vil være nødt til å migrere databasene sine når vi kommer så langt.
Inntil vi er klare med endringene så ønsker vi at teamene venter med å opprette *nye* databaser på denne løsningen.

Planen nå er at vi frem mot sommeren skal jobbe med å implementere cloudnative-pg i plattformen der vi tidligere har brukt Zalando postgres-operator.
Eksisterende brukere vil kunne fortsette med de basene de har inntil videre, men vil nok bli anmodet om å migrere etter sommeren en gang.
Vi kommer til å se på om det kan gjøres automatisk på noe vis, vi vil kontakte aktuelle team med mer detaljer når det er klart.

Vi forventer å ha produksjonsklare databaser tilgjengelig tidlig i høst.
