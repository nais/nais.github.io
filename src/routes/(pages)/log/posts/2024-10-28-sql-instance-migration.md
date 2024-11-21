---
title: "SQL instance-migrering"
date: 2024-10-28T12:55:13+02:00
author: Morten Lied Johansen
tags: [sql, postgres, migration]
layout: log
---

Har du lyst på en ny SQLInstance til applikasjonen din sier du?
Vi har laget et verktøy for å gjøre det enklere å migrere en applikasjon fra en SQLInstance til en ny.
Dette er nyttig når du ønsker å:
Redusere disken
Få privat IP, eller
Har lyst på rollback-mulighet når du oppgraderer til ny versjon av PostgreSQL
Vi er relativt sikre på at det skal fungere som det skal, men løsningen har mange bevegelige deler.
Selv om vi har gjort tusenvis av tester så er det en liten mulighet for at noe ikke virker helt som forventet.
Vi er derfor veldig interessert i å finne noen som har lyst til å teste det ut, for å få noen ekte erfaringer.
Hvis noen prøver og opplever at noe går galt, ta kontakt så hjelper vi dere i mål.
	
For å komme i gang, [se dokumentasjonen vår her](https://doc.nais.io/persistence/postgres/how-to/migrate-to-new-instance/)