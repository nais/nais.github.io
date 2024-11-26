<script>
	import Brukere from "$lib/Brukere.svelte";
	import Glances from "$lib/Glances.svelte";
	import Hero from "$lib/Hero.svelte";
</script>

<main>
	<Hero />
	<Glances />
	<Brukere />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: min(14vw, 8rem);
		padding: min(8vw, 6rem) min(4vw, 3.6rem);
		margin: auto;
		max-width: var(--content-max-width);
	}
</style>
