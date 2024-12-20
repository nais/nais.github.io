<script module>
	import table from "./table.svelte";
	export { table };
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { format } from "date-fns";
	interface Props {
		title?: string;
		author?: string;
		date?: string;
		theme?: string;
		language?: string;
		children: Snippet;
	}

	let { title, date, author, theme, language, children }: Props = $props();
</script>

<svelte:head>
	<title>{title} — Nais</title>
</svelte:head>

<div class={["article", theme].filter(Boolean).join(" ")} lang={language}>
	<h1>{title}</h1>
	{#if date && author}
		<p class="byline">{format(date, "MMMM d, yyyy")} by {author}</p>
	{/if}
	{@render children()}
</div>

<style>
	h1 {
		margin-bottom: 1rem;
	}
	.article :global(pre) {
		border-radius: 0.5rem;
		overflow-x: auto;
		padding: 1rem;
	}
	.article :global(blockquote) {
		border-left: 0.5rem solid var(--color-primary);
		display: flex;
		padding-inline: min(4vw, 2rem);
		background-color: color-mix(in srgb, var(--color-primary) 15%, white);
		margin: 0;
		width: fit-content;
	}
	.article :global(img) {
		margin-inline: auto;
	}
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
</style>
