---
title: "Hemmelighetsinnstramming"
date: 2026-01-26T09:00:00+01:00
author: Johnny Fredheim Horvi og Frode Sundby
tags: [console, api, cli, secrets]
layout: log
---

For å øke sikkerheten rundt håndtering av hemmeligheter i Nais, har vi gjort noen endringer i default-tilgangen til hemmeligheter.

Der man tidligere hadde en permanent tilgang til alle hemmeligheter i sitt team, har vi nå innført en mer restriktiv policy. 
Før man får lesetilgang til verdiene i en hemmelighet, må man i oppgi en begrunnelse. 

Tilgangen gis automatisk, loggføres og varer i 5 minutter. 

![Skjermbilde som viser popup-vindu for å oppgi begrunnelse for tilgang til hemmelighet](/log/hemmelighetsinnstramming.png)

Bakgrunnen for denne endringen er å redusere risikoen for utilsiktet eller ondsinnet tilgang til sensitive data dersom man blir utsatt for et eksfiltreringsangrep eller lignende.
