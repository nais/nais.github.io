---
title: "Ny felles Loki-instans i management-clusteret"
date: 2026-06-03T16:27:00+02:00
author: Sindre Rødseth Hansen og Terje Sannum
tags: [loki, logging, grafana, observability]
layout: log
---

Vi har satt opp en felles Loki-installasjon i management-clusteret som samler logger fra alle clustere.

Hvorfor?
- 🚀 Bedre ytelse – Én stor instans håndterer spørringer mer effektivt enn mange små
- 💰 Lavere kostnader – Vi sparer ressurser ved å konsolidere til én installasjon

Hva betyr dette for deg?
- Datasource: Bruk datasourcen `Logs` i Grafana for å se logger
- Skille mellom clustere: Bruk labelen `k8s_cluster_name` for å filtrere på ønsket cluster

Eksempel på spørring:
```
{k8s_cluster_name="prod", service_name="min-app"}
```
⚠️ Viktig å vite
- De gamle per-cluster Loki-instansene (datasources som `prod-gcp`, `dev-gcp`) vil bli faset ut om to uker
- I overgangsperioden fungerer begge, men vi anbefaler å begynne å bruke `Logs` allerede nå

