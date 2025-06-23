# Nais.io

Dette repoet blir publisert på nais.io via Github Pages.

## Lokal utvikling

### Prerequisites

Må legges til som collaborator på [`nais-announcements`-slackbot](https://app.slack.com/app-settings/T5LNAMWNA/A081P9QLH7D/collaborators) for å få tilgang til å hente emoticons.

Legg til SLACK_TOKEN i en lokal .env-fil.
Token hentes på api.slack.com -> your apps -> nais-announcements -> install app

Kjør:

```
npm install
npm run dev
```

## Opprette announcement

For å lett komme i gang med en ny announcement, er det laget en enkel mise task:

```
mise run announcement "En fengende tittel"
```
