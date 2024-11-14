---
title: "OAuth del 1"
description: "OAuth for dummies, del 1"
date: 2020-09-10T20:55:53+02:00
draft: false
author: Jan-Kåre Solbakken
tags: ["oauth", "oidc", "sikkerhet"]
---

<!-- ![OAuth2](/blog/images/oauth2.png)  -->

## Innledning

<!-- Dette er del 1 av 3 om OAuth og OIDC, hva det er, hvilke problemer det løser og hvordan vi bruker det i NAV. Denne første delen forsøker å forklare og avmystifisere standardene litt. [Del 2](/blog/posts/oauth2) tar for seg den nylig standardiserte `Token Exchange`-flyten og hvordan vi har løst den med [TokenX](https://doc.nais.io/security/auth/tokenx/). [Del 3](/blog/posts/oauth-del3-pkce) handler om "Proof Key for Code Exchange", a.k.a. PKCE. -->

## Bakgrunn

Håndtering av identiteter og autorisering av brukere er vanskelig å gjøre riktig. Vi har stadig flere kontoer og identiteter rundt omkring, og det er ikke uvanlig å ha hundrevis av brukernavn/passord-komboer å holde styr på. For å lette på dette problemet trenger man “single sign on” og føderering av identiteter, både på internett og internt i organisasjoner. Etterhvert som man benytter flere tjenester rundt omkring oppstår det også et behov for å kunne dele data mellom dem på en trygg måte. Kanskje du vil dele Google-kalenderen med bilen sånn at navigasjonssystemet kan rute deg automatisk til riktig sted basert på dato og klokkeslett? Eller kanskje du ønsker å gi Snyk tilgang til dine private repositories på GitHub sånn at de kan scannes for sårbarheter? Tidligere var den eneste måten å få til slik datadeling på at man delte passordene sine mellom tjenestene sånn at de kunne logge seg inn på dine vegne. Det er ikke en spesielt bra løsning. Man kan ikke begrense hva de ulike tjenestene skal få lov til å gjøre på dine vegne, og du har ingen kontroll på at de tar vare på passordene dine på en forsvarlig måte.

## Hva er OAuth?

[OAuth](https://oauth.net/) (p.t. i versjon 2) er en standard som fasiliterer nettopp dette: tilgang til informasjon i andre applikasjoner uten å måtte dele påloggingsdetaljer. Istedenfor brukernavn og passord mellom tjenestene brukes kryptografisk signerte “access tokens” som kun gir tilgang til den informasjonen du har godkjent på forhånd i et begrenset tidsrom. Steder som Facebook og Twitter lar deg dele informasjon fra profilen din, mens Slack og Github gir tilgang til kanaler og repositories. Standarden beskriver et sett med metoder (“grants/grant types” eller “flows”, kjært barn har mange navn) som benyttes for å anskaffe og bruke tokens i ulike settinger. Det utstedes to typer tokens: access tokens og refresh tokens. Access tokens brukes for å gi tilganger og refresh tokens brukes for å fornye utløpte access tokens uten ny pålogging (der man har valgt å tillate dette). Disse formateres ofte som “JSON Web Tokens” (JWT, uttales noen ganger “jawt” eller "jot"), mer om disse senere.

For å forstå OAuth er det viktig å ha kontroll på terminologien som brukes:

| Begrep                     | Betydning  
| -------------------------- | -----------------------
| resource owner             | Den som eier ressursene som skal aksesseres. Kan være et menneske eller et datasystem.
| resource server            | Datamaskinen som tilbyr den etterspurte ressursen (API-et man ønsker å kalle på vegne av resource owner).
| client                     | Applikasjonen som ønsker å aksessere ressurser på vegne av resource owner.
| id-provider (idp)          | Den som autentiserer resource owner og utsteder tokens.
| grant/flow                 | Metoden (“flyten”) som brukes.
| scope                      | Hvilke(n) type(r) informasjon det bes om tilgang til, varierer mellom ulike tjenester. Slack har f.eks. scopes som “channels:read” mens GitHub har “repo:status”.
| jwt                        | JSON Web Token. [Standard](https://tools.ietf.org/html/rfc7519) som definerer et format for å representere “claims” (påstander om personen eller applikasjonen som tokenet omhandler).

OAuth-flytene krever at client og id-provider kjenner til hverandre på forhånd. Klienten får tildelt en “client id” (kan tenkes på som et brukernavn) når den registreres, og partene utveksler en “client secret” (kan tenkes på som et passord) og/eller client sin public key på forhånd via andre kanaler.

## Oversikt over ulike flows

Det finnes som nevnt flere ulike flows for ulike situasjoner. Designet av disse er bl.a. formet av om klienten er “public” eller “confidential”. Confidential betyr at klienten kan holde på hemmeligheter. mens public betyr at den ikke kan det. Eksempler på public clients er “single page” webapps hvor alt skjer i JavaScript i resource owneren sin browser. De mest vanligste flytene (og de som vi vil gå inn på her) er `client credentials flow` og `authorization code flow`

### Client credentials flow

Denne flyten brukes for maskin til maskin-kommunikasjon. Client og resource owner er da i praksis samme ting, og client er confidential.

<!-- ![client credentials flow](/blog/images/client_creds.png)  -->

* Klienten sender `client_id` og `client_secret` til authorization server
* Serveren sender et access token i retur
* Dette access tokenet sendes deretter med hver request (typisk som en Bearer header) til resource server som validerer det og sender den forespurte ressursen i retur.

### Authorization code flow

Dette er den vanligste flyten, og benyttes for webapps som har en egen backend. Kalles av og til for “three-legged OAuth”.

<!-- ![authorization code flow](/blog/images/auth_code.png)  -->

* Bruker initierer login.
Klienten sender en autentiserings-request til id-provider med ønskede scopes og et `state`-parameter. Dette er en random verdi som bør være vanskelig å gjette. Verdien sendes tilbake til klienten og brukes til å forhindre [XSRF-angrep](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
* Bruker logger inn og godtar at klienten skal få tilgang til de forespurte scopes.
* id-provider redirecter til `redirect_uri` med en engangs `authorization code` og state som den fikk i pkt 2. For å unngå [open redirect-angrep](https://www.sans.org/blog/linkedin-oauth-open-redirect-disclosure/) bør man kun tillate redirect til forhåndsgodkjente URL-er.
* Klienten veksler `authorization_code` og `client_secret` (eller et signert JWT) med et access token som så kan brukes (typisk som Bearer header) i videre kommunikasjon. Hvis man ba om scopes som gjør at id-token (ifm OIDC, mer om dette straks) også returneres vil tokenet inneholde nonce fra steg 2, dette for å lettere kunne forhindre [replay attacks](https://en.wikipedia.org/wiki/Replay_attack). Tokenets “issuer” og “audience” må også valideres (mer om disse i avsnittet om JWT litt senere).

Både sluttbrukeren (resource owner) og klienten må altså identifisere seg til id-provideren, og sluttbrukeren må eksplisitt godkjenne at den forespurte informasjonen kan utleveres. En uærlig tjenestetilbyder kan dermed ikke gjøre uautoriserte forespørsler på egen hånd.

## OIDC

[OpenID Connect](https://openid.net/connect/) er identitetslag bygd oppå OAuth. Det tilbyr verifikasjon av identiteten til sluttbrukeren og grunnleggende profil-info. For å beskrive brukeren benyttes id-tokens i form av JSON Web Tokens. OIDC innførte også konseptet “discovery”, dvs at providerne publiserer metadata om tjenesten sin (URL-er til de ulike endepunktene, public keys mm) i et “well-known”-dokument på en standard URL sånn at man kan slå opp denne informasjonen automatisk. Slik ser f.eks. dokumentene til [Microsoft](https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration) og [Google](https://accounts.google.com/.well-known/openid-configuration) ut. Flyten er den samme som for `authorization code flow`, men hvis man ber om scope “openid” får man et id-token i retur. OIDC definerer også flere nye scopes som brukt i kombinasjon med “openid” bestemmer hvor mye informasjon id-tokenet skal inneholde. Disse er bl.a. family_name, given_name, profile og picture. Hvilke av disse som støttes av en gitt provider annonseres i well-known-dokumentet.

## JWT

Et JSON Web Token består av 3 deler, en header, en payload og en signatur. Standarden definerer et sett med [felter](https://tools.ietf.org/html/rfc7519#section-4.1) som kan brukes i header og payload, men man kan også legge på sine egne. Følgende er et eksempel på en header:

```javascript
{
  “alg”: “HS256”,
  “typ”: “JWT”
}
```

`alg` sier hvilken algoritme som er brukt for å generere signaturen, i dette tilfellet HMAC med SHA256. Standarden definerer [et sett med algoritmer](https://tools.ietf.org/html/rfc7518#section-3) som kan benyttes.

Payloaden inneholder `claims`. Et eksempel på en payload:

```javascript
{
  “iss”: “Evil Corp”,
  “sub”: “12345678910”
  “aud”: “my_api”,
  “exp”: 1520589928
}
```

| Felt      | Betydning  
| --------- | ----------
| iss       | Issuer (utsteder)
| sub       | Subject (hvem tokenet omhandler)
| aud       | Audience (tiltenkt mottaker/bruker av tokenet)
| exp       | Expiry/expiration (utløpstidspunkt)


Alle tidspunkter er i sekunder siden “the epoch” (1. Januar 1970).

Før tokenet sendes “på linja” serialiseres det på formatet 

`<Base64 encoded header>.<Base64 encoded claims>.<Base64 encoded signatur>`

Hver del base64-encodes altså hver for seg og settes deretter sammen med punktum mellom.

Nedenfor er et eksempel, for å dekode det kan det limes inn på f.eks. [jwt.io](https://jwt.io). 

```javascript
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## OAuth/OIDC i NAV

I NAV har vi valgt å bruke [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc) som provider for interne brukere og [ID-porten](https://difi.github.io/felleslosninger/oidc_guide_idporten.html) for sluttbrukerne ute på weben. Provisjonering av “clients” for din applikasjon skjer automatisk når du legger til de nødvendige besvergelser i din [Nais YAML](https://doc.nais.io/addons/oauth2-openidconnect), og nødvendige hemmeligheter tilgjengeliggjøres for appen din som miljøvariabler eller filer slik at mennesker aldri trenger å se dem. Hemmelighetene vil i tillegg roteres automatisk hver gang appen deployes. For de nyskjerrige som vil vite mer om hvordan dette gjøres i praksis kan de ta en titt på våre custom Kubernetes-operatorer [Azureator](https://github.com/nais/azurerator) og [Digdirator](https://github.com/nais/digdirator) (fordi IDPorten er et produkt fra Digitaliseringsdirektoratet).




