---
title: "Nais CLI forbedringer"
date: 2026-04-27T09:00:00+01:00
author: Roger Bjørnstad og Christer Edvartsen
tags: [console, cli, api]
layout: log
---

Vi har gjort et aldri så lite løft i Nais CLI. Vi har introdusert funksjonalitet som tidligere bare har vært tilgjengelig i Console i form av en drøss med nye kommandoer som det bare er å kaste seg over.

Noen kommandoer har også blitt flyttet ut av `nais alpha` til roten av Nais CLI:

```shell
nais api --help # Commands for interacting with the Nais API
nais log --help # Show logs for a team
```

For å gjøre det enklere å finne ut av hva Nais CLI har å tilby har vi fått på plass https://cli.nais.io/.
