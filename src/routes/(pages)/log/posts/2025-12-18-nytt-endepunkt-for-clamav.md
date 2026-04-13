---
title: "clamav tilbyr /api/v2/scan"
date: 2025-12-18T08:25:00+01:00
author: Sten Ivar Røkke
tags: [clamav]
layout: log
---

_clamav er utvidet med endepunktet /api/v2/scan_

Det er lagt til et nytt endepunkt for clamav som kan benyttes internt i nais clustere.
Endepunktet er relativt likt med /scan, men gir litt mer informasjon tilbake til klienten.

Det opprinnelige endepunktet /scan vil fortsatt være tilgjengelig og fungerer som tidligere.
Så ingen endringer er påkrevd for de som allerede benytter clamav-rest med mindre man ønsker.

Takk til Landbruksdirektoratet for å ha bidratt med endringsønsker, testing og tilbakemeldinger underveis.

_Hva er nytt?_

Tidligere har man kun fått tilbake et resultat sier om virus er funnet eller ikke og filnavnet.

Nytt endepunkt vil i tillegg returnere hvilket virus som evt er funnet og feilmelding dersom noe uforutsett skjer.

Nytt endepunkt vil returnere HTTP/200 selv om en feil inntreffer under skanningen,
men da med informasjon om hvilken feil som oppstod (fra gammelt endepunkt fikk man HTTP/500).

_Hvordan endre til det nye endepunktet?_

- Kode må endres for endepunktet: `/scan` -> `/api/v2/scan`
- Kode må endres for å håndtere nytt resultatformat
- Kode må endres for å håndtere feilmeldingene som kan returneres

Endringene beskrevet i for tjenesten [dokumentasjonen](https://github.com/nais/clamav-rest).

👉 [Les mer i nais-dokumentasjonen](https://doc.nais.io/services/antivirus/)
