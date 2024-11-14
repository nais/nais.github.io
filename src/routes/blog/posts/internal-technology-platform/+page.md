---
title: "Do we need an internal technology platform?"
description: "The case for platforms at NAV"
date: 2021-08-13T09:27:57+02:00
draft: false
author: Bente Lønnquist Busch
tags: []
---


Not too long ago, one of the major pain points in running a digital operation was infrastructure. The waiting time to get a new server, the e-commerce sites on Black Friday crashing, and the headache of estimating your hardware and license needs for the next 3 years. These issues have diminished with the emergence of hyperscale cloud vendors offering an ever evolving portfolio of managed technical infrastructure and services. The products have amazing breadth, depth and quality, and at the same time, the pricing model is fair as you only pay for what you use.

The prices are even steadily declining without you having to negotiate. No wonder public cloud has become the preferred choice for everyone, from the smallest start-up to large enterprises. The question is, with these new possibilities - infrastructure, runtime environments, databases and even pre-trained machine learning models - only a mouse click away, do we still need an internal technology platform? Aren't internal infrastructure teams something of the past?

## What is NAV and what does our digital operation look like?

NAV (Norwegian Labour and Welfare Administration) is the largest public agency in Norway. Our mission is to assist people into work, and we provide a series of benefits related to pensions, disease, unemployment, and others.

![Bone fracture foot and leg on male patient with splint cast and crutches during surgery rehabilitation and orthopaedic recovery staying at home](/blog/images/GettyImages-1159293076.jpg)

Our digital operation consists of over a hundred teams which are responsible for something technology related, big or small. At the time of writing, around half of them are cross-functional product teams, and this number is steadily increasing. We seek to group teams together in product areas which have high cohesion, and aim for little coordination and low coupling between product areas. We give teams and product areas the autonomy to figure out how to best meet the needs of their defined user group and particular life situation.

## What is our take on having an internal technology platform?

Over the past 3ish years, we have developed platform products which support our digital product teams. They were not bought as a suite or built by a large three-year project. They had their origin from some software developer, data scientist or designer who felt that there was something missing in order for them to perform their craft efficiently, and started to make features that fixed that problem. Over time, these features were adopted by others, and in turn dedicated people set about maintaining them. They became the platform teams. The next evolutionary step was to think of this set of features as one or more platform products, and develop them with the same mindset as any other digital product.

## We currently have 3 groups of platform products:

1. The application platform, [NAIS](https://nais.io) (NAVs Application Infrastructure Service) delivers everything our digital teams need to develop and run an application. It provides an effective deployment pipeline (CI/CD), a Kubernetes container environment, logging and monitoring, and security stuff like authentication and secrets handling. The main user group is software developers.

2. The data platform, [NADA]([https://docs.knada.io/) offers data handling and analytical capabilities for storage, processing and visualization, as well as supporting services like data catalogues for data discovery and governance. The main user groups are developers who want to share data and analysts who want to use data.

3. The design system, [Aksel](https://aksel.nav.no/) is a library of design components, guidelines and good practices. The main user groups are designers and front end developers.

Services supporting the actual platform products are documentation, support, procurement and vendor relations, and technical security and risk evaluations. The platform products are in continuous evolution. For example, in addition to these three, we see the potential of providing platform products more specifically towards front end development, and will start exploring this during the fall.

## What do we need to make it work?

**The platform teams are staffed with some of our most competent people** (in my humble opinion). The intention behind that prioritisation is that the effect of their work is multiplied with the number of teams using the platform. Instead of mediocre or even bad x 100, the effect we want is outstanding x 100.

**We have a product mindset.** It can be tempting to make a platform with state-of-the art technology and spend a lot of time testing and experimenting with what Netflix and Spotify use. However, a product mindset means to focus on three tings and develop solutions where they overlap: 1) the users' needs 2) what is a possible technical solution 3) what is viable for the team and our business. Most of the experimentation happens in the product teams, and the platform teams makes it available only after it has proven it's worth.

**Our platform teams are opinionated.** Yes, we are focusing on user needs. Still, we are responsible for making an attractive platform or a "golden path". In practice, we sometimes diverge from what the users express as their needs. For example, we can explore a new technology or technique without it being an expressed request from a user. And vice versa, we can deny a request that comes from several teams.

## What benefits are we getting?

There are several major benefits to providing a technology platform in an organisation like NAV. Not only because of the scale of our digital operation, but also in order to comply with regulatory demands.

* **Supporting speed, adaptability and learning:** As many other organisations, we are striving for high speed in our digital operation. The ability to learn and adapt faster is necessary in this ever faster changing environment. One proxy to measure this is the number of deployments made to production, since our ability to push code to production indicates how long it will take to fix a mistake, and will in turn increase our willingness to test and experiment. This graph shows how NAV has evolved from 6 big releases every year in 2012, to 1,250 deployments per week so far in 2021:

![Graph of number of deployments to production per week in NAV](/blog/images/deployments-per-week.png)

* **Cognitive load:** The platform products allow our product teams to use their mental capacity on the end-user, and not spend time on under-the-hood stuff like infrastructure or choosing an accessible colour palette.

* **Autonomy vs alignment:** From a corporate perspective, one effect of high autonomy is losing alignment. At NAV, we see that building in certain compliance and security measures in the platform to provide the product teams with guardrails. For example, all use of third-party solutions like open source libraries, cloud platforms and SaaS products, are compliant in terms of procurement regulations. All icons and design elements are compliant in terms of universal accessible design. Our platform services available in public cloud are set up restricted to EU data centers in order to stay compliant to GDPR and conform to the [Zero Trust Security model](https://nais.io/blog/posts/2020/09/zero-trust-networking-in-gcp.html).

* **Competence and knowledge sharing:** When the internal technology platform is perceived as a compelling product, it is widely adopted and used. In turn, everyone has competence on how to use the platforms. There are several benefits: For one, it lowers the "cost" (e.g. time to get up and running) of people switching product teams, since the tool stack and methodology is more or less the same. Secondly, it further supports and enforces the strategy of loose coupling, autonomy and distributed responsibility, as it facilitates a forum for knowledge sharing. If a software developer in one team posts a question on Slack on how to perform a specific operation on NAIS, a software developer from another teams is just as likely to answer as the NAIS team members themselves.


## To conclude:

As you probably have guessed, NAV has great benefits from our internal technology platforms. However, I do not believe that it is the right solution for everyone. A start-up or scale-up with 5 or less digital product teams are likely fully capable of sharing practices and learnings between each other without standardisation of platforms. You should only consider a common platform when you start feeling the pain of everyone having to use a significant amount of their mental capacity on lower-level stuff. Then, you should start small and keep high attention to the user, and avoid falling in love with the technology buzz word of the month. That, of course, is the rule of thumb in all product development.


On a final note, I wish to share some of our main sources of inspiration:

* [Team topologies](https://teamtopologies.com/?gclid=EAIaIQobChMIhqPEpeKr8gIVzOd3Ch08nQTAEAAYASAAEgKp4vD_BwE), for categorisation of teams and the purpose of platform teams
* [Thoughtworks, for the rationale behind internal technology platforms ](https://www.thoughtworks.com/perspectives/edition4-platform-strategy/article)as well as the concept [Data Mesh](https://www.thoughtworks.com/what-we-do/data-and-ai/data-mesh)
* The books [Inspired](https://svpg.com/inspired-how-to-create-products-customers-love/) and [Empowered](https://svpg.com/empowered-ordinary-people-extraordinary-products/) by Marty Cagan, for a true product mindset
