---
title: "Config i Console og CLI"
date: 2026-03-19T09:00:00+01:00
author: Frode Sundby og Johnny Fredheim Horvi
tags: [console, cli, config]
layout: log
---

Det er nå mulig å opprette og administrere `config` (ConfigMaps) via Nais Console og Nais CLI.

Config fungerer på samme måte som `secret`, men for konfigurasjon som ikke er sensitiv.
key/value-par kan mountes som miljøvariabler eller filer i workloads. I motsetning til hemmeligheter kreves det ingen begrunnelse eller tidsavgrenset tilgang for å se verdiene.

Det er også støtte for binære filer. Verdier sendes da som base64-kodet data, og lagres og hentes korrekt uten tap av innhold.

I Console finner du Config under teamet ditt. Derfra kan du opprette, redigere og slette configs, administrere key/value-par, og se hvilke workloads som bruker dem.

I CLI er det en ny `config`-kommando med følgende subkommandoer:

```shell
nais config list        # List configs for teamet
nais config get         # Se detaljer og nøkkel/verdi-par
nais config create      # Opprett ny config
nais config delete      # Slett en config
nais config set         # Sett nøkkel/verdi-par
nais config unset       # Fjern nøkler
nais config activity    # Se aktivitetslogg
```

Bruk `--help` på de respektive subkommandoene for ytterligere dokumentasjon.

Dersom teamet ditt allerede har configMaps, kan man legge til disse i nais ved å legge på følgende label på configMap:

```yaml
metadata:
  labels: nais.io/managed-by=console
```

Les mer i [dokumentasjonen](https://docs.nais.io/services/config/).
