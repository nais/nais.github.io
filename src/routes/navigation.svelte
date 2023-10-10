<script lang="ts">
	import { page } from "$app/stores";
	import PrideLogo from "$lib/prideLogo.svelte";

	type menuItem = {
		pride?: boolean;
		name: string;
		href: string;
	};

	const menu: menuItem[] = [
		{ name: "NAIS", href: "/", pride: true },
		{ name: "Documentation", href: "https://docs.nais.io" },
		{ name: "NaaS pilot", href: "https://naas.nais.io" },
		{ name: "Blog", href: "https://nais.io/blog" },
		{ name: "Contact", href: "/#contact" },
	];
</script>

<div dir="ltr" class="navds-tabs navds-tabs--medium inline-block pb-1">
	<div class="navds-tabs__tablist-wrapper hidden sm:block">
		<div role="navigation" class="navds-tabs__tablist">
			{#each menu as item}
				<a
					href={item.href}
					class="navds-tabs__tab no-underline"
					role="tab"
					aria-selected={$page.url.pathname == item.href}>
					{#if item.pride}
						<PrideLogo class="h-6 mr-2" />
					{/if}
					{item.name}
				</a>
			{/each}
		</div>
	</div>

	<div class="block sm:hidden">
		<nav class="flex flex-wrap">
			{#each menu as item}
				<a
					href={item.href}
					class="navds-tabs__tab no-underline"
					role="tab"
					aria-selected={$page.url.pathname == item.href}>
					{#if item.pride}
						<PrideLogo class="h-6 mr-2" />
					{/if}
					{item.name}
				</a>
			{/each}
		</nav>
	</div>
</div>
