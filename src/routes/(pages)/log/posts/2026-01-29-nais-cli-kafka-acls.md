---
title: "Aiven Kafka Developer ACLs"
date: 2026-01-29T09:00:00+01:00
author: Christian Chavez, Sindre Rødseth Hansen og Youssef Bel Mekki
tags: [cli, aiven]
layout: log
---

Tidligere har Nais plattformen gjort det mulig for utviklere å skaffe seg en servicebruker for å kunne aksessere topics i Kafka clustere, ved hjelp av `nais aiven kafka create` CLI kommandoen.
Denne kommandoen opprettet nødvendig servicebruker hos Aiven, men man måtte selv sikre seg å (på rett måte):
- ordne lese/skrive/annen rettigheter
- til én og enhver topic
- manuelt selv

For å kunne støtte oppunder utviklere som har behov for å for eksempel (ikke utømmende liste):
- manuelt flytte på `offset` til en Kafka topic tilbake i tid
- resette topicene til en Kafka Stream

har vi nå lagt til en ny gruppe subkommandoer til https://github.com/nais/cli!

```
$ nais aiven grant-access --help
Grant a user access to an Aiven service.

Usage:
  nais aiven grant-access [command]

Available Commands:
  stream      Grant a user's service-user access to a Kafka Stream.
  topic       Grant a user's service-user access to a Kafka Topic.

Flags:
  -h, --help   help for grant-access

Global Flags:
      --config string   Specify the location for the configuration file. (default "/home/x10an14/.config/.nais/config.yaml")
      --no-colors       Disable colors in the output.
      --team string     Specify the team to use for this command. Overrides the default team from configuration.
  -v, --verbose count   Set verbosity level. Use -v for verbose, -vv for debug, -vvv for trace.

Use "nais aiven grant-access [command] --help" for more information about a command.
```

Tenkt fremgangsmåte blir da at man benytter seg av følgende kommander i ca. slik rekkefølge
```
$ nais aiven create kafka ...
$ nais aiven get kafka ...
$ nais aiven grant-access <topic|stream> ...
```

Les oppdatert dokumentasjon til Nais CLI verktøyet igjennom bruk av `--help` flagget, evnt. les mer hos https://docs.nais.io/operate/cli/reference/aiven/#grant-access!
