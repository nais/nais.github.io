---
title: "Texas er ute av beta!"
date: 2025-06-27T10:24:00+02:00
author: Trong Huu Nguyen
tags: [texas, token, oauth, jwt]
layout: log
---

:texas: Sent [i fjor introduserte vi Texas i beta](https://nais.io/log/#2024-11-22-texas). Det er en tjeneste som gjør det meget mye enklere å navigere seg rundt alt av JWTer og OAuth.

Texas er nå automatisk tilgjengelig for alle apper som bruker minst én av:

- Entra ID / Azure AD
- ID-porten
- Maskinporten
- TokenX

I første omgang vil dere ikke merke annet enn at dere får en ekstra container i poddene deres neste gang dere gjør en deploy.

Texas er valgfri å ta i bruk. Det er også helt lov til å bare bruke deler av funksjonaliteten. Vi har ingen planer om å fjerne eksisterende miljøvariabler for de som ikke bruker Texas, men vi håper nå at den gjør livene deres litt enklere hvis dere er i gang med en ny (eller gammel) app som må håndtere tokens.

De av dere som har tatt i bruk Texas under betaperioden kan trygt fjerne annotasjonen `texas.nais.io/enabled: "true"` fra manifestene deres. Tusen takk til dere som også bidratt med tilbakemeldinger gjennom perioden.

[Les mer og kom-i-gang i dokumentasjonen](https://doc.nais.io/auth/explanations/#texas).
Med ønske om en riktig nais sommer! :sunny:
