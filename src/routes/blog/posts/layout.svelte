<script lang="ts">
	import type { Snippet } from "svelte";
	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<svelte:head>
	<title>{title} — Nais blog</title>
</svelte:head>

<div class="wrapper">
	<h1>{title}</h1>
	{@render children()}
</div>

<style>
	.wrapper {
		padding: min(4vw, 3.6rem);
		max-width: 67ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
