---
title: "Bedre navn på context i kubeconfig"
date: 2026-02-24T13:09:00+01:00
author: Morten Lied Johansen
tags: [cli, kubeconfig]
layout: log
---

Vi har nylig gjort endringer i nais cli hvor navnet på miljøet (`environment`) tar en mer fremtredende plass.
Dette har ført til noen problemer der navnet brukt i kubeconfig ikke har matchet navnet på miljøet.

Dette problemet har først og fremst rammet utviklere utenfor Nav, fordi i Nav har vi av legacy-grunner gjort omskriving av navnet i kubeconfig.

I nyeste versjon av nais cli så gjør vi nå en omskriving av context når vi genererer kubeconfig slik at  navnet i kubeconfig vil være det samme som miljø-navnet brukt andre steder i plattformen.

Hvis du ønsker å fjerne de eksisterende contextene i kubeconfig og bare ha de med nye navn kan du kjøre `nais kubeconfig --clear`.
