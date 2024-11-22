---
title: "Endringer i GitHub Actions"
date: 2024-10-08T12:55:13+02:00
author: Tommy Trøen
tags: [github, actions, docker, cache]
layout: log
---

:rocket:  :salsa: :lock: Endringer i Github Action  - nais/docker-build-push

Vi har gjort noen endringer så nais/docker-build-push  er mer robust ifm med rate-limiting ( TOO_MANY_REQUESTS ) ved generering av SBOM.
Dette betyr forhåpentligvis at dette steget ikke skal feile lenger (som rapportert fra flere i #nais kanalen).

I tillegg har vi gjort endringer som skal gjøre dette steget en god del raskere enn før!  :tada:

**Hva må dere gjøre?**  Ingenting, bare deploye som før!

**For de som lurer på hva vi har gjort:**
- Innført github cache i nais/attest-sign for det Trivy kaller trivy-java-db - alle kjøringer etter at cachen er satt bør bli en del raskere!
- Støtter fallback i Trivy for flere repositories for trivy-java-db , skal da sørge for at bygget ikke feiler om du blir rate limita på første forsøk
- Satt opp en “passthrough cache” i GAR (google) som speiler/cacher Trivy sitt github repo (som også bør hjelpe på rate limiting)

Si gjerne ifra om ting ikke fungerer som forventet!