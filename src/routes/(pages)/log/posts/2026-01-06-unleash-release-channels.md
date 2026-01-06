---
title: "Velg Unleash-versjon med Release Channels"
date: 2026-01-06T09:00:00+01:00
author: Hans Kristian Flaatten
tags: [unleash, console, feature-toggling]
layout: log
---

Vi har gleden av å lansere en ny funksjon i Nais Console som gir teamene mer kontroll over sin Unleash-instans: **Release Channels**! 🎉

Med release channels kan du nå selv velge hvilken versjon av Unleash feature toggle-serveren teamet ditt skal kjøre – direkte fra Console.

## ⚠️ Viktig: Unleash v5 er End of Life

**Unleash v5 er ikke lenger støttet.** Hvis teamet ditt fortsatt kjører v5, anbefaler vi sterkt at dere oppgraderer til v6 eller v7 så snart som mulig.

**5. februar 2026 vil alle Unleash-instanser som fortsatt kjører v5 automatisk bli oppgradert til v6.**

## Tilgjengelige Release Channels

### unleash-v7 (anbefalt)

Dette er den nyeste versjonen og anbefales for alle team. Høydepunkter:

- 🧹 **Automatiske opprydningspåminnelser** – få varsler når feature flags bør fjernes
- 🔗 **Eksterne lenker på feature flags** – koble flags til metrics, analytics eller issue trackers
- 🎨 **Farger på tags** – enklere visuell differensiering av flags
- 📊 **Forbedret flags-oversikt** – bedre oversikt over livssyklus og status

**Viktige endringer fra v6:**

- Flere deprecated API-endepunkter er fjernet
- "Search" er omdøpt til "Flags overview"
- "Health" er omdøpt til "Technical Debt"

### unleash-v6 (støttet til juli 2026)

Et godt alternativ hvis du trenger litt mer tid før du går til v7:

- 🎯 **Nytt sidemeny-design** – enklere navigasjon
- 🔍 **Forbedret prosjektoversikt** – bedre søk og filtrering av feature flags
- 📝 **"Feature toggle" omdøpt til "feature flag"** – oppdatert terminologi

**Viktige endringer fra v5:**

- Environment variants er faset ut (bruk strategy variants i stedet)
- Legacy `/api/features` endpoint er fjernet

## Slik bytter du Release Channel

1. Gå til teamets Unleash-side i [Nais Console](https://console.nav.cloud.nais.io/)
2. Finn "Release Channel" og klikk på blyant-ikonet
3. Velg ønsket channel fra dropdown-menyen

![Velg Release Channel for Unleash i Nais Console](/log/unleash-release-channels.png)

## Sjekk SDK-kompatibilitet før oppgradering

Før du bytter til en nyere versjon, er det viktig å sjekke at applikasjonene dine bruker SDK-versjoner som støtter den nye Unleash-versjonen. Se [Unleash SDK-kompatibilitetsmatrise](https://docs.getunleash.io/reference/sdks#server-side-sdk-compatibility-table) for detaljer.

## Lenker og hjelp

- [Unleash-dokumentasjon på Nais](https://docs.nais.io/services/feature-toggling)
- [Unleash upgrade guide](https://docs.getunleash.io/using-unleash/deploy/upgrading-unleash)
- [SDK-kompatibilitetsmatrise](https://docs.getunleash.io/reference/sdks#server-side-sdk-compatibility-table)

Har du spørsmål eller trenger hjelp? Ta kontakt i [#unleash på Slack](https://nav-it.slack.com/archives/C9BPTSULS)!
