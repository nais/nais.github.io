---
title: "OAuth del 2 (Token Exchange)"
description: "OAuth for dummies, del 2 (token exchange)"
date: 2020-09-16T08:10:01+02:00
draft: false
author: Jan-Kåre Solbakken
tags: ["oauth", "oidc", "sikkerhet"]
---

![OAuth2](/blog/images/oauth2.png) 

## Bakgrunn
I NAV er [OAuth og OIDC](/blog/posts/oauth1) de facto standard for å løse autentisering og autorisering i appene våre. I en løst koblet verden med mikrotjenester og [zero trust](https://doc.nais.io/appendix/zero-trust) er det imidlertid flere brikker som må på plass. Hvordan kan man på en trygg måte kalle andre tjenester videre bakover i kjeden og samtidig bevare sluttbrukerkonteksten? Tidligere har man benyttet såkalte "systembrukere", dvs brukere som identifiserer systemet/tjenesten som det kalles fra. Man har hatt en eller flere [Security Token Services](https://en.wikipedia.org/wiki/Security_token_service) som har vekslet systembrukerens brukernavn og passord inn i et access token som benyttes for videre kall. Dette har flere ulemper. Systembrukerene må ha ganske romslige rettigheter (som gjør det ekstra viktig at de ikke blir kompromittert), og informasjon om sluttbrukeren som initierte kallet blir borte med mindre man legger på hjemmesnekra hacks.

## Token Exchange standarden
[RFC 8693 - OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html) adresserer akkurat dette problemet, og har nå endelig blitt en "proposed standard". Azure AD (som vi bruker som ID-provider for egne ansatte) har lenge tilbydd en [on-behalf-of flyt](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) som er veldig lik den nye standarden, men for borgerne som logger på med ID-porten har vi ikke hatt noe tilsvarende.

### Flyten

![token exchange flow](/blog/images/exchange.png)

* Sluttbruker logger inn hos ID-provider.
* ID-provider returnerer et access token med audience `API 1`.
* API 1 ber om å veksle tokenet fra ID-provider med et nytt access token for API 2 fra exchangeren 
* Exchangeren validerer requesten og tokenet som skal veksles, sjekker om `API 1` er forhåndsgodkjent til å kalle `API 2` og returnerer et nytt access token beregnet på `API 2` med audience lik  `API 2`.
* `API 1` ber om data fra `API 2` på vegne av sluttbruker vha det nye access tokenet.
* `API 2` validerer access tokenet og returnerer de forespurte dataene.

Token exchange-forespørselen kan se ut som følger:

```shell
POST /token HTTP/1.1
Host: tokenxchange-server
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion=eY...............&
subject_token_type=urn:ietf:params:oauth:token-type:jwt&
subject_token=eY...............&
audience=app1
```

`grant_type` er en fast verdi som er definert av standarden.

`subject_token` inneholder tokenet som skal veksles og identifiserer sluttbrukeren (tokenet hen fikk fra id-provideren).

`audience` inneholder identifikatoren til appen som skal motta tokenet du nå ber om

`client_assertion` identifiserer appen mot exhangeren (i dette eksemplet `App 1`). En client_assertion er en Base 64-kodet JWT som appen genererer og signerer vha sin private nøkkel. JWT-en inneholder følgende claims:

```javascript
{
  'sub': `api1`,
  'aud': 'http://tokenxchange-server/token',
  'iss': 'api1',
  'exp': 1516239052
  'iat': 1516239022,
  'jti': 'a_unique_id',
  'nbf': 1516239022
}
```

## Token Exchange i NAV
Token Exchange-standarden er fortsatt fersk, og det er i skrivende stund ingen av de kommersielle leverandørene som har implementert den. Vi har derfor valgt å lage vår egen løsning som vi har kalt [TokenX](https://doc.nais.io/addons/tokenx). Den mest sentrale komponenten i TokenX er [Tokendings](https://github.com/nais/tokendings). Den er en OAuth 2.0 Authorization Server med funksjonalitet som en STS, men vi har valgt å ikke bruke den beskrivelsen fordi STS er et reservert ord i NAV. Provisjonering av nøkler som appene bruker til signering av assertions skjer automatisk ved deploy vha operatorer ([Jwker](https://github.com/nais/jwker/) og [Naiserator](https://github.com/nais/naiserator/)) i k8s clusteret, og tilgjengeliggjøres som miljøvariabler i podene. Hvilke apper som skal få lov til å snakke sammen utledes automatisk ut fra Istio access policyene som appene uansett må sette opp for å fungere. Nøklene roteres ved hver deploy.

