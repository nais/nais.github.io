---
title: "Nye måter å spesifisere og deploye ressurser i Nais"
date: 2026-09-21T12:00:00+02:00
author: Nais-teamet
tags: [cli, deploy, github-actions, manifests]
layout: log
---

Vi lanserer nå en ny deploy-løsning i Nais. Denne løsningen består av to deler.

- [`nais/setup`](https://github.com/nais/setup) er en GitHub Action som setter opp Nais CLI i workflowen deres.
- [`nais apply`](https://cli.nais.io/nais_apply.html) deployer manifestene med Nais CLI.

Vi lanserer også V3 av [`nais/deploy`](https://github.com/nais/deploy/releases/tag/v3), denne støtter eksisterende manifester og templating, men bruker Nais CLI under panseret.
For de fleste team er det nok å oppdatere `nais/deploy`-actionen til v3.

## `nais apply` og `nais/setup`

Dette er den nye anbefalte måten å konfigurere GitHub actions på.
`nais/setup` setter opp Nais CLI i workflowen deres, og `nais apply` deployer manifestene med Nais CLI.

Dokumentasjonen er oppdatert med et [eksempel på hvordan](https://docs.nais.io/build/how-to/build-and-deploy/) dette kan settes opp i en GitHub Actions workflow.

`nais apply` støtter eksisterende Kubernetes-manifester, men også nye Nais-manifester (mer om dette under).

Det er også en endring i hvordan templating håndteres, les mer om dette i dokumentasjonen for [mixins](https://docs.nais.io/build/explanations/environment-mixins/).

Den nye løsningen lager ikke "deployments", men lagrer endringer og informasjon i aktivitetsloggen. Denne inneholder mer informasjon enn tidligere, og gir bedre innsikt i hva som har endret seg.

### Dette må dere gjøre

Dere trenger ikke migrere eksisterende manifester nå. Kubernetes-manifestene dere bruker i dag, fortsetter å virke.

Har dere allerede en workflow med `nais/setup` og `nais apply`, kan den vanligvis fortsette uendret. Det er innholdet i manifestet som endres når dere tar i bruk det nye formatet.

For nye workflows anbefaler vi:

1. Legg manifestene i `.nais/` i repositoryet.
2. Bruk `nais/setup` til å sette opp Nais CLI og velge team.
3. Bruk `nais apply` til å deploye til ønsket miljø.

```yaml
steps:
  - uses: actions/checkout@v6
  - uses: nais/setup@v1
    with:
      team: mitt-team
  - run: nais apply .nais/opensearch.yaml --environment dev-gcp
```

Ta gjerne i bruk Nais-formatet når dere oppretter en støttet ressurs, eller neste gang dere endrer manifestet.

## Nais-manifester

Samtidig begynner vi å innføre **Nais-manifester**.
Dette er vår langsiktige retning for å beskrive ressurser i plattformen.
I stedet for Kubernetes-manifester er Nais-manifester mer spesialiserte for det platformen tilbyr.

Nais-manifester gir et grensesnitt som beskriver Nais-ressurser uten at dere må forholde dere til Kubernetes-spesifikke felter og andre implementasjonsdetaljer.

Manifestene sendes gjennom Nais API. Det gir felles validering, tilgangsstyring og aktivitetslogging, og gjør at de samme ressursene kan forvaltes gjennom både Nais CLI og Console.

Valkey og OpenSearch er de første ressursene som kun bruker det nye oppsettet:

- [Eksempel på Valkey-manifest](https://docs.nais.io/persistence/valkey/reference/example/)
- [Eksempel på OpenSearch-manifest](https://docs.nais.io/persistence/opensearch/reference/example/)

På sikt vil flere Kubernetes-manifester bli erstattet av Nais-manifester.
Det finnes foreløpig ingen sluttdato for dagens oppsett, og eksisterende manifester kan fortsatt brukes.

Prøv gjerne den nye deploy-veien, og gi oss tilbakemeldinger på Slack.

### Hvorfor Nais-manifester?

De siste årene har vi jobbet med et eget API på toppen av plattformen. Selv om Nais fortsatt kjører på Kubernetes under panseret, sendes de nye Nais-manifestene til vårt eget API via Nais CLI – ikke direkte til Kubernetes.

Dette gir flere store fordeler:

- **Bedre sporbarhet og tilgangsstyring:** Vi får sentral aktivitetslogging (audit logs), tydeligere validering og mulighet for strengere sikkerhetsmekanismer som _just-in-time access_ (JITA).
- **Flere flater:** Med et felles API kan vi tilby oppretting og endring av ressurser på tvers av verktøy – både i GitOps, Nais CLI og direkte i Nais Console.

Dokumentasjon:

- [Bygg og deploy med GitHub Actions](https://docs.nais.io/build/how-to/build-and-deploy/)
- [Opprett Valkey med GitHub Actions](https://docs.nais.io/persistence/valkey/how-to/create-with-github-actions/)
- [Opprett OpenSearch med GitHub Actions](https://docs.nais.io/persistence/opensearch/how-to/create-with-github-actions/)
- [Forstå Nais-manifester](https://docs.nais.io/build/explanations/manifest/)

**Hva betyr dette for `kubectl`?**  
Du kan fortsatt bruke `kubectl` til feilsøking og inspeksjon som før. Men fordi tilgangsstyringen strammes inn, kan ikke nye ressurser som Valkey og OpenSearch opprettes eller endres via `kubectl`. Enkelte sensitive ressurser (som secrets) krever JIT-tilgang for i det hele tatt å kunne leses.
