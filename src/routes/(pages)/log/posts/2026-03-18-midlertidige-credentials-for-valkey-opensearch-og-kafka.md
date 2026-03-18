---
title: "Midlertidige credentials for Valkey, OpenSearch og Kafka"
date: 2026-03-18T12:00:00+01:00
author: Frode Sundby og Johnny Fredheim Horvi
tags: [cli, valkey, opensearch, kafka, aiven]
layout: log
---

Vi har lagt til tre nye kommandoer i Nais CLI som gir deg midlertidige credentials for Valkey, OpenSearch og Kafka. Dette er nyttig for eksempel ved lokal utvikling eller feilsøking der du trenger direkte tilgang til en av disse tjenestene.

## Nye kommandoer

```bash
nais valkey credentials <instansnavn> -e <miljø> -p <READ|WRITE|READWRITE|ADMIN> --ttl <varighet>
nais opensearch credentials <instansnavn> -e <miljø> -p <READ|WRITE|READWRITE|ADMIN> --ttl <varighet>
nais kafka credentials -e <miljø> --ttl <varighet>
```

Credentials skrives til stdout som miljøvariabler, klare til å sources direkte. For Kafka kan du i tillegg bruke `--output kcat` eller `--output java` for å få ferdig konfigurerte filer.

Maksimal levetid er 30 dager. All bruk logges i aktivitetsloggen.

## Erstatter `nais aiven`

Disse kommandoene erstatter de gamle `nais aiven create`-kommandoene, som er markert som deprecated. Den gamle flyten var avhengig av direkte tilgang til Kubernetes-hemmeligheter, noe som ikke lenger er tilgjengelig. De nye kommandoene går via Nais API og krever kun at du er autentisert med `nais login`.

Oppdater til siste versjon av Nais CLI for å ta i bruk de nye kommandoene.
