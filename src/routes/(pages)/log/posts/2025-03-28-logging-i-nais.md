---
title: Veien videre for logg i Nais
date: 2025-03-28T14:00:00+02:00
author: Hans Kristian Flaatten
tags: [nais, logging, grafana, loki]
layout: log
---

De siste årene har det vært gjort en betydelig innsats for å forbedre observabilitet i Nais. Først frontend observabilitet med Faro, og så helhetlig sporing på tvers av applikasjoner med OpenTelemetry Tracing. Alt sammen har integret sømløst med Grafana, som er Nais sitt fortrukne observabilitetsverktøy.

Det har i lengre tid vært mulig for teamene å sende applikasjonslogger til Grafana. Vi tar dette nå et skritt videre og gjør det til standard i Nais. Dette vil gi deg som utvikler en helhetlig oversikt over hva som skjer i applikasjonen din, og gjøre det enklere å feilsøke og forstå hva som skjer i systemet.

## Hva er nytt?

Fra og med XX april 2025 vil alle applikasjoner i Nais sende logger til Grafana som standard. Dette vil gi deg tilgang til en rekke nye funksjoner og muligheter for å analysere og visualisere loggene dine, ikke minst kunne integrere logger på en enkel måte inn i Grafana Dashboards.

I en overgangsperiode vil det være mulig å sende logger til både Grafana og Elastic for å sikre en smidig overgang.

## Hva må du gjøre?

Du kan allerede i dag ta i bruk den nye loggfunksjonaliteten i Nais. For å gjøre dette må du oppdatere konfigurasjonen til din applikasjon [på følgende måte](https://docs.nais.io/observability/logging/how-to/loki). Hvis du i overgangsperioden ønsker å sende logger til både Grafana og Elastic, må du oppdatere konfigurasjonen din til å sende logger begge steder.

## Hvorfor gjør vi dette?

Vi har valgt å gjøre denne endringen for å gi deg som utvikler en bedre opplevelse når det kommer til observabilitet. Ved å samle all observabilitet i Grafana, kan vi tilby en mer helhetlig løsning som er enklere å bruke og gir deg bedre innsikt i hva som skjer i applikasjonen din og systemet som helhet på tvers av logger, tracing og metrics.

I tillegg vil dette gjøre det enklere for oss å vedlikeholde og utvikle nye funksjoner i Nais, da vi kan fokusere på én plattform i stedet for flere.

## Hva med secure logs?

Secure logs vil bli erstattet med en ny løsning som heter Team logs. Dette vil gi deg den samme muligheten til å sende logger som ikke skal være tilgjenglig for andre team. Denne løsningen baserer seg på Google Cloud Logging og vil gi deg bedre kontroll over hvem som har tilgang til loggene.

[Google Cloud Logging](https://cloud.google.com/logging) er en del av Google Cloud Platform og bor i hvert enkelt team sitt Google Cloud prosjekt og gir deg muligheten til å lagre, søke og analysere loggene dine på en enkel måte. Dette er samme sted som mange av audit loggene fra Nais også blir lagret.

## Hva skjer videre?

Vi kommer til å sette opp flere informasjonsmøter og workshops for å hjelpe deg med å ta i bruk den nye loggfunksjonaliteten i Nais. Vi vil også oppdatere dokumentasjonen vår for å gjøre det enklere for deg å komme i gang.
