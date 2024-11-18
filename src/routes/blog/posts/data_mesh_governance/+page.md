---
title: "Enable data teams to deliver high-quality data products"
description: "How data governance adds value in a data mesh"
date: 2022-05-11T09:27:57+02:00
draft: false
author: Louis Dieffenthaler
tags: []
---
Using data to develop the world`s best welfare system is a bold mission we at the Norwegian Welfare and Labour Administration (NAV) have.
Being able to estimate the impact of measures on youth unemployment to avoid social exclusion.
Gaining more insight on how we can adjust our communication to different user groups so that we are more certain that the citizens get their benefits.
To see how a new feature affects the click-through rate.
Data plays a central role in solving each of these cases.
So how do we get there?

NAV has in recent years undergone a radical change in its approach to developing products.
The traditional project-oriented approach of specifying “everything” up-front is replaced by a model where product teams are given the freedom to solve problems within boundaries.
Enabling the teams to explore problems without being tied to a specified output allows us to gain knowledge about the value, the feasibility as well as other aspects of the product.
Our ambition is to enable the teams to treat data in the same manner: as a product.

## The case for data governance
The shift from building data pipelines answering specific questions to sharing data as products that can solve a variety of problems not yet known is massive.
To make this leap, we look to the [data mesh-approach](https://martinfowler.com/articles/data-mesh-principles.html) described by Zhamakh Deghani.
The principle of shifting ownership upstream to domain teams supported by a platform reducing the cognitive burden resonates with how we do it on the operational side.
We firmly believe that the product teams are best positioned to produce data that meets the consumers` needs related to for instance business definitions and quality.
On the other side, we acknowledge that there are justifications for collaborating with other teams on reaching decisions.
A few of those are:
-	The need for coordination between teams. For instance, related to a common standard for communicating data quality
-	The need to make sure the teams´ internal decisions do not conflict with the “greater good” of NAV. Policies could for instance be applied to a data product with multiple critical dependencies downstream
-	The need to define policies related to compliance. GDPR is the prime example

## Governance should not only control but enable.
The word “governance” does not make people jump out of bed in the morning.
Traditionally, governance has been focused more on making sure people don`t do stuff they should not do.
Furthermore, data management – the management of business logic, access controls, etc. – has typically been the responsibility of a centralized team.
This might work in a static environment.

The cases presented in the introduction are not solved in a static environment.
Data scientists, decision-makers and product teams all need to find, understand and get access to data quickly in order to explore solutions.
At the same time, the usage of data needs to adhere to the organization`s policies.
In other words, data governance should enable teams to a) produce data matching the analytical needs of NAV and b) stay compliant.

## Principles and representation
The data mesh-paradigm describes a federated model of data governance.
The actors on the platform need to collaborate on developing policies that provide value and are feasible.
The data producers are supported by the data platform in performing the data management.
At NAV, we have approached this by setting up a “ground rules forum”.
The principles underlying the group`s work are:
1.	The responsibility of producing data as a product should be placed as close to the origin as possible
2.	Policies that move responsibility away from the data producers should be justified by value either in the form of analytical use or compliance
3.	The policies should be supported by the platform when this is feasible

The forum consists of team members with different perspectives:
-	Consumer: The value from an analytical perspective
-	Producer: The value from a producer`s perspective in addition to the cost of implementing policies
-	Platform: The knowledge of how the policies can be supported by the platform
-	Legal: The value in terms of compliance
-	Business owner: The overall business value

In a complex organization with close to 100 product teams, it is important to scope down the complexity.
Luckily for us, NAV is currently replacing legacy systems.
We use people from teams affected by and involved in this effort to set up the forum.
This makes it easier to reach decisions in the forum.
The plan is to calibrate the organization and processes before scaling out to other parts of the organization.
At the same time, we are also seeking input from other parts of the organization when forming policies.

## Governance affects everyone – and should include everyone!
Broad involvement of the people sharing and using data is crucial for at least two reasons:
It increases both the chance of forming better policies and the legitimacy of these policies.
The process we have set up from start is deliberately simple:
1.	People on the platform use Slack to discuss problems governance policies might solve
2.	The forum discusses suggested policies when enough input has piled up. The suggested policies are documented using an architectural decision record
3.	People on the platform share their opinions on the suggested policies
4.	Decisions are reached
5.	The policy is implemented, preferably supported by the platform.

Instead of engineering a complex process upfront, we start out with this and will calibrate it to fit our needs.

## How technology supports process
We are currently working on a feature that illustrates how the implementation of policy can be supported by technology.
To protect privacy, we have a policy that states that the consumer of data needs to document the legal basis for using the data.
On our marketplace – where the producers share data the consumers can find and understand – we are now working on a feature where the consumers can fill out a form to request access.
This feature is integrated with the databases where the legal basis is documented, easing the process for the consumer.
The request is sent to the data product owner`s site on the marketplace, where they can grant/reject access.
The policy was already there, but by adding the platform to the mix, we:
-	Eased the process for the consumer and the producer as the requests are now part of their workflow – not a Jira ticket completely on the side of everything
-	Eased the evaluation of assessments done by the consumers since we are logging it
-	Allowed for product thinking of this process. We can now set up metrics to see how long it takes for requests to be processed, the share of requests being rejected, etc. In turn, this can be used as input into the next iteration of the platform. This also covers the non-technical sides of the process: How can we change the policies to reduce frictions?

## Summing up
Governance is key to unlocking the value of data in a secure way.
To achieve this, we need to approach this by supporting teams instead of controlling them.
The approach we describe here is intentionally lightweight, and we will share our learning points as we progress. 
