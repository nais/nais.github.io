---
title: "clamav tilbyr /api/v2/scan"
date: 2025-12-18T08:25:00+01:00
author: Sten Ivar Røkke
tags: [ clamav-rest ]
layout: log
---

*clamav er utvidet med endepunktet /api/v2/scan*

Det er lagt til et nytt endepunkt for clamav som kan benyttes internt i nais clustere.
Endepunktet er mer eller mindre likt med /scan, men gir litt mer informasjon tilbake til klienten.

Det opprinnelige endepunktet /scan vil fortsatt være tilgjengelig og fungerer som tidligere. 
Så ingen endringer er påkrevd for de som allerede benytter clamav-rest.

Takk til Landbruksdirektoratet for å ha bidratt med endringsønsker, testing og tilbakemeldinger underveis.

*Hva er nytt?*

Tidligere har man kun fått tilbake et resultat sier om virus er funnet eller ikke og filnavnet.

I det nye endepunktet returneres resultatet på samme måte, men inneholder også informasjon om hvilket virus som evt er funnet og feilmelding dersom noe uforutsett skjer.
Den andre forskjellen er at endepunktet vil returnere HTTP/200 selv om en feil inntreffer under skanningen, men da med informasjon om hvilken feil som oppstod (i gammelt endepunkt fikk man HTTP/500).

*Hvordan endre til det nye endepunktet?*

- Endre URL'en i klienten fra `/scan` til `/api/v2/scan`.
- Kode må endres for å håndtere nytt resultatformat
- Kode må endres for å håndtere feilmeldingene som kan returneres
 
Endringene beskrevet i [dokumentasjonen](https://github.com/nais/clamav-rest) for clamav-rest.

👉 [Les mer og kom i gang i dokumentasjonen](https://doc.nais.io/services/antivirus/)
