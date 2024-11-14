---
title: "OAuth del 3 (PKCE)"
description: "OAuth Proof Key for Code Exchange (PKCE)"
date: 2021-03-07T12:49:37+01:00
draft: false
author: Jan-Kåre Solbakken
tags: ["oauth", "oidc", "sikkerhet"]
---

![OAuth2](/blog/images/oauth2.png) 

## Bakgrunn

Dette er del 3 i serien om OAuth og OIDC. Den mest brukte OAuth-flyten, "Authorization Code flow", innebærer at `client` og `id provider` utveksler hemmeligheter. Klienten må derfor være i stand til å holde på hemmelig informasjon på en trygg måte, i standarden omtales dette som `confidential clients`. For mobil-apps og "single page" webapplikasjoner har dette ikke vært gjennomførbart da hemmelighetene må distribueres helt ut til sluttbrukeren som en del av appen.

I [del 1](/blog/posts/oauth1) ble standarden og terminologien gjennomgått, ta en titt på den hvis du trenger en innføring eller oppfriskning.

Authorization Code flow har også en svakhet som kalles "authorization code injection". Et slikt angrep er komplisert å gjennomføre og krever at mange ting skal klaffe samtidig, men er ingen umulighet. Dersom noen som har stjålet din `client_id` og `client_secret` klarer å fange opp en authorization code kan de gjøre et token-kall på dine vegne, og dermed utgi seg for den aktuelle sluttbrukeren. Hvordan klarer man så å fange opp en authorization code? Callbacks gjøres jo kun til (forhåpentligvis) forhåndsgodkjente URLer over HTTPS? Vel, ikke alltid. En måte er å utnytte custom "URL schemes" på telefoner. En telefon-app vil typisk registrere callback URLs av type `myapp://something`, dette gjør at kallene rutes til denne appen. Hvis en angriper får deg til å installere en app som registrerer seg som lytter på myapp-URLs vil denne appen også få tilsendt callbackene som inneholder koden.

## PKCE

For å bøte på disse svakhetene har det blitt laget et tillegg til OAuth-standarden. Tillegget beskriver teknikken "Proof Key for Code Exchange" som forkortes "PKCE" og uttales "pixie".

Authorization Code flow ser ut som vist i figuren (se [del 1][del 1](/blog/posts/oauth1) for detaljer).

![authorization code flow](/blog/images/auth_code.png) 

PKCE legger på følgende tillegg:
 - Klienten genererer en tilfeldig verdi som kalles `code_verifier`. Denne brukes til å generere en `code_challenge` vha en forhåndsavtalt metode. Challengen og `code_challenge_method` legges som ekstra parametre på det initielle `/auth`-kallet til id-provideren.
 - Id-provider svarer som vanlig, men tar vare på `code_challenge` og `code_challenge_method`.
 - Klienten sender `authorization_code` som vanlig med i `/token`-kallet, men legger i tillegg på den samme `code_verifier` som ble generert i punkt 1.
 - Id-provider bruker `code_verifier` til å generere en `code_challenge` på samme måte som klienten gjorde. Hvis de to code challengene ikke er like avvises forespørselen.

 Et auth-kall vi da kunne se ut som følger: 
 ```bash
 GET /auth?
      response_type=code&
      client_id=myclient&
      redirect_url=myapp://callback&
      scope=whatever&
      state=123&
      code_challenge=elUXu5zy4QT2f92GRaUq23autAeNDf4DQPaycR0ek_o
 ```

Angripere som kjenner din `client_id` og `client_secret` vil dermed ikke kunne gjøre token-kall fordi de ikke kjenner verifieren som ble generert og brukt i punkt 1. Selv om de er i stand til å observere både requesten til og responsen fra `/auth`-endepunktet vil de ikke være i stand til å rekonstruere code challengen.

Standarden definerer to ulike metoder å lage code challenges med: `plain` og `S256`. Plain vil si at code_verifier og code_challenge er samme verdi. For S256 lages code_challenge etter følgende oppskrift: 

```javascript
base64UrlEncode(sha256(ascii(code_verifier)))
```

Plain challenges har jo begrenset nytteverdi, så klientene er pålagt å bruke S256 med mindre særlige begrensninger i ressurser eller annet gjør at de ikke er i stand til det. Siden sikkerheten er basert på at code verifieren ikke kan brute forces er det viktig at den er tilfeldig nok (standarden foreslår en entropi på minimum 256 bit). For å holde implementasjonen enkel (og fordi entropien er sterk i utgangspunktet) kreves det ikke salting.

PKCE er støttet i flere biblioteker for flere språk, deriblant [Java/Kotlin](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/examples/oauth/pkce), [Go](https://github.com/ory/fosite) og [JavaScript](https://github.com/panva/node-openid-client).

## Videre lesning/fordypning
- [RFC 7636](https://tools.ietf.org/html/rfc7636) (Proof Key for Code Exchange by OAuth Public Clients)
- OAuth-delen av [PortSwigger Web Security Academy](https://portswigger.net/web-security/oauth)
- [Eksempel](https://www.youtube.com/watch?v=1ot45WwQWJE) på code injection-angrep
