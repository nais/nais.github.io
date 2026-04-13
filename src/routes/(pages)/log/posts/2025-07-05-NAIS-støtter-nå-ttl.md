---
title: "NAIS støtter nå TTL i spec.ttl"
date: 2025-07-05T11:05:45+02:00
author: Youssef Bel Mekki
tags: [workloads, naisjob, ttl]
layout: log
---

:naisely-done: NAIS støtter nå `spec.ttl` for automatisert opprydding i **Naisjob**!

Det er nå mulig å angi en **TTL (time to live)** direkte i `spec.ttl` for Naisjob — noe som tidligere kun var
tilgjengelig for Application-ressurser.

Når TTL-en utløper, slettes ressursen automatisk av NAIS-plattformen.  
Perfekt for:

- engangsjobber
- testmiljøer
- midlertidige deploys

:rip: av Naisjob, styrt av `ttl`.

👉 [Les mer og kom i gang i dokumentasjonen](https://doc.nais.io/workloads/)
