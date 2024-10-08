<script lang="ts">
	import AutomaticSystem from "$lib/icons/AutomaticSystem.svelte";
	import Eye from "$lib/icons/Eye.svelte";
	import Facilitet from "$lib/icons/Facilitet.svelte";
	import Locked from "$lib/icons/Locked.svelte";
	import Saving from "$lib/icons/Saving.svelte";
	import SelfService from "$lib/icons/SelfService.svelte";

	const news = [
		{
			title: "NDC Oslo 2023: Building a dedicated platform for frontend developers",
			image: "2023-ndc-oslo-frontend-platform.png",
			link: "https://www.youtube.com/watch?v=feM64m6Csqw",
		},
		{
			title: "Cloud Native Oslo: Building and testing infrastructure NAV style",
			image: "2023-cncf-oslo-testing-infra.png",
			link: "https://www.youtube.com/watch?v=OwEHXqniCe8",
		},
		{
			title: "Linkerd Day Europe 2023: Securing 1/3 of Norway's Annual State Budget",
			image: "2023-kubecon-linkerd-security.png",
			link: "https://www.youtube.com/watch?v=-VV4j6x7t84",
		},
		{
			title: "JavaZone 2022: Hvordan vi sikrer NAV.no og 1-3 av Norges statsbudsjett",
			image: "2022-javazone-sikkerhet.png",
			link: "https://vimeo.com/748031584",
		},
	];

	const features = [
		{
			title: "Deploy",
			icon: SelfService,
			text: "A deployment service that makes it easy for a team to get an application out in the world",
		},
		{
			title: "Observability",
			icon: Eye,
			text: "Insight into how the application behaves",
		},
		{
			title: "Building blocks",
			icon: Facilitet,
			text: "Automatic setup of components that applications may need, such as a database or storage",
		},
		{
			title: "Runtime",
			icon: AutomaticSystem,
			text: "A secure runtime environment that always ensures optimal resource utilization",
		},
		{
			title: "Security",
			icon: Locked,
			text: "Default settings, standard components and vulnerability monitoring to help teams build secure apps",
		},
		{
			title: "Cost overview",
			icon: Saving,
			text: "Clear consumption and cost attribution for all teams",
		},
	];
</script>

<svelte:head>
	<title>nais.io</title>
</svelte:head>

<div id="wrapper">
	<div class="max-w-4xl mx-auto text-center my-12 sm:my-24">
		<h2 class="text-3xl font-bold">What is NAIS?</h2>
		<p>
			A team centric application platform that provides devops teams with the tools they need.
			Developed at NAV for teams at NAV.
		</p>
		<img src="/images/diagrams/overview.svg" class="diagram-overview" alt="NAIS overview" />
	</div>

	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold">NAIS in the news</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-16 my-2 sm:my-4">
		{#each news.slice(0, 3) as item}
			<div class="p-8 flex flex-col gap-5 items-center text-center">
				<a href={item.link} class="no-underline text-back">
					<img src={`/images/news/${item.image}`} alt={item.title} />
					<h3 class="text-2xl font-bold">{item.title}</h3>
				</a>
			</div>
		{/each}
	</div>

	<div class="max-w-4xl mx-auto text-center my-12 sm:my-24">
		<h2 class="text-3xl font-bold">Only for NAV? Then why am I even here?</h2>
		<p>
			We are currently running a pilot for NAIS as a service
			, to see if other organizations could benefit from our tools.
			<br />
			<a href="/#contact">Contact us</a>
			to learn more.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-16 my-2 sm:my-4">
		{#each features as feature}
			<div class="bg-gray-50 p-8 flex flex-col gap-5 items-center text-center">
				<svelte:component this={feature.icon} class="h-12" aria-hidden="true" />
				<h3 class="text-2xl font-bold">{feature.title}</h3>
				<p>{feature.text}</p>
			</div>
		{/each}
	</div>

	<div class="max-w-4xl mx-auto text-center my-12 sm:my-24">
		<h2 class="text-3xl font-bold">Effects at NAV</h2>
		<p>
			One way we measure the effect of NAIS in NAV is by measuring our deployment frequency across
			all the applications. NAIS was introduced to NAV in 2017, and has continuously worked to
			improve “speed and flow” for teams, while helping teams make safe and robust applications.
		</p>

		<figure class="my-8 flex flex-col items-center">
			<img
				src="/images/deployment_frequency.png"
				alt="The bar chart shows how average weekly deploys to production in NAV has dramatically increased, from around in 2015 to more than 1400 in 2022. The most dramatic change happened when we went from 150 deploys in 2018 to 1200 deploys in 2020." />
			<figcaption class="italic text-xl mt-8">
				Deployment frequency is one of the key metrics identified in the book Accelerate: The
				Science of Lean Software and Devops: Building and Scaling High Performing Technology
				Organizations (2018) by Dr. Nicole Forsgren, Jez Humble and Gene Kim. We find that it serves
				as a useful proxy metric for our teams agility and ability to effect change.
			</figcaption>
		</figure>
	</div>

	<div class="max-w-4xl mx-auto text-center my-12 sm:my-24">
		<h2 id="contact" class="text-3xl font-bold">Contact us</h2>
		<p>Reach us on Slack! We're available on the following slacks:</p>
		<ul>
			<li><a href="https://nav-it.slack.com/archives/C5KUST8N6">NAV</a></li>
			<li><a href="https://offentlig-paas-no.slack.com/archives/C7PK9DU92">Offentlig PaaS</a></li>
			<li><a href="https://kubernetes.slack.com/archives/CNJHE4QAH">Kubernetes</a></li>
		</ul>
		<p>
			If not, look for someone wearing a t-shirt with the NAIS logo on it at your neighbourhood
			JavaZone...
		</p>

		<p>
			.... or you could reach us on <a href="mailto:nais@nav.no">e-mail</a>
		</p>
	</div>
</div>
