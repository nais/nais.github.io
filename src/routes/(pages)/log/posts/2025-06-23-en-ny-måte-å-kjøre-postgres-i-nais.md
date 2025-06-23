---
title: "En ny måte å kjøre postgres i Nais"
date: 2025-06-23T14:10:00+02:00
author: Morten Lied Johansen
tags: [postgres, cloudsql, experimental]
layout: log
---

*En ny måte å kjøre postgres i Nais :postgresql:*

I en periode har vi i Nais jobbet med å finne en mer kostnadseffektiv måte å kjøre Postgres i Nais.
Per i dag så står CloudSQL for omtrent to tredjedeler av alle kostnader i Nais, og vi har derfor sett på alternative løsninger. :money_with_wings:
Når mange i tillegg opplever at utvikleropplevelsen med CloudSQL er under middels, så har vi sett på alternativer utenfor Google Cloud. :old-man-yells-at-gcp:

Vi har landet på at vi vil tilby Postgres i Nais via en postgres-operator utviklet av [Zalando](https://github.com/zalando/postgres-operator). :womans_clothes:
Det vil si at Postgres vil kjøre i Kubernetes clusteret vårt, og dermed komme mye nærmere applikasjonene.
På den annen side så har vi lite erfaring med å kjøre stateful workloads i Nais, og dette vil være den mest krevende formen for stateful workloads: databaser.
Det er derfor lagt opp til at vi fremover skal jobbe med å forbedre løsningen, men også lære mer om hvordan det er best å kjøre slike løsninger i Nais. :student:

Siden vi i Nais ikke er Postgres-eksperter, og med denne løsningen ikke kan lene oss på Google Support, så er løsningen satt opp i tett samarbeid med Team Database som har lang erfaring med å drifte Postgres databasene våre on-prem.

Denne løsningen er i dag i en eksperimentell fase, og vi ønsker å invitere alle som er interessert til å teste den ut. :scientist:

I løpet av høsten skal vi gjøre ytterligere forbedringer, slik at løsningen etterhvert vil være en fullverdig erstatning for applikasjoner som ønsker å bruke Postgres.

Har du lyst til å teste ut løsningen, så kan du lese mer om den i [dokumentasjonen](https://docs.nais.io/persistence/postgresql/).
