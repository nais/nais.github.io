<script>
	import Hero from "./hero.svelte";
	import { page } from "$app/stores";
	import "../app.css";
</script>

<div class="w-full bg-gray-50 pb-1">
	<div class="container m-auto">
		{#if $page.url.pathname == "/"}
			<Hero />
		{/if}
	</div>
</div>

<div id="content" class="container m-auto flex-grow mb-12 md:mb-20 px-8">
	<slot />
</div>

<div id="footer" class="w-full bg-gray-50 py-16 px-4 md:py-32 text-xl flex-shrink">
	<div class="container m-auto">
		<div class="grid grid-cols-1 text-center md:grid-cols-3 md:text-start">
			<div>
				<h2>NAIS</h2>
				<p>Making teams go brrr</p>
			</div>
			<div>
				<h2>Support</h2>
				<p>
					<a href="https://docs.nais.io">Documentation</a>
					<a href="https://start.nais.io">Create an application</a>
					<a href="https://naas.nais.io">About NaaS</a>
					<a href="https://uustatus.no/nn/erklaringer/publisert/f048df55-0ea0-43d4-b884-6a6be23f098f">Accessibility statement (in norwegian)</a>
					<a href="https://sikkerhet.nav.no/">Security</a>
				</p>
			</div>
			<div>
				<h2>Legal</h2>
				<p>
					<a href="https://docs.nais.io/legal/roles-responsibilities/">
						Roles and responsibilities
					</a>
				</p>
			</div>
		</div>
		<p>Copyright © 2022 NAV IT | All rights reserved.</p>
	</div>
</div>

<style lang="postcss">
	#footer h2 {
		@apply text-2xl font-bold mb-1 md:mb-8 mt-7 md:mt-0;
	}

	#footer a {
		@apply block mb-2;
	}

	#footer > div > p {
		@apply text-center mt-16;
	}
</style>
