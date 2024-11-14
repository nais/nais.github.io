---
title: "Pentesting in the open"
description: "security != obscurity"
date: 2023-10-02T09:34:04+02:00
author: "Jan-Kåre Solbakken"
tags: ["sikkerhet"]
draft: false
---

![hacker](/blog/images/hacker.jpg) 

Transparency has always been at the core of our mindset in the nais team. 
We [open source](https://github.com/nais) just about all of our code, and use every opportunity to share our thoughts and processes through mediums such as this blog (although the rate of publishing lately doesn't impress anyone...), conference talks and various collaboration forums. 

Traditionally, penetration tests have been shrouded in a fog of mystery. 
It is not common practice to be open about the results of such tests, and they often end up in a distant fileshare somewhere never to be seen again. 
This is a shame since the findings in these reports are great learning opportunities for the developer community.
No matter how hard you try, the number of findings in such tests are never zero. 
So, going forward we plan to publish all of our reports (responsibly, of course). 
Kudos to Scott Helme and [Report URI](https://scotthelme.co.uk/report-uri-penetration-test-2022/) for the inspiration and to [mnemonic](https://www.mnemonic.io/) for their cooperation.

The first one out is [Teams](https://github.com/nais/teams-backend) (no, not that one), our self service solution for provisioning and maintaining members and resources for our teams in NAV. 
These resources include stuff like projects and groups in Google Cloud, GitHub and Azure. 
Maintaining these manually for hundreds of teams would have been extremely error prone as well as being a major pain. 

So without further ado, [here](/blog/docs/20230925_mnemonic_NAV_penetration_test_report_Pub1.1.pdf) is the report. 
We have chosen to leave the auth-less endpoints as is since they don't disclose any sensitive information, and this info can just as easily be found in our source code. 
The TLS issues are being dealt with in our load balancers. 

By doing this we hope we can inspire others to follow suit. 
By sharing our mistakes we can all learn from each other and up our security game.