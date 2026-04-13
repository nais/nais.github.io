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

<img class="number" src="./images/tjuefjerde.svg" alt="Tallet 24 brodert i et hjerte">

Er kanskje ikke mange som jobber i dag, men i dagens luke finner du Naisvakt, som er tilgjengelig 24/7 for å passe på at Nais er oppe og går! Naisvakt er et roterende vaktlag som bytter hver mandag morgen. Vi følger med på alerts i [#naas-alerts](https://nav-it.slack.com/archives/C046C0RA8AF) og kan nåes via `@nais-vakt` eller direkte på `91 64 37 31`. I arbeidstiden (kl08-17) vil vi helst at dere bruker `@nais_team` for å nå hele teamet.

Ellers anbefaler vi også at du følger med på [#nais-announcements](https://nav-it.slack.com/archives/C01DE3M9YBV) for annonseringer relatert til Nais, og [#produksjonshendelser](https://nav-it.slack.com/archives/C9P60F4F3) for hendelser som treffer hele Nav.

God jul, og husk å sett ut grøt til vakta!

<img class="illustration" src="./images/juletre.svg" alt="Et pyntet brodert juletre">

---

<img class="number" src="./images/tjuetredje.svg" alt="Tallet 23 brodert i et hjerte">

Nå som julen nærmer seg kan det være vanskelig å komme seg ut av sengen for å jobbe de siste timene før man tar ferie. Applikasjoner kan også ha problemer med å komme i gang, derfor finner du startup probes i dagens luke!

Startup probes er Kubernetes måte å vite om applikasjonen din har kommet i gang, i stedet for å være avhengig av liveness og readiness checks. Hvis man før har satt lange liveness og readiness checks for å holde en pod i live under oppstart av appen sin, så er det mye bedre å bytte til startup probes, så kan de andre sjekkene bli skreddersydd til det faktisk brukes til (som navnene deres tilsier).

Vi har dokumentert hvordan man tar dette i bruk i [application spec/startup](https://docs.nais.io/workloads/application/reference/application-spec/#startup).

<img class="illustration" src="./images/adventslys-4.svg" alt="Fire broderte stearinlys">

---

<img class="number" src="./images/tjuende.svg" alt="Tallet 20 brodert i et hjerte">

## 20. desember

> Big whorls have little whorls,  
> That feed on their velocity;  
> And little whorls have lesser whorls,  
> And so on to viscosity.  
> ― Lewis Fry Richardson

### En ryddig julavslutning - Livet til en pod

Poder har en livssyklus, de blir opprettet, startet, kjører og avsluttes. Avslutningen har også en livssyklus. Det begynner med at poden settes i `terminating stat`e. I `terminating state` blir poden fjernet fra listen over `endpoints` i Kubernetes og slutter å motta nye kall. Etter det blir `prestopHook` kjørt og deretter får appen din (eller `PID 1`!) `SIGTERM`. Etter at `SIGTERM` er sendt, vil Kubernetes vente på grace period, som er 30 sekunder som standard, før den sender `SIGKILL`. Dette innebærer at oppryddingen må ta under 30 sekunder.

Når du mottar et `SIGTERM`, bør du vurdere:

- lukke database connections på riktig måte
- fullføre behandling av in-flight messages
- avslutte alle aktive http connections
- lagre nødvendig state (og nøye vurdere om du er på riktig punkt i design spacet for skyapplikasjoner!)

fullføre pending transactions

Det er bra om applikasjonen er forberedt på sine siste øyeblikk og håndterer `SIGTERM`. Avhengig av språket ditt, rammeverk og hvordan du starter appen din kan dette variere. Om opprydding er viktig for din applikasjon så kan det finnes anledning at fundere over om signaler propageres og hvilken prosess som er `PID 1` i din container.

<img class="illustration" src="./images/advent-pakker-3.svg" alt="Tre julegaver brodert">

---

<img class="number" src="./images/nittende.svg" alt="Tallet 19 brodert i et hjerte">

## 19. desember

Tenk om julenissen ikke visste noe om hvem som hadde skrevet ønskelistene?

Autentisering av både mennesker og maskiner er en viktig del av mange applikasjoner. Ofte involverer det bruk av OAuth og JWT, men som utvikler er det ikke alltid like lett å holde tunga rett i munnen når man navigerer dette landskapet.

Derfor har vi laget Texas (kort for token exchange as a service). Denne abstraherer vekk detaljene bak et enkelt API slik at det blir lekende lett å lage sikre applikasjoner.

Som konsument er det å få tak i et token så enkelt som å gjøre en HTTP POST med et par parametere. Her illustrert med `curl`:

```shell
curl $NAIS_TOKEN_ENDPOINT \
  -X POST \
  -d 'identity_provider=maskinporten' \
  -d 'target=krr:global/kontaktinformasjon.read'
```

eller for å bytte inn et token med brukerkontekst for et nytt token:

```shell
curl $NAIS_TOKEN_EXCHANGE_ENDPOINT \
  -X POST \
  -d 'identity_provider=tokenx' \
  -d 'target=<cluster>:<namespace>:<target-app>' \
  -d 'user_token=eyJra...'
```

Som mottaker er det tilsvarende like enkelt å validere et token:

```shell
curl $NAIS_TOKEN_INTROSPECTION_ENDPOINT \
  -X POST \
  -d 'identity_provider=tokenx' \
  -d 'token=eyJra...'
```

og her får du også returnert claimene fra tokenet, ferdig dekodet:

```json
{
    "active": true,
    "exp": 1730980893,
    "iat": 1730977293,
    ...
}
```

Texas er en byggekloss som gir mange fordeler:

- agnostisk til programmeringsspråk og rammeverk (gitt at det kan snakke HTTP)
- innebygget best practices — caching av tokens og validering av det viktigste
- ingen kodeavhengigheter — du slipper å dra inn ekstern kode som må gjennomgås og holdes ved like, i tillegg til å redusere antall kilder for sårbarheter (som vi så på i luke 8)
- ingen hemmeligheter — du slipper å forholde deg til hemmeligheter i applikasjonskode (som vi så litt på i luke 9 om 12-faktor-apps)

Texas er foreløpig i beta for et utvalg identity providere.

Les mer i dokumentasjonen: https://doc.nais.io/auth/explanations/#texas

<img class="illustration" src="./images/advent-pakker-2.svg" alt="To julegaver brodert">

---

<img class="number" src="./images/attende.svg" alt="Tallet 18 brodert i et hjerte">

## 18. desember

Har du noen gang irritert deg at du må huske alt som finnes i Nais-manifestet? Heldigvis finner du et hjelpemiddel i dagens luke. For vi tilbyr to JSON skjemaer for å hjelpe din editor med auto complete, dokumentasjon, og validering.

For kun Nais sine ressurser kan du bruke følgende skjema:

```
https://storage.googleapis.com/nais-json-schema-2c91/nais-all.json
```

Hvis du trenger alle skjemaer som vi bruker i vår plattform kan du bruke følgende:

```
https://storage.googleapis.com/nais-json-schema-2c91/nais-k8s-all.json
```

Hvordan man tar disse i bruk er avhengig av editoren du bruker, og vi har dokumentert VSCode og Intellij.

Hvis du kun ønsker å validere Nais-manifestet så kan du også bruke `nais validate`!

<img class="illustration" src="./images/advent-json.svg" alt="JSON-logoen brodert">

---

<img class="number" src="./images/syttende.svg" alt="Tallet 17 brodert i et hjerte">

## 17. desember

Hallo i luken. Hvorfor gikk det ikke å deploye i dag?

Nais deploy dytter hver dag ut tusenvis av deploys. Rundt lunchtider er vi som regel oppe i 1-2 produksjonssettinger hvert eneste sekund! Men selv om deployen starter, kan det gå galt noen ganger.

Deploy har den kjedelige jobben med å videreformidle feil fra Nais-clusteret. Her er noen vanlige situasjoner som kan gi deg feil på deploy:

- Appen din er ikke konfigurert riktig, dette forårsaker at appen blir stående i CrashLoopBackoff, eller feiler på readiness og/eller health checks.
- Appen bruker for lang tid på å starte; dette ender med at man får en feil som sier at access-tokenet har gått ut.
- Underliggende systemer i Nais-clusteret har bugs eller feilsituasjoner som gjør at secrets for Azure, databaser og liknende ikke blir lastet inn i tide.

Mange av feilene som oppstår kan man debugge på egen hånd, men det kan være utfordrende å skjønne hvor man skal begynne å lete. Derfor har vi lagt inn tracing i deploy slik at man enkelt kan se hvor lang tid de forskjellige stegene tar. Oversikt og linker finner du i bunnen av din Github workflow.

Tracingen vår har også en skjult ekstra funksjon: vi kan vise deg hvor lang tid de forskjellige stegene i bygget ditt tar. Det eneste du trenger gjøre er å legge inn en ekstra variabel i deploy-jobben din. Stikk innom [nais-dokumentasjonen](https://doc.nais.io/build/how-to/tracing) for detaljene, her er et eksempel:

```yaml
- name: Deploy to NAIS
  uses: nais/deploy/actions/deploy@v2
  env:
    TELEMETRY: ${{ steps.docker-build-push.outputs.telemetry }}
```

<img class="illustration" src="./images/julekurv.svg" alt="En brodert kurv formet som et hjerte">

---

<img class="number" src="./images/sekstende.svg" alt="Tallet 16 brodert i et hjerte">

## 16. desember

I dagens luke ser vi på histogrammer i Prometheus, et kraftig verktøy for å overvåke og analysere ytelse i applikasjoner. Histogrammer er en type metrikk som brukes til å samle inn data om fordelinger, for eksempel responstider, størrelser på forespørsler, eller hvor ofte en hendelse skjer i visse intervaller.

### Hva er et histogram?

Et histogram i Prometheus samler inn data ved å gruppere målinger i forhåndsdefinerte “buckets” (intervaller). Dette gjør det enklere å analysere distribusjonen av data, spesielt for å finne:

- Hvor mange forespørsler som er raskere enn et visst nivå.
- Gjennomsnittlige responstider.
- Maksimumsverdi og prosentiler som P50, P90 og P99.

Histogrammer er spesielt nyttige for å overvåke ytelse i systemer hvor responstid og lastfordeling er kritiske faktorer.

### Hvordan fungerer et histogram?

La oss ta utgangspunkt i dette histogrammet fra en Java/Kotlin applikasjon.

```kotlin
// Definer et nytt histogram
val callLatency = Histogram.build()
    .name("api_call_latency_seconds")
    .help("Latency for API calls in seconds.")
    .buckets(0.1, 0.5, 1.0, 2.0)
    .register()

// Bruk histogram til å måle tiden til et eksternt kall
val timer = callLatency.startTimer() // Start måling
try {
    someExternalCall()
} finally {
    timer.observeDuration() // Logg tiden til histogrammet
}
```

Histogram består av tre typer målepunkter:

- `api_call_latency_seconds_bucket{le=“<bucket-value>“}`: Teller antall verdier mindre enn eller lik en bestemt grense.
- `api_call_latency_seconds_count`: Totalt antall observasjoner.
- `api_call_latency_seconds_sum`: Summen av alle observerte verdier.

### Hvordan analyserer jeg et histogram?

Med disse tre kan man analysere fordelinger og prosentiler i Prometheus-spørringer. Hver bucket er merket med en grenseverdi (`le`) for hvor lang tid kallet tok.

PromQL-spørring for P90 (90. percentil):

```kotlin
histogram_quantile(0.90, rate(api_call_latency_seconds_bucket[5m]))
```

Du kan bruke samme logikk for andre prosentiler, som P50 eller P99:

```kotlin
histogram_quantile(0.50, rate(api_call_latency_seconds_bucket[5m]))
histogram_quantile(0.99, rate(api_call_latency_seconds_bucket[5m]))
```

<img class="illustration" src="./images/adventslys-3.svg" alt="Tre broderte stearinlys">

---

<img class="number" src="./images/trettende.svg" alt="Tallet 13 brodert i et hjerte">

## 13. desember

Lurer du på hvordan man faktisk sletter en app eller Naisjob som kjører på Nais-plattformen bør du ta en titt i dagens luke!

Når en app har passert sin levetid må man huske å rydde opp etter seg, og når man bruker Nais-plattformen så er det `app`-ressursen man skal slette (ikke `deployment`).

Det enkleste er faktisk å gjøre det direkte fra Nais Console! Gå til din app eller Naisjob og trykk `Delete` nederst. Her må du bekrefte ved å skrive `miljø/appnavn`.

Hvis du er en kommandolinjenisse så kan de også slettes med `kubectl`!

For apper:

```shell
kubectl delete app julenissen
```

For Naisjob holder det ikke bare å slette `job`-ressursen, man må slette `Naisjob`-ressursen:

```shell
kubectl delete naisjob julenissen
```

Hvis ressursen ikke virker til å forsvinne kan det være noe rusk i systemet, og man må dykke ned i alle julegavene for å finne synderen. For eksempel kan man ikke slette en Nais-`app` som har blitt ugyldig, så hvis den er så gammel at den ikke fungerer lengre så må det rettes opp i før den slettes.

<img class="illustration" src="./images/advent-kost.svg" alt="En brodert kost">

---

<img class="number" src="./images/tolvte.svg" alt="Tallet 12 brodert i et hjerte">

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

<img class="illustration" src="./images/advent-trommer.svg" alt="En brodert tromme med to trommestikker">

---

<img class="number" src="./images/ellevte.svg" alt="Tallet 11 brodert i et hjerte">

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

<img class="illustration" src="./images/advent-pakke-1.svg" alt="En brodert innpakket julegave">

---

<img class="number" src="./images/tiende.svg" alt="Tallet 10 brodert i et hjerte">

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

<img class="illustration" src="./images/julbock.svg" alt="En brodert julebock">

---

<img class="number" src="./images/niende.svg" alt="Tallet 9 brodert i et hjerte">

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

<img class="illustration" src="./images/adventslys-2.svg" alt="To broderte stearinlys">

---

<img class="number" src="./images/sjette.svg" alt="Tallet 6 brodert i et hjerte">

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

<img class="illustration" src="./images/advent-lapp.svg" alt="En brodert merkelapp for julegaver">

---

<img class="number" src="./images/femte.svg" alt="Tallet 5 brodert i et hjerte">

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
<img class="illustration" src="./images/nisse.svg" alt="En brodert nisse med rød hatt og grønn jakke">

<img class="illustration" src="./images/nisse.svg" alt="En brodert nisse med rød hatt og grønn jakke">

<img class="illustration" src="./images/nisse.svg" alt="En brodert nisse med rød hatt og grønn jakke">

<img class="illustration" src="./images/nisse.svg" alt="En brodert nisse med rød hatt og grønn jakke">

<img class="illustration" src="./images/nisse.svg" alt="En brodert nisse med rød hatt og grønn jakke">
</div>

---

<img class="number" src="./images/fjerde.svg" alt="Tallet 4 brodert i et hjerte">

## 4. desember

Det er gratis med luker i Nais sin adventskalender, men det som ikke er gratis er kostnader knyttet til Nais-plattformen. De beste tingene i livet er ofte gratis, men dessverre ikke Nais. Når man tar i bruk Nais er det ganske mange kostnader man setter i gang. For å kjøre en enkel app trenger man både CPU og minne, hvor CPU er den dyreste delen. Ellers er Postgres den største utgiften Nais har utenom app-ressurser.

Det er flere steder hvor man kan lære mer om kostnader knyttet til plattformen, og ditt teams bruk. For en overordnet oversikt anbefaler vi å ta en titt på Kostnader i sky i Metabase, når du først er inne i Metabase anbefaler vi deg å ta en titt på Teamkostnader i sky som foreløpig gir deg den beste oversikten over dine kostnader. Vi jobber med å vise de samme kostnadene direkte i Nais Console, og hvis du til ditt team, og under Cost.

Ellers er det mange skjulte og glemte kostnader ved å kjøre apper. Skjulte kostnader i denne konteksten er kostnader vi ikke enkelt kan fordele på team. To store utgiftposter her er Kafka og logging/tracing/metrikker! Jo mer data man putter på en topic, eller logger, jo høyere kostnader har vi. Logging/tracing/metrikker skalerer heldigvis automatisk, for eksempel tar vi bare vare på logger i 30 dager. Kafka derimot er manuelt skalert, og der er trenden at vi lagrer mer og mer.

En annen skjult kostnad er utgående trafikk. Dette er noe som koster mye penger, så hvis man bare skal snakke med interne tjenester så er det mye bedre å snakke med services i clusteret. Så i stedet for å gå mot https://rudolf.intern.nav.no, kan du heller gå mot http://rudolf.nordpolen.

Av de glemte kostnadene vil vi nevnte Artifact Registry (der alle dine Docker images havner), og secrets, selv om begge er ganske minimale!

Har man lyst til å ta i et tak, så er appens ressursbruk og glemte databaser lavthengende julegaver.

<img class="illustration" src="./images/ring.svg" alt="En brodert ring i gull">

---

<img class="number" src="./images/tredje.svg" alt="Tallet 3 brodert i et hjerte">

## 3. desember

I kalenderes andre luker finner du Tempo, som er Grafana sitt tracing verktøy!

Tracing er en måte å spore en forespørsel når den går gjennom de ulike tjenestene som trengs for å håndtere den. Dette er spesielt nyttig i en mikrotjenestearkitektur, der en enkelt hendelse ofte resulterer i en serie med kall til forskjellige tjenester.

Hvis du bruker Loki som vi snakket om i forrige luke, så kan du logge med trace_id og så vil Grafana automatisk kunne slå opp logger for en trace!

Du kan lese mer om tracing og Tempo på https://docs.nais.io/observability/tracing/.

<img class="illustration" src="./images/reinsdyr.svg" alt="Ett brodert reinsdyr">

---

<img class="number" src="./images/andre.svg" alt="Tallet 2 brodert i et hjerte">

## 2. desember

I første luke finner vi Loki! Grafana Loki er et loggaggregeringssystem inspirert av Prometheus og integrert med Grafana. Dette gjør at du kan ha logger og app-metrikker i samme grensesnitt. Ikke overraskende kan du lage dashboard med begge deler!

Du kan lese mer om logging og Loki på https://docs.nais.io/observability/logging/.

<img class="illustration" src="./images/ett-lys.svg" alt="Ett brodert stearinlys">

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
