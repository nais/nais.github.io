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
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 67ch;
		font-size: 1.125rem;
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

	:global(pre) {
		overflow-x: auto;
		padding: 0.5rem;
	}
	:global(blockquote) {
		

	}
</style>
