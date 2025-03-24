---
title: Hoppe over unødvendig bygg i Nais deploy workflow
date: 2025-03-24T14:00:00+02:00
author: Morten Lied Johansen
tags: [nais, naiserator, deploy, github, workflow]
layout: log
---

Vi har i dag lansert støtte for å kunne deploye endringer i Application/Naisjob uten å bygge et nytt Docker image. :tada:

Frem til i dag har det vært nødvendig å bygge et nytt Docker image hvis du skal deploye endringer i Application/Naisjob, fordi spec'en krever et image og du har ikke det gamle lett tilgjengelig.
Vi har nå gjort endringer som gjør at du ikke trenger å ha image i Application/Naisjob.

Hvis du deployer en Application/Naisjob uten at `image` er satt, så vil vi finne det forrige imaget du deployet og bruke det.
Dette forutsetter at du har gjort en deploy tidligere med `WORKLOAD_IMAGE`-variabelen satt (se nedenfor).

Hvis du ikke trenger denne muligeheten er det *ikke nødvendig* å gjøre noen endringer.

For at dette skal fungere er det noen endringer du må gjøre i workflowen din:

1. Fjern `image` fra Application/Naisjob spec'en din.
2. Sørg for at checkout steget i workflowen din henter hele historikken, slik at vi kan slå fast hva som har endret seg siden sist.
3. Legg til et nytt step som sjekker om det er endringer i spec'en din, f.eks. ved hjelp av `nais/what-changed`-action.
4. Legg til en `if` på byggesteget ditt, slik at det kun bygges hvis det er endringer.
5. Sett variabelen `WORKLOAD_IMAGE` til output fra byggesteget i kallet til `nais/deploy`.

Se eksempelet i dokumentasjonen vår for hvordan du kan gjøre dette: [Build and deploy with GitHub Actions](https://docs.nais.io/build/how-to/build-and-deploy/#create-a-github-workflow).
