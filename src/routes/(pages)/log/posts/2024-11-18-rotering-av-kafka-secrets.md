---
title: "Rotering av Kafka secrets"
date: 2024-11-18T10:08:13+02:00
author: Morten Lied Johansen
tags: [kafka, aiven, sikkerhet]
layout: log
---

I kjølvannet av onsdagens hendelse[^1] med Aiven credentials ønsker vi å rotere alle Kafka credentials som applikasjonene benytter seg av, mest for å øve på hvordan vi ville gjort det hvis det hadde vært credentials på avveie, men også som et føre-var tiltak dersom det skulle vise seg at det ikke er helt korrekt at det ikke var noe lekkasje.

Dette vil skje i form av en resync av applikasjoner som benytter Aiven-tjenester i løpet av dagen, hvor disse får nye secrets, og så sletter vi de gamle secretene.

Det burde på alle måter være en non-event for de aller fleste.

To konsekvenser som kan være nyttig å vite om:

Applikasjoner utenfor nais som benytter det som kalles Protected secrets [^2] vil ikke få sine secrets rotert. Det kan være lurt å vurdere å gjøre dette selv [^3].

Det vil ikke være mulig å rulle tilbake til forrige versjon av applikasjonen ved hjelp av kubectl rollout undo deployment/abc, da dette vil trenge secreten som har blitt slettet. Feilretting må skje i form av å "rulle fremover" inntil neste gang man har deployet applikasjonen normalt.

1. https://nav-it.slack.com/archives/C8MU0M6L8/p1731577353288189
2. https://doc.nav.cloud.nais.io/persistence/kafka/how-to/access-from-non-nais/
3. https://doc.nav.cloud.nais.io/persistence/kafka/how-to/renew-credentials-for-non-nais/
