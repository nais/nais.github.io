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
		children: Snippet;
	}

	let { title, date, author, children }: Props = $props();
</script>

<svelte:head>
	<title>{title} — Nais blog</title>
</svelte:head>

<div class="wrapper">
	<div class="article">
		<h1>{title}</h1>
		{#if date && author}
			<p class="byline">{format(date, "MMMM d, yyyy")} by {author}</p>
		{/if}
		{@render children()}
	</div>
</div>

<style>
	.article {
		max-width: 67ch;
		width: 100%;
		font-size: 1.125rem;
	}
	.article :global(h1) {
		margin-block: 0.67em;
	}
	.article :global(h2) {
		margin-block: 0.83em;
	}
	.article :global(h3) {
		margin-block: 1em;
	}
	.article :global(p) {
		margin-block: 1em;
	}
	.article :global(ul),
	.article :global(ol) {
		margin-block: 1em;
	}
	.article :global(pre) {
		overflow-x: auto;
		padding: 0.5rem;
	}
	.article :global(blockquote) {
		border-left: 0.5rem solid var(--color-primary);
		padding: 1rem;
		background-color: color-mix(in srgb, var(--color-primary) 10%, white);
	}
	.article :global(table) {
		overflow-x: auto;
		width: 100%;
		max-width: 100%;
		border-collapse: collapse;
	}
	.article :global(thead) {
		display: table-header-group;
		vertical-align: middle;
	}
	.article :global(tr) {
		display: table-row;
		vertical-align: inherit;
	}
	.article :global(th) {
		vertical-align: bottom;
		border-bottom: 2px solid #dee2e6;
		text-align: inherit;
	}
	.article :global(th),
	.article :global(td) {
		vertical-align: top;
		padding: 0.75rem;
		border-top: 1px solid #dee2e6;
	}
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.wrapper {
		font-size: 1.125rem;
		padding: min(4vw, 3.6rem);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
