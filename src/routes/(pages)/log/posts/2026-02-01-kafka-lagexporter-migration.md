---
title: "Kafka Lagexporter Migration"
date: 2026-02-01T09:00:00+01:00
author: Christian Chavez, Sindre Rødseth Hansen og Youssef Bel Mekki
tags: [aiven, kafka, monitoring]
layout: log
---

Nais team som ikke selv produserer Kafka consumer group lag, er avhengige av seglo/kafka-lag-exporter (https://github.com/seglo/kafka-lag-exporter) for å monitore Kafka consumer group lag. Repositoryet er nå arkivert, forlatt, og mottar ikke sikkerhetsoppdateringer. Siste push var 28. februar 2024.
For å sikre stabilitet og sikkerhet i vår overvåkning av Kafka consumer lag, har vi besluttet å migrere fra kafka-lag-exporter til Aiven sin innebygde løsning for consumer lag overvåkning.
Denne migrasjonen innebærer å erstatte eksisterende Prometheus regler og dashboards som er avhengige av kafka-lag-exporter med tilsvarende regler og dashboards som benytter Aiven sine metrikker.

## Migrasjonssteg
1. **Identifiser eksisterende regler og dashboards**: Gå gjennom nåværende Prometheus regler og Grafana dashboards for å finne all bruk av gamle kafka-lag-exporter metrikker.
2. **Oppdater Prometheus regler**: Erstatt kafka-lag-exporter metrikker med Aiven sine metrikker i Prometheus regler. Bruk tabellen under som referanse for erstatning.

| Gammel metrikk | Tilsvarende erstatning |
| -------------- | ------------- |
| kafka_consumergroup_group_lag{group="X"} | kafka_consumer_group_rep_lag{name="X"} |
| kafka_consumergroup_group_topic_sum_lag{group="X"} | sum by (name, topic) (kafka_consumer_group_rep_lag{name="X"}) |
| kafka_consumergroup_group_sum_lag{group="X"} | sum by (name) (kafka_consumer_group_rep_lag{name="X"}) |
| kafka_consumergroup_group_max_lag{group="X"} | max by (name, topic) (kafka_consumer_group_rep_lag{name="X"}) |