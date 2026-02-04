---
title: "Kafka Lagexporter Migration"
date: 2026-02-01T09:00:00+01:00
author: Christian Chavez, Sindre Rødseth Hansen og Youssef Bel Mekki
tags: [aiven, kafka, monitoring]
layout: log
---

## Bakgrunn
Idag er det mange som benytter seg av Kafka på Nais plattformen, som ønsker å følge med på i hvilken grad applikasjonene deres tar unna meldinger på kafka topics/køer.

For å følge med på dette, finnes det i Kafka verden et premiss som heter "Kafka consumer group lag".
De som ønsker å følge med på denne metrikken i Nais sin plattform pleier å lese den fra én av to kilder:
- [Prometheus metrikker] som tilhøre utviklerenes egne applikasjoner
- en Prometheus metrikk tilbudt av Nais plattformen selv; [kafka-lag-exporter]

[kafka-lag-exporter] ikke har mottatt utvikling eller sikkerhetsfikser på nærmere 4 år.
For å sikre stabilitet og sikkerhet i vår overvåkning av Kafka consumer lag, har vi besluttet å migrere fra [kafka-lag-exporter] til en løsning Aiven (som administrerer våre Kafka instanser) selv tilbyr, for å overvåke "Kafka consumer group lag".

Denne migrasjonen betyr at `prometheusrules` brukt for alerts i Kubernetes samt grafana dashboards osv., må bytte ifra [kafka-lag-exporter] sine Prometheus metrikker til Aiven sine.
Nedenfor beskriver vi hvordan de nye Prometheus metrikkene kan skrives slik at de tilsvarer de gamle.

## Migrasjonssteg
1. **Identifiser eksisterende bruk/dashboards**
  - Gå gjennom nåværende Prometheus alerts og Grafana dashboards for å finne all bruk av gamle [kafka-lag-exporter] metrikker.
2. **Oppdater Prometheus regler**
  - Erstatt [kafka-lag-exporter] metrikker med Aiven sine metrikker i Prometheus regler.
    Bruk tabellen under som referanse for erstatning.

| Gammel metrikk | Tilsvarende erstatning |
| -------------: | :--------------------- |
| kafka_consumergroup_group_lag{group="X"}           | kafka_consumer_group_rep_lag{name="X"}                                           |
| kafka_consumergroup_group_topic_sum_lag{group="X"} | sum by (name, topic) (kafka_consumer_group_rep_lag{name="X"})                    |
| kafka_consumergroup_group_sum_lag{group="X"}       | sum by (name) (kafka_consumer_group_rep_lag{name="X"})                           |
| kafka_consumergroup_group_max_lag{group="X"}       | max by (name, topic) (kafka_consumer_group_rep_lag{name="X"})                    |
| kafka_consumergroup_group_lag_seconds{group="X"}   | sum by (name, topic) (kafka_lag_predictor_group_lag_predicted_seconds{name="X"}) |

kafka-lag-exporter: https://github.com/seglo/kafka-lag-exporter
