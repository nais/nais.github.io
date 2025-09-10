---
title: Kafka får egne kubernetes hemmeligheter
date: 2025-09-10T10:00:00+02:00
author: Christian Chavez
tags: [aiven, kafka, vedlikehold, maintenance]
layout: log
---

Vi har nå endelig kommet til Kafka i Aiven-vedlikeholdsferden startet [mars](https://nav-it.slack.com/archives/C01DE3M9YBV/p1742461394110309)!

## Kafkaspesifikke kubernetes hemmeligheter
Fra og med 10. september vil Nais gi alle nye deploys av apper som benytter Kafka en egen hemmelighet for kafkatilkobling.

Dette fordi
1. Reduserer nedslagsfeltet hvis man bruker flere Aiven tjenester
1. Tillater uavhenging rotering av tilkoblingshemmeligheter av Aiven tjenester

Dette skal ikke ha noen konsekvenser for brukere av Nais og Kafka.
Skriv melding i [#nais](https://nav-it.slack.com/archives/C5KUST8N6) hvis noe skulle feile.
