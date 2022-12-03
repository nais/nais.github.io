<script>
	import XmasLogo from "$lib/xmasLogo.svelte";
	import WordTicker from "$lib/word_typer.svelte";
</script>

<div class="grid sm:grid-cols-hero-sm gap-4 my-16 text-center sm:text-start items-center">
	<div id="logo" class="flex justify-center mb-8 sm:mb-0">
		<XmasLogo class="max-h-65" />
	</div>
	<div class="flex flex-col gap-8 items-center sm:items-start sm:justify-center">
		<h1 class="text-3xl md:text-5xl font-bold m-0">
			Helping digital teams <WordTicker /> applications
		</h1>
		<h2 class="font-bold text-xl md:text-2xl flex-shrink max-w-[30rem]">
			Application platform and DevEx toolbox for teams digitalizing NAV
		</h2>
		<nav class="flex flex-col sm:flex-row items-center flex-wrap gap-4 sm:gap-8">
			<a
				href="https://docs.nais.io"
				class="text-interaction-primary font-bold inline-flex items-center">
				NAIS Documentation
			</a>
			<a href="/#contact" class="text-interaction-primary font-bold inline-flex items-center">
				Contact us
			</a>
			<a
				href="https://nais.io/blog/"
				class="text-interaction-primary font-bold inline-flex items-center">
				Read our technical journal
			</a>
		</nav>
	</div>
</div>
