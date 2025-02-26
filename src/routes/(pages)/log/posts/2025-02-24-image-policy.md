---
title: "Håndheving av image policy"
date: 2025-02-24T11:00:00+02:00
author: Johnny Fredheim Horvi
tags: [image, docker, container, security]
layout: log
---

Fra og med 1. april vil vi kreve at applikasjoner og jobber på Nais bruker images som kommer fra teamets eget repository i Google Artifact Registry/GAR.
De fleste gjør allerede dette, så for de er det ingen endring.

Det er to hovedgrunner til at dette nå blir håndhevet:

1. Vi kan da være sikre på at det er en autorisert Nais-bruker eller repository som har lastet det opp. Med audit logg.
2. Teamets repository ligger nærmere clusteret, og støtter [Image Streaming](https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming) som gjør at oppstartstid ved f.eks autoskalering eller plattform-vedlikehold er rask.

Den enkleste måten å sikre at imagene havner riktig sted er å bruke [Nais' github actions](https://docs.nais.io/build/how-to/build-and-deploy/) i workflowet sitt. Da trenger man ikke ha et aktivt forhold til hvor imaget ligger lagret, og alt går av seg selv.

Console vil fra nå og frem til 1. april gi en advarsel om dette.

Les mer om image repositories i [Nais-dokumentasjonen](https://docs.nais.io/workloads/explanations/imagerepository/).
