<script>
	import Navlogo from "$lib/icons/Navlogo.svelte";
</script>

<div class="hero">
	<div class="content">
		<h2 class="heading">
			En plattform laget av <Navlogo />
			for å gi fart og flyt til utviklerne av det offentlige Norge
		</h2>
		<div class="text">
			Vi mener at det skal være lett å gjøre rett. Utviklere bør kunne fokusere på det som betyr noe
			- å lage gode applikasjoner.
		</div>
		<a class="cta" href="https://docs.nais.io">Lær mer om Nais</a>
	</div>
	<img class="cloud" src="multicloud.png" alt="" />
</div>

<style>
	.text {
		text-wrap: balance;
	}
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: min(8vw, 6rem);
		padding-bottom: min(8vw, 6rem);
	}
	.content {
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 55ch;
		min-width: 26ch;
	}
	.heading {
		margin: 0;
	}
	.cloud {
		width: 50%;
	}
	.cta {
		color: var(--color-primary);
		font-weight: bold;
		align-self: flex-start;
	}

	@media (min-width: 768px) {
		.hero {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		.cloud {
			width: 100%;
			max-width: 400px;
			justify-self: center;
		}
	}
</style>
