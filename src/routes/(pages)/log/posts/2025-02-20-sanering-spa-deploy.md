---
title: "Sanering av nais/deploy/actions/spa-deploy/v2"
date: 2025-02-20T09:46:45+02:00
author: Kyrre Havik
tags: [github, action, spa, deploy]
layout: log
---

Vi ser at vi `ikke` har fått til det vi ønsket med spa-deploy, og for å lette byrden på teamet velger vi å sanere og rydde bort denne Github actionen.
Dette vil ikke påvirke tjenestene som allerede bruker action, og ingressene som har blir opprettet vil ikke bli ryddet bort.
Vi fjerner kun selve Github action, så hvis du er et av de 10 teamene som bruker den, må dere gjøre en liten migrering vekk fra spa-deploy, over til cdn-upload.

```yaml
- uses: nais/deploy/actions/spa-deploy/v2@master
  with:
    team: security-champion-admin
    app: playbook
    environment: prod
    source: build
    ingress: https://sikkerhet.nav.no
```

må endres til

```yaml
- name: Upload static files to CDN
  uses: nais/deploy/actions/cdn-upload/v2@master
  with:
    team: security-champion-admin
    source: build
    destination: playbook/prod
```

`destination` er kombinasjon av app og environment.
