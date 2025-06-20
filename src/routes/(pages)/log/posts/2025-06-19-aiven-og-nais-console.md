---
title: Nye Aiven features i Console
date: 2025-06-19T10:00:00+02:00
author: Kyrre Havik
tags: [aiven, kafka, kost, vedlikehold, maintenance]
layout: log
---

Vi har nå fått to nye features relatert til Aiven inn i Console!

## Kafkakost

Vi har lenge hatt lyst til å finne en måte å bevisstgjøre kostnadene til Kafka for teamene, og nå lanserer vi første versjon.
Siden vi kjører Kafka som en instans, så er det ikke noen direkte kobling mellom et teams bruk, og en kostnad.
Derfor har vi laget vår egen forenklet fordeling, som vi tenker gir en pekepinne på hva slags kostnader et team har knyttet til Kafka.

Måten vi har gått frem på er:
- 50% av den totale kostnaden til Kafka fordeles likt på alle team som bruker Kafka.
  Dette betyr at jo flere som bruker Kafka, jo billigere blir det for alle.
- De resterende 50% av kostnadene blir fordelt på teamets samlete størrelse på topics.
  Dette betyr at mer data koster mer penger.

Denne fordelingen er ikke skrevet i stein, og det kan hende vi vil gjøre noen mindre justeringer fremover.
Kom gjerne med tilbakemeldinger!

## Vedlikehold

Du kan nå se vedlikeholdsmeldinger for OpenSearch og Valkey instanser.
Disse kommer i to varianter, anbefalt, og påkrevd vedlikehold.
De påkrevde vil bli kjørt i neste vedlikeholdsvindu, mens de anbefalte vil bli liggende til det kommer et påkrevd vedlikehold.
Man har også muligheten til å starte vedlikehold tidligere enn planlagt ved å trykke på `Run all maintenance`.

![](/log/opensearch-maintenance.png)
