---
title: "Nais adventskalender 2024"
description: "La oss gjøre adventstiden mer nais med en Nais adventskalender! Her vil vi hver arbeidsdag legge ut et tips til hvordan du kan bruke Nais-plattformen."
date: 2024-12-01T22:10:00+02:00
author: Naissen
tags: []
theme: advent
---

La oss gjøre adventstiden mer nais med en Nais adventskalender! Her vil vi hver arbeidsdag legge ut et tips til hvordan du kan bruke Nais-plattformen.

---

<img class="number" src="./images/tolvte.svg" alt="">

## 12. desember

En av de mest fornuftige tingene som har skjedd de siste tiårene er :advent-12: -factor apps. Den har aldrets like bra som gode råd gjør - hvilket betyr at etter :advent-13: år bør vi vurdere flere å gjøre ting litt annerledes. Folkene hos IBM introduserte :advent-15: factor apps for noen år siden som legger til telemetri, API-først og Authnz som ytterligere faktorer for en app.

Ytterliggere factors fikser ikke min største moderne innvending mot :advent-12: factor apps som er “put config in envs“.

Ikke legg konfigurasjon i envs, ikke legg secrets i envs. I stedet, når du driver med modern config managment, legg konfigurasjonen i en fil. Det gir deg konfigurasjon som kode og er del av en populær bevegelse med ting-som-kode.

Filer:

- Er i git
- Code reviews og sporing
- Validering i ci
- Filer har kommentarer!

Alt du må sørge for er at det finnes en måte å laste inn konfigurasjonen på nytt uten å bygge på nytt. Du kan for eksempel starte applikasjonen på nytt.

Hvis vi skulle legge til den manglende hemmelighetsdelen av :advent-12: factor apps, ville det sett slik ut:

### :advent-12: - Hemmeligheter

a. Ha ikkje secrets. Gå alltid for den identitetsfederasjonsløsningen som er tilgjengelig for deg. Dette er ting som K8s tjenestekontoer, GCP tjenestekontoer, SPIFFE osv.

b. Hvis du integrerer mot en tjeneste som ikke støtter disse mønstrene og du absolutt trenger en hemmelighet, kan du legge den i en fil. Denne hemmeligheten bør lages ved hjelp av trinn (a).

Vurder:

1. Du har en webserver og den trenger et sertifikat. Du kan betale for problemet med å glemme å fornye det hvert år eller bruke Lets Encrypt. Velg sistnevnte, Nais bruker sistnevnte når det er mulig.
2. Du vil deploye fra Github actions, velger du langtlevende tokens eller bruker du service accounts? Nais har valgt service accounts for deg (når det er mulig).
3. Du vil koble til en database, legger du bruker/passord-ting i en miljøvariabel eller lar du Nais håndtere det for deg? Velg Nais!

Remember, the first part of :advent-12: factos apps is “use source control”.

It is dated.

<img class="illustration" src="./images/advent-trommer.svg" alt="">

---

<img class="number" src="./images/ellevte.svg" alt="">

## 11. desember

Når vi utvikler applikasjoner, står vi overfor flere risikoer i forsyningskjeden, fra commit til kjørende kode. Verktøy som [SLSA](https://slsa.dev/spec/v1.0/about) og NAIS Console hjelper oss med å identifisere og håndtere trusler på en effektiv måte.

### 🔍 Men det er flere trusler i forsyningskjeden som lurer!

1. **Kildekoden**: Risiko for uautorisert tilgang eller endringer, ofte via sårbare versjonskontroll systemer(GithHub) eller upålitelige avhengigheter.

   - Sikre tilgangskontroll til repositorier.
   - Aktiver Dependabot for å overvåke og oppdatere avhengigheter.
   - Bruk tofaktorautentisering (2FA) for økt sikkerhet.
   - Krev godkjenning av pull-forespørsler før merging.
   - Bruk signerte commits for å autentisere endringshistorikk.
   - Vurder kilden til tredjepartsbiblioteker og overvåk endringer i eierskap.
   - Begrens bruken av personlige tilgangstokens (PATs), og sørg for minimal tilgang der de brukes.

2. **Byggprosessen**: Manipulasjon av byggeverktøy eller bygdefiler kan kompromittere programvaren.\*

   - Sikre byggeprosessen med [nais/docker-build-push](https://docs.nais.io/services/vulnerabilities/how-to/sbom/).

3. **Distribusjon**: Uautoriserte eller skadelige artifakter kan infiltrere uten riktige signerings- og valideringsrutiner.\*

   - Implementer robuste signerings- og valideringsprosedyrer med [nais/docker-build-push](https://docs.nais.io/services/vulnerabilities/how-to/sbom/).

### 🔧 Hvordan NAIS Console hjelper med sårbarheter

- Automatisert skanning: Oppdager sårbare avhengigheter ved hjelp av SBOM (Software Bill of Materials).
- Detaljerte rapporter: Identifiserer avhengigheter som trenger oppdatering.
- Proaktiv håndtering: Gir teamene mulighet til å prioritere og adressere sårbarheter raskt.

### ✨ Slik bruker du NAIS Console for sikkerhet

1. Generer SBOM for applikasjonene dine.
2. Analyser sårbarhetene i NAIS Console.
3. Oppdater sårbare avhengigheter basert på rapportene.

📖 Les mer om risikoer i forsyningskjeden: [SLSA Threats Overview](https://slsa.dev/spec/v1.0/threats-overview)

<img class="illustration" src="./images/advent-pakke-1.svg" alt="">

---

<img class="number" src="./images/tiende.svg" alt="">

## 10. desember

I dagens luke finner vi Unleash, et kraftig verktøy for feature toggling i Nais plattformen!

Unleash lar deg aktivere eller deaktivere funksjonalitet i applikasjonen din uten å måtte deployere ny kode. Dette er spesielt nyttig for å eksperimentere med nye funksjoner, rulle ut endringer gradvis, eller raskt deaktivere funksjonalitet som skaper problemer.

Slik konfigurerer du Unleash i Nais:

Gå til Console, velg ditt team og trykk på fanen for Unleash

Opprett din egent Unleash server ved å trykke på knappen

Konfigurer applikasjonen din til å bruke Unleash SDK for å hente status på feature toggles.

Bruk toggles i koden din for å kontrollere når og hvor funksjonaliteten skal aktiveres.

Du kan lese mer om Unleash og hvordan du konfigurerer det i Nais på https://docs.nais.io/services/feature-toggling/

God jul og lykke til med feature toggling!

<img class="illustration" src="./images/julbock.svg" alt="">

---

<img class="number" src="./images/niende.svg" alt="">

## 9. desember

Det er ingen hemmelighet at vi åpner luke nummer seks i dag, men det som er hemmelig er passordene appen din trenger!

Det er flere måter å opprette hemmeligheter i Nais, men i denne luka vil vi fortelle om hemmeligheter i Nais Console.

I Console går du til ditt team, og under `Secrets` kan du administrere dine hemmeligheter. Hemmeligheter er knyttet til spesifikt miljø, dette for å gjøre det lettere for deg å skille mellom hva en app trenger per miljø.

Man kan også importere hemmeligheter man allerede har i et Kubernetes cluster ved å legge til følgende `label`: `nais.io/managed-by=console`.

```shell
kubectl label secret julegave nais.io/managed-by=console
```

Du kan lese mer om hemmeligheter på https://docs.nais.io/services/secrets/.

PS: Hemmeligheter eid/opprettet av plattformen kan ikke importere inn i Console.

<img class="illustration" src="./images/adventslys-2.svg" alt="">

---

<img class="number" src="./images/sjette.svg" alt="">

## 6. desember

Dagens luke er merket med advent, og vet du hva annet som kan merkes, Kubernetes ressurser!

Alle ressurser som blir opprettet i Kubernetes har støtte for noe som kalles `labels`, `labels` er en måte å merke og kategorisere forskjellige ressurser slik at man senere kan filtrere på de med det som kalles _label selector_.

Når du oppretter en Nais app så blir `app`-ressursen merket med `team=nordpolen`, og hver ressurs som blir opprettet for Nais appen din blir merket med `app=julenissen`.

Så hvis du ønsker å se alle\* ressurser opprettet så kan du bruke `--selector` (eller forkortelsen `-l`):

```shell
$ kubectl get all --selector app=julenissen
NAME                                              READY   STATUS    RESTARTS   AGE
pod/julenissen-6dd78c8b9d-4slwh                   2/2     Running   0          8d

NAME                                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
service/julenissen                   ClusterIP   192.168.88.129   <none>        80/TCP    147d

NAME                                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/julenissen                   1/1     1            1           147d

NAME                                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/julenissen-5464d666f7                   0         0         0       41d
replicaset.apps/julenissen-56bcd8dbd8                   0         0         0       10d
replicaset.apps/julenissen-6dd78c8b9d                   1         1         1       8d
replicaset.apps/julenissen-7454cdb546                   0         0         0       41d
```

\* the list was intended to be “these are the things you’re likely to mess with” as opposed to “the list of all things”, se [Github/#28955](https://github.com/kubernetes/kubernetes/pull/28955) for mer.

Man kan også liste opp labels ved bruk av `--label-columns` (forkortet til `-L`):

```shell
k get sqlinstance -L=app
NAME          AGE    READY   STATUS     STATUS AGE   APP
gavelister    160d   True    UpToDate   155d         sekken
oppskrifter   420d   True    UpToDate   71d          grøt
reinsdyr      417d   True    UpToDate   11d          sleden
```

Har du lyst til å lese mer om labels anbefaler vi Kubernetes.io sin egen dokumentasjon, Labels and selectors.

<img class="illustration" src="./images/advent-lapp.svg" alt="">

---

<img class="number" src="./images/femte.svg" alt="">

## 5. desember

Vi skalerer opp dagens luke så vi kan se hvordan det fungerer.

Noen ganger har man behov for å skalere en app helt ned for litt vedlikehold. Og den enkleste måten å gjøre det på er å bruke kubectl scale.

Hvis du har en app som heter julenissen kan du bruke følgende kommando for å skalere den ned:

```shell
kubectl scale --replicas=0 deployment/julenissen
```

Når så julaften nærmer seg må julenissen skaleres opp, så han kan levere gaver til hele verden:

```shell
kubectl scale --replicas=5 deployment/julenissen
```

Noen ganger har man behov for at en app er skalert ned over lang tid, og da er det nok best å endre det direkte i nais.yaml.

<div class="nisser">
<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">

<img class="illustration" src="./images/nisse.svg" alt="">
</div>

---

<img class="number" src="./images/fjerde.svg" alt="">

## 4. desember

Det er gratis med luker i Nais sin adventskalender, men det som ikke er gratis er kostnader knyttet til Nais-plattformen. De beste tingene i livet er ofte gratis, men dessverre ikke Nais. Når man tar i bruk Nais er det ganske mange kostnader man setter i gang. For å kjøre en enkel app trenger man både CPU og minne, hvor CPU er den dyreste delen. Ellers er Postgres den største utgiften Nais har utenom app-ressurser.

Det er flere steder hvor man kan lære mer om kostnader knyttet til plattformen, og ditt teams bruk. For en overordnet oversikt anbefaler vi å ta en titt på Kostnader i sky i Metabase, når du først er inne i Metabase anbefaler vi deg å ta en titt på Teamkostnader i sky som foreløpig gir deg den beste oversikten over dine kostnader. Vi jobber med å vise de samme kostnadene direkte i Nais Console, og hvis du til ditt team, og under Cost.

Ellers er det mange skjulte og glemte kostnader ved å kjøre apper. Skjulte kostnader i denne konteksten er kostnader vi ikke enkelt kan fordele på team. To store utgiftposter her er Kafka og logging/tracing/metrikker! Jo mer data man putter på en topic, eller logger, jo høyere kostnader har vi. Logging/tracing/metrikker skalerer heldigvis automatisk, for eksempel tar vi bare vare på logger i 30 dager. Kafka derimot er manuelt skalert, og der er trenden at vi lagrer mer og mer.

En annen skjult kostnad er utgående trafikk. Dette er noe som koster mye penger, så hvis man bare skal snakke med interne tjenester så er det mye bedre å snakke med services i clusteret. Så i stedet for å gå mot https://rudolf.intern.nav.no, kan du heller gå mot http://rudolf.nordpolen.

Av de glemte kostnadene vil vi nevnte Artifact Registry (der alle dine Docker images havner), og secrets, selv om begge er ganske minimale!

Har man lyst til å ta i et tak, så er appens ressursbruk og glemte databaser lavthengende julegaver.

<img class="illustration" src="./images/ring.svg" alt="">

---

<img class="number" src="./images/tredje.svg" alt="">

## 3. desember

I kalenderes andre luker finner du Tempo, som er Grafana sitt tracing verktøy!

Tracing er en måte å spore en forespørsel når den går gjennom de ulike tjenestene som trengs for å håndtere den. Dette er spesielt nyttig i en mikrotjenestearkitektur, der en enkelt hendelse ofte resulterer i en serie med kall til forskjellige tjenester.

Hvis du bruker Loki som vi snakket om i forrige luke, så kan du logge med trace_id og så vil Grafana automatisk kunne slå opp logger for en trace!

Du kan lese mer om tracing og Tempo på https://docs.nais.io/observability/tracing/.

<img class="illustration" src="./images/reinsdyr.svg" alt="">

---

<img class="number" src="./images/andre.svg" alt="">

## 2. desember

I første luke finner vi Loki! Grafana Loki er et loggaggregeringssystem inspirert av Prometheus og integrert med Grafana. Dette gjør at du kan ha logger og app-metrikker i samme grensesnitt. Ikke overraskende kan du lage dashboard med begge deler!

Du kan lese mer om logging og Loki på https://docs.nais.io/observability/logging/.

<img class="illustration" src="./images/ett-lys.svg" alt="">

---

<style>
    .nisser {
        text-align: center;
	text-wrap: balance;
    }
    .nisser > *{
        display: inline;
    }
    .number {
        margin-inline: auto;
    }
    .illustration {
        margin-inline: auto;
    }
</style>
