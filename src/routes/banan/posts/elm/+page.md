---
title: "Introducing Elm as a frontend contender"
description: "Replacing React with Elm as our frontend programming language brings risks, rewards, and lots of developer happiness."
date: 2022-10-06T11:00:00+02:00
draft: false
author: Kim Tore Jensen
tags: [elm,frontend]
---

## Preamble

In the NAIS feature team, our tasks usually involve writing abstractions for
developers.  These abstractions usually emerge in the form of API backends,
Kubernetes operators or sidecars, command-line tools, and the like.  And,
rarely, we dawdle in web frontend development, which is largely an unknown
domain to us.  We don't mind: React is the de facto framework for frontend
application development, at least at NAV.  And, to use React, the application
must be written in Javascript or Typescript.

Javascript has some really nice features that makes it easy to mess up your
application and create bugs.  Many articles have been written on this, there is
no point writing another one.  There are some extensions such as Typescript
which addresses some of these issues at the cost of flexibility.  But then
again, we still have null exceptions. We have the option of ignoring error
handling.  There are the ambiguous "truthy" or "falsy" equality checks, which
can be mitigated by using the triple equality sign. However, one simple slip-up
and your application may seem to work fine, until one day it trips over itself
and reveals a bug.

The Javascript ecosystem is a huge pain point. Even a small boilerplate React
application pulls down hundreds of dependencies by default, which is not only a
security concern, but also uses a huge amount of network traffic and hard drive
space.

Our team has avoided doing frontend work because of these reasons. But we still
need to create some frontends.  Fortunately, there is a solution that addresses
all of these problems.


## A short introduction to Elm

[Elm](https://elm-lang.org/) is a pure functional programming language created
in 2012 by [Evan Czaplicki](https://twitter.com/evancz).  Elm compiles to
JavaScript and is excellent for websites and web apps. It has a strong emphasis
on simplicity and quality tooling.  This language has many interesting
properties, some of which we'll have a brief look at.

### Type system

First of all, the type system is amazing. It enables you to make impossible
states impossible. What does this mean?  With Elm's union types, you can create
a data model that simply does not allow for ambiguous state.  Consider the
following data model:

```elm
type alias UserData = { id: Int, name: String }

type User
    = Anonymous
    | Authenticated UserData
```

Either the user is anonymous, or we have an authenticated user with some
associated data. We can have as many associated values as we want.  It is
impossible to access the ID and name fields of an anonymous user. We can
already see that this pattern gives some pretty powerful guarantees.

```elm
type Msg
    = GotUserResponse (Result Http.Error UserData)
```

The message `GotUserResponse` has `Result` as associated data. The result type
also has associated data, which contains either `Ok UserData` or `Err
Http.Error`, and only that.  Again, it is impossible to access the user data if
an error occurs, and vice versa.

```elm
userFromResponse: Msg -> User
userFromResponse msg = 
    case msg of
        GotUserResponse (Ok user) ->
            Authenticated user

        GotUserResponse (Err _) ->
            Anonymous
```

The above function takes the above Msg and returns either an authenticated user
or an anonymous user.  The Msg is guaranteed to hold the object we need to
create a User, which in turn _must_ hold that object.  Any error ensures that
we cannot access any such object. The compiler makes impossible states
impossible.  This simple yet elegant design choice eliminates many possible
bugs. So good!

Check out the following talks by [Richard Feldman](https://twitter.com/rtfeldman)
for an in-depth introduction to Elm types.

- [From Rails to Elm and Haskell](https://www.youtube.com/watch?v=5CYeZ2kEiOI)
- [Make data structures](https://www.youtube.com/watch?v=x1FU3e0sT1I)
- [Making Impossible States Impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8)


### Pure functional

Elm is a pure functional language. This means that all data is immutable; it is
impossible to modify state once an object has been created.  This fact
guarantees that all function calls are free of side effects. Any code that
needs side effects (such as HTTP requests) must be handled explicitly through a
callback system through the Elm runtime, and cannot be called directly from a
function.

### Compiler driven development

Refactoring an Elm application is quite comfortable. You change your type to
match the real-world model, and follow the compiler errors through to the other
end. When you're done, you most probably still have a working application
again.  It sounds too good, but in our experience we find this to be true most
of the time.


## Introducing Elm to the team

So far, we established that Elm is arguably the proverbial oasis in the desert
of frontend programming.  I had already started investigating Elm on my free
time, so I was quite motivated to introduce it to our technology stack.

Not everyone on our team shared my opinion, and one of our team's pillars is
that important technical decisions should be made by a
[quorum](https://en.wikipedia.org/wiki/Quorum).  That meant addressing our
team's concerns, evaluating each one, and finally aligning our opinions to form
a decision.

Before starting on the concerns, it should be duly noted that one team member
was more than happy about the prospect of using Elm at work, and that another
team member supported Elm solely on the fact that _it's not Javascript_.  Yet
another member reasoned that we should try it out on the basis that we haven't
tried it out yet, and we'll likely never know if it's good for us if we don't
try.

### If Elm is so good, why isn't it more popular?

Elm is really not the most popular choice of language. In fact, it's not even
listed in the [StackOverflow 2021 developer
survey](https://insights.stackoverflow.com/survey/2021#most-popular-technologies-language).
That supposedly puts this wonderful language below COBOL in popularity. What
gives?

Most blog posts and talks I found on the topic reveals that people experienced
in Elm usually speaks quite warmly of it.  They praise the type system and joy
of development, and lament using other languages after befriending Elm.

However, with the release of Elm 0.19 in 2019, some language features that people depended on
[was removed entirely](https://discourse.elm-lang.org/t/native-code-in-0-19/826).
This was quite an unpopular decision amongst the community, and battle ensued.

* https://dev.to/kspeakman/elm-019-broke-us--khn
* https://www.reddit.com/r/elm/comments/9a0hc6/elm_019_broke_us/
* https://lukeplant.me.uk/blog/posts/why-im-leaving-elm/

There hasn't been a release of Elm since 2019.
Was this going to be a risk to our project?

### Small community and lack of Elm jobs

At NAV, we have plenty of React developers, and a small handful of Elm
developers.  In the professional world at large, things aren't a whole lot
better.  The Norwegian train company [Vy uses Elm for large parts of their
frontend](https://blogg.bekk.no/using-elm-at-vy-e028b11179eb). Barring that, a
quick search on FINN.no didn't reveal a single Elm oriented job in Norway.  If
we adopt Elm, what are the chances of finding competent people should the need
arise?  What happens to maintainability if our Elm programmers leave the team
or quit?  Will the rest of us need to either learn a technology they aren't
interested in, or perhaps rewrite the whole thing in React?

After asking around on our internal Slack channels, I found two NAV developers
who had been working on an Elm project in one of our development teams.  They
had been enjoying the fun of working with Elm, easy refactoring, and friendly
error messages.  However, their stack consisted of many frontend applications,
and there was a fair bit of context switching between languages, in addition to
some duplicate work in order to support some shared functionality.

That team ultimately had differing opinions on Elm, so the project was
abandoned after those two developers were relocated to a different team.

The conclusion from one of those Elm developers was that they would recommend
Elm for low-risk projects that would not have many frontend inter-dependencies.

### Accessibility and re-use

NAV invested considerable resources in developing [Aksel](https://aksel.nav.no/),
our in-house collection of tooling and components for frontends. These components implement
[universal design](https://en.wikipedia.org/wiki/Universal_design) and include
buttons, tables, colors, styles, etc. 

These come in the form of React components and are not directly compatible with Elm.

### Making a team decision

After thinking about these challenges, I spoke with each team member
individually, sharing the information I'd gathered, and listening to their
responses.  Judging from their mostly positive reactions, I decided to
facilitate a group discussion where we could reach a decision. Almost everyone
on the team joined the discussion.

All agreed that we should evaluate Elm, on the condition that this would be a
time-boxed experiment, using two of our developers during two weeks.
Afterwards, we would evaluate our results and thoughts, and if we were happy
with the outcome, we could continue working on the project in Elm, ultimately
deploying it to production.

The scope of the project was known already because we had implemented it in
React earlier.  We established the work group and decided to start on the next
week.  As a work methodology, we chose pair programming, which is useful when
learning new languages and concepts.  Also, having all members of the work
group present means that we can make decisions quickly.


## Implementation

The project we wanted to implement was the frontend for [NAIS
console](https://github.com/nais/console).  Console is an access control
software used to set up external services for our software development teams.

Requirements for the frontend were:
- Be able to log in and out using OAuth2
- Add and remove teams from the database
- Add and remove members from teams
- Add and remove administrators from teams
- Show a team's information and members
- Show the list of teams
- View audit logs

Our goal was to re-implement everything in Elm, attaining feature parity with
the already existing React application.

### GraphQL

Our backend exposes a [GraphQL](https://graphql.org) endpoint.  GraphQL is a
bit more complex than REST—instead of getting fixed data from multiple
endpoints as with REST, GraphQL lets you fetch data from multiple sources in a
single query, with strongly typed output using a schema.  There is more parsing
involved with GraphQL, but the benefits are great.

Fortunately, there is a very nice [Elm GraphQL
library](https://package.elm-lang.org/packages/dillonkearns/elm-graphql/latest/)
which makes it easy to work with these endpoints in Elm.

We can generate all the types, queries, and mutations that the API requires.
The only thing we need to do is start the API server, and run:

```sh
elm-graphql http://localhost:3000/query --base Backend --output src
```

### Deployment

Elm is compatible with [Vite](https://vitejs.dev), the next generation frontend
tooling.  Vite provides a development server with hot module reloading, and
facilitates production builds.  This provides us with the useful commands `npm
run dev` and `npm run build`.  We can make a change in one of our Elm source
files, and the code gets automatically reloaded in the browser, keeping the
existing state of the application.

For production builds, we compile the Elm code and bundle it together with our
static files in a Docker container based on NGINX.  All the compiled Elm code
runs directly in the browser, so there is no need for a proxy layer in between.
Server side rendering is not needed, as the code is already extremely fast.

In the end, we follow our standard procedures for build and deploy: When we
push the code to Github, the build runs automatically and deploys the Docker
container to the Kubernetes-based NAIS platform.

## Results

### Application quality

We are extremely confident that our application will not just crash because we forgot to do a null check.
The compiler does not allow us to write code that does not handle error cases.
This can be a bit tedious when developing, but pays itself back manifold when the code runs in production.
Furthermore, we know that functions cannot have side effects on our state, so
even though we didn't write any tests for this application, we feel confident that it works as expected.

Application speed is blazing fast, and the footprint is quite small.
```sh
% npm run build
[...]
dist/index.html                  0.54 KiB
dist/assets/index.68a03c7a.css   2.72 KiB / gzip: 1.02 KiB
dist/assets/index.92dff5fa.js    69.62 KiB / gzip: 22.81 KiB
```

### Comparison with React

As we had already implemented this frontend in React earlier, I did a quick
side by side comparison of the two versions, focusing on the dependency count
and asset sizes—and found the results quite disturbing.

|                | Dependencies | Dependency size | Compiled code size |
|----------------|--------------|-----------------|--------------------|
| **React**      | 796          | 637 MB          | 618 KB             |
| **Elm**        | 111          | 75 MB           | 70 KB              |
| **Efficiency** | **717%**     | **849%**        | **882%**           |

For our use case, React is quite bloated in comparison to Elm. These numbers
translate to less bugs, less network traffic, less disk usage, and shorter
build time.  Last, but not least: loading time in the browser decreases, not
just due to less network traffic, but also less parsing and evaluation of code.

## Conclusion

Working with Elm definitely has its benefits.  The type system really makes it
easy to accurately model the real-world data and avoid certain kinds of bugs.

Even though none of us had worked in a functional programming language before,
we found it easy to get started.  The syntax was a bit obscure in the
beginning, but quickly became natural. Anecdotally, I've worked with
[Golang](https://golang.org) professionally for around five years.  The
simplicity of working with data in Elm really makes me lament how terse Go is.
Iteration is not really a thing in Elm, we use _map_ and _reduce_ instead. It
is very refreshing not having to write `for` loops to transform data, and
similarly, error checking can usually be done in a single statement instead of
having to work through it like some checklist.

We are quite happy with the outcome of our Elm endeavour. Our plan forward is
to throw away the old React code for this particular project, and keep our Elm
code running in production. When the time comes to revamp our
[NAIS deploy](https://github.com/nais/deploy)
[frontend](https://github.com/nais/deploy-frontend), we will definitely
consider doing it in Elm.

We hope that this blog post will encourage more users to try Elm for their
frontend projects, to enjoy the benefits of increased developer satisfaction,
smaller assets, and less bugs.  Thanks for reading; best regards from the NAIS
feature team.
