---
title: "Project Structure on GCP"
description: "A short explanation of projects in NAV's GCP setup"
date: 2020-12-01T11:21:27+01:00
draft: false
author: Gøran Berntsen
tags: [gcp, nais]
---

In terms of the [GCP resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), NAV is an **_Organization_**, each team is assigned two **_projects_** (one for dev and one for prod), and the teams can provision **_resources_** within these projects. In theory, these resources can be any of the [services offered by Google Cloud Platform](https://cloud.google.com/docs/overview/cloud-platform-services). In practice, some restrictions apply. More on this later.

The team projects are automatically set up when a team is added to [teams.yaml](https://github.com/navikt/teams) (NAV private repository). These projects will be named *{teamname}-dev* and *{teamname}-prod*, and owner/administrator roles will be assigned based on the associated Azure AD group. In addition, the team is assigned its own namespace in the nais kubernetes clusters. The namespace is named the same as the team in teams.yaml. 

There are three kubernetes clusters operated by nais on GCP:

| cluster    | project     |
| ---------- | ----------- |
| `prod-gcp` | `nais-prod` |
| `dev-gcp`  | `nais-dev`  |
| `labs-gcp` | `nais-labs` |

These clusters run in projects managed by the nais team. This means that team members of the product teams will not have privileges for the *project* the cluster runs in, nor the ability to manage the *resources* the cluster uses. However, the team is able to manage the *kubernetes resources in the team's namespace*.  

Resources in the kubernetes clusters are provisioned through [nais.yaml](https://doc.nais.io/nais-application/nais.yaml/reference/). In addition, [bucket storage](https://doc.nais.io/persistence/buckets/) and [postgres databases](https://doc.nais.io/persistence/postgres/) should also be provisioned through nais.yaml, but these resources will be added to the team's own project(s). 

![teams.yaml automatically provision team projects and namespaces](/blog/images/team_projects.png)

(Note: the team can also provision [Kafka topics through topic.yaml](https://doc.nais.io/addons/kafka/) and [Elastic Search through an IaC repo](https://doc.nais.io/persistence/elastic-search/). However, while these resources also reside on GCP, they are operated as SaaS-solutions by the vendor Aiven and run in the Aiven *organization*. As such, they cannot be directly managed by neither the product team nor the nais team through the Cloud Console.)

The team can also set up other GCP services in their own project(s). It is important to note that teams have access to enable services that haven't yet been pre-approved by the nais team. Before any new service can be used, however, the commercial and usage terms for that service must be evaluated and approved in cooperation with the Cloud Governance team, and a Risk Assessment must be conducted and accepted by the nais team. The currently approved services are the same ones as listed in [Platform Risk assessments](https://doc.nais.io/legal/nais-ros/).

On a final note, the team can access billing data for their GCP usage through the [per-team GCP billing dashboard](https://datastudio.google.com/u/1/reporting/417b0a1d-b307-4a6d-a699-77a6ab239661/page/mJdmB). In this dashboard, both resources billed through the team's *projects* and through the team's *namespaces in kubernetes* are shown.
