---
title: Automatisk rotering av hemmeligheter for Aiven Valkey og OpenSearch
date: 2025-03-20T11:00:00+02:00
author: Christian Chavez, Kyrre Havik
tags: [aiven, nais, valkey, redis, opensearch, elasticsearch, elk]
layout: log
---

Fra og med 20. mars vil Nais rotere tilkoblingshemmelighetene til Valkey og OpenSearch instansene.
_Servicebrukeren_ som k8s clusterene til Nais bruker for å tillate tilkobling til Aiven sine _Valkey_ og _OpenSearch_ instanser, vil få sin hemmelighet (til Aiven ressursen) rotert senest hver 2. uke.
De roteres inn/ut av bruk ettersom relevante Aiven ressurser legges til/fjernes i [Nais Application spec](https://doc.nais.io/workloads/application/reference/application-spec), samt tilhørende [ReplicaSets i k8s](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset).

Les mer om [OpenSearch i Nais docen her](https://doc.nais.io/persistence/opensearch).
Les mer om [Valkey i Nais docen her](https://doc.nais.io/persistence/valkey).
