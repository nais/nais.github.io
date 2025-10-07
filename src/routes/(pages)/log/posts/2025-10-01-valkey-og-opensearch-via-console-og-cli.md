---
title: "Håndtering av Valkey og OpenSearch er nå tilgjengelig via Console og CLI"
date: 2025-10-07T09:00:00+02:00
author: Trong Huu Nguyen
tags: [valkey, opensearch, console, cli]
layout: log
---

Det er nå mulig å opprette, konfigurere samt slette både Valkey- og OpenSearch-instanser via Nais Console og Nais CLI.
Vi håper med dette å tilby alternative grensesnitt som både er enklere og mer brukervennlige enn tidligere.

Les mer i dokumentasjonen for å komme i gang:

- [OpenSearch](https://doc.nais.io/persistence/opensearch/)
- [Valkey](https://doc.nais.io/persistence/valkey/)

Nais CLI har fra versjon 3.3.0 og oppover to nye kommandoer som i første omgang ligger under `nais alpha`:

```shell
nais alpha opensearch
```

```shell
nais alpha valkey
```

Bruk `--help` på de respektive subkommandoene for ytterligere dokumentasjon og eksempler.

Eksisterende instanser kan også migreres til nytt oppsett, men vær obs på at ikke alle felter er støttet per nå.
Ta kontakt hvis det mangler noen felter dere ønsker støtte for.

- [Migrering av eksisterende OpenSearch instanser](https://doc.nais.io/persistence/opensearch/how-to/migrate-to-console/)
- [Migrering av eksisterende Valkey instanser](https://doc.nais.io/persistence/valkey/how-to/migrate-to-console/)
