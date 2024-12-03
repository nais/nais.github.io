<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";
	import { nb } from "date-fns/locale";

	const { data }: { data: PageData } = $props();
</script>

<i>Her poster Naisteamet informasjon om nyheter, endringer eller hendelser i plattformen.</i>

{#each data.posts as { metadata, slug, default: Post }}
	<h2 class="heading" id={slug}><a class="anchorLink" href="#{slug}">{metadata.title}</a></h2>
	<div class="byline">
		{metadata.language === "en"
			? `${format(metadata.date, "MMMM d, yyyy")} by ${metadata.author}`
			: `${format(metadata.date, "d. MMMM yyyy", { locale: nb })} av ${metadata.author}`}
	</div>
	<div class="post">
		<Post />
	</div>
{/each}

<style>
	.heading {
		margin-top: 1.75em;
		margin-bottom: 0.5em;
	}
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.anchorLink {
		color: inherit;
		text-decoration: none;
	}
</style>
