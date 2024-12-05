---
title: "Nais adventskalender 2024"
description: "La oss gjøre adventstiden mer nais med en Nais adventskalender! Her vil vi hver arbeidsdag legge ut et tips til hvordan du kan bruke Nais-plattformen."
date: 2024-12-01T22:10:00+02:00
author: Naissen
tags: []
theme: advent
---

La oss gjøre adventstiden mer nais med en Nais adventskalender! Her vil vi hver arbeidsdag legge ut et tips til hvordan du kan bruke Nais-plattformen.

---

<img class="number" src="./images/femte.svg" alt="">

## 5. desember

Vi skalerer opp dagens luke så vi kan se hvordan det fungerer.

Noen ganger har man behov for å skalere en app helt ned for litt vedlikehold. Og den enkleste måten å gjøre det på er å bruke kubectl scale.

Hvis du har en app som heter julenissen kan du bruke følgende kommando for å skalere den ned:

```shell
kubectl scale --replicas=0 deployment/julenissen
```

Når så julaften nærmer seg må julenissen skaleres opp, så han kan levere gaver til hele verden:

```shell
kubectl scale --replicas=5 deployment/julenissen
```

Noen ganger har man behov for at en app er skalert ned over lang tid, og da er det nok best å endre det direkte i nais.yaml.

<div class="nisser">
<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">
</div>

---

<img class="number" src="./images/fjerde.svg" alt="">

## 4. desember

Det er gratis med luker i Nais sin adventskalender, men det som ikke er gratis er kostnader knyttet til Nais-plattformen. De beste tingene i livet er ofte gratis, men dessverre ikke Nais. Når man tar i bruk Nais er det ganske mange kostnader man setter i gang. For å kjøre en enkel app trenger man både CPU og minne, hvor CPU er den dyreste delen. Ellers er Postgres den største utgiften Nais har utenom app-ressurser.

Det er flere steder hvor man kan lære mer om kostnader knyttet til plattformen, og ditt teams bruk. For en overordnet oversikt anbefaler vi å ta en titt på Kostnader i sky i Metabase, når du først er inne i Metabase anbefaler vi deg å ta en titt på Teamkostnader i sky som foreløpig gir deg den beste oversikten over dine kostnader. Vi jobber med å vise de samme kostnadene direkte i Nais Console, og hvis du til ditt team, og under Cost.

Ellers er det mange skjulte og glemte kostnader ved å kjøre apper. Skjulte kostnader i denne konteksten er kostnader vi ikke enkelt kan fordele på team. To store utgiftposter her er Kafka og logging/tracing/metrikker! Jo mer data man putter på en topic, eller logger, jo høyere kostnader har vi. Logging/tracing/metrikker skalerer heldigvis automatisk, for eksempel tar vi bare vare på logger i 30 dager. Kafka derimot er manuelt skalert, og der er trenden at vi lagrer mer og mer.

En annen skjult kostnad er utgående trafikk. Dette er noe som koster mye penger, så hvis man bare skal snakke med interne tjenester så er det mye bedre å snakke med services i clusteret. Så i stedet for å gå mot https://rudolf.intern.nav.no, kan du heller gå mot http://rudolf.nordpolen.

Av de glemte kostnadene vil vi nevnte Artifact Registry (der alle dine Docker images havner), og secrets, selv om begge er ganske minimale!

Har man lyst til å ta i et tak, så er appens ressursbruk og glemte databaser lavthengende julegaver.

<img class="illustration" src="./images/ring.svg" alt="">

---

<img class="number" src="./images/tredje.svg" alt="">

## 3. desember

I kalenderes andre luker finner du Tempo, som er Grafana sitt tracing verktøy!

Tracing er en måte å spore en forespørsel når den går gjennom de ulike tjenestene som trengs for å håndtere den. Dette er spesielt nyttig i en mikrotjenestearkitektur, der en enkelt hendelse ofte resulterer i en serie med kall til forskjellige tjenester.

Hvis du bruker Loki som vi snakket om i forrige luke, så kan du logge med trace_id og så vil Grafana automatisk kunne slå opp logger for en trace!

Du kan lese mer om tracing og Tempo på https://docs.nais.io/observability/tracing/.

<img class="illustration" src="./images/reinsdyr.svg" alt="">

---

<img class="number" src="./images/andre.svg" alt="">

## 2. desember

I første luke finner vi Loki! Grafana Loki er et loggaggregeringssystem inspirert av Prometheus og integrert med Grafana. Dette gjør at du kan ha logger og app-metrikker i samme grensesnitt. Ikke overraskende kan du lage dashboard med begge deler!

Du kan lese mer om logging og Loki på https://docs.nais.io/observability/logging/.

<img class="illustration" src="./images/ett-lys.svg" alt="">

---

<style>
    .nisser {
        text-align: center;
	text-wrap: balance;
    }
    .nisser > *{
        display: inline;
    }
    .number {
        margin-inline: auto;
    }
    .illustration {
        margin-inline: auto;
    }
</style>
