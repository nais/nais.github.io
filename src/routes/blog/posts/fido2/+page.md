---
title: "FIDO2"
description: "Intro to FIDO2"
date: 2021-01-11T23:58:03+01:00
draft: false
author: Jan-Kåre Solbakken
tags: ["sikkerhet", "fido2", "webauthn"]
---

![fido logo](/blog/images/fido_logo.png) 

According to the [Verizon 2017 Data Breach Investigations Report](https://enterprise.verizon.com/resources/reports/2017_dbir.pdf) more than 80% of all data breaches can be attributed to weak and/or stolen passwords. Despite all of their weaknesses passwords are still the de facto way to authenticate users because no one has come up with a viable alternative. Now, however, there is a new(-ish) kid in town. FIDO2 (more commonly known as WebAuthentication or WebAuthn) is a standard developed by the [FIDO (Fast IDentity Online)](https://fidoalliance.org/) alliance. The standard leverages Public Key Cryptography and specialised hardware called “authenticators”. It is based on the work from the [U2F standard](https://en.wikipedia.org/wiki/Universal_2nd_Factor). FIDO2 can be used as a single factor or as one part of multi-factor authentication.

FIDO2 provides all the things that passwords struggle to: strong and unique credentials as well as resilience against phishing and stolen/cloned credentials.

The standard defines three actors:

- Relying Party: The webapp that needs to authenticate its users.
- Authenticator: A hardware gadget that generates keys, stores them safely and use them to sign data. The secrets (i.e. the private keys) never leave the device.
- Client: the glue between the Relying Party and the Authenticator, implemented in the web browser and exposed as a JavaScript API.

Authenticators come in two flavors: `roaming` and `platform`. Roaming authenticators are portable “keys” such as [YubiKeys](https://www.yubico.com/products) or [SoloKeys](https://solokeys.com). They communicate with the clients through USB, NFC or Bluetooth. Platform authenticators are (as the name suggests) platform specific and leverage some kind of [Secure Element](https://encyclopedia.kaspersky.com/glossary/secure-element/). The most widely known implementation of this is probably the [Apple Secure Enclave](https://support.apple.com/en-gb/guide/security/sec59b0b31ff/web). Authenticators are required to obtain physical confirmation from the user before participating in FIDO2 operations. This confirmation can be a button push, a passphrase or some kind of biometrics.

![fido2 protocols](/blog/images/fido2_protocols.png) 

In addition to the actors the FIDO2 standard defines two protocols: WebAuthn and CTAP2 (Client To Authenticator Protocol). WebAuthn defines the interaction between the Relying Party and the Client, whereas CTAP2 defines the interaction between the Client and the Authenticator. All WebAuthn communication must be done through HTTPS.

Two different actions (“ceremonies”) can be performed in a FIDO2 context: registration and authentication. The flow for registering a new user is as follows:

![fido2 registration](/blog/images/fido2_registration.png) 

1. Client requests registration
2. Relying Party generates challenge
   - Prevents replay
3. Client validates origin (using TLS) and sends info to authenticator
   - Prevents phishing
4. Authenticator checks user presence and consent before generating key pair and storing the private key
   - Prevents silent tracking
5. Authenticator verifies client data, creates key pair, stores the private key and sends back attestation object with the public key. This object is signed with the authenticator’s attestation key.
   - No secret is shared with the Relying Party
6. Relying Party verifies the attestation and stores the user handle and public key.
   - Prevents phishing
   - Proof that the private key is safe

The authentication flow is very similar, but the authenticator response is now signed with the private key generated during registration:

![fido2 suthentication](/blog/images/fido2_authentication.png) 

1. Client requests authentication
2. Relying Party generates challenge
   - Prevents replay
3. Client validates origin (using TLS) and sends info to authenticator
   - Prevents phishing
4. Authenticator checks user presence and consent before retrieving the private key.
   - Prevents silent tracking and covert login
   - Credentials are restricted to one Relying Party
5. Authenticator creates a response and signs it with the private key.
   - Secret is never shared with the client.
6. Relying Party verifies the response signature and contents before logging in the user.
   - Prevents phishing
   - Prevents man-in-the-middle

The authenticator may also maintain a counter that is increased and returned to the relying party every time an authentication is performed. This makes it easy to detect cloned credentials as the counters on the server and the authenticator will fall out of sync. 

The JavaScript API used by the client to bootstrap the registration and authentication process can be found at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API). 

The Relying Party server needs to generate and verify challenges as well as verifying the signature, origin and contents of the response from the Client. As with all other operations dealing with cryptography the probability of making mistakes is quite high, so the safest bet is to use well tested libraries, many of them are listed at [webauthn.io](https://webauthn.io/).

So, will FIDO2 lead to the death of passwords? Probably not, at least for the short term. Passwords are ubiquitous throughout the industry, and replacing super-widespread technologies can take decades regardless of how superior the replacement is. The FIDO2 initiative is widely backed by some of the biggest players in the industry though, so we will start to see more and more services offering support. Major players such as Microsoft and Gooogle already offer support throughout their lineup.

## Links/further reading
- https://webauthn.io/ (playground for testing FIDO2)
- https://fidoalliance.org/specifications/ (the standard)
- https://www.yubico.com/authentication-standards/fido2/ (Yubico’s start page for FIDO2)
- https://www.dongleauth.info/ (a community driven list of sites and services supporting strong authentication)
