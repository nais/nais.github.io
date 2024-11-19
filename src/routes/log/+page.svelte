<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<div class="content">
		{#each data.posts as { metadata, default: Post }}
			<h2 class="heading">{metadata.title}</h2>
			<p class="byline">{format(metadata.date, "MMMM d, yyyy")} by {metadata.author}</p>
			<div class="post">
				<Post />
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		font-size: 1.125rem;
		padding: min(4vw, 3.6rem);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content {
		max-width: 67ch;
	}
	.heading {
		margin-top: 1.75em;
		margin-bottom: 0.5em;
	}
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.post :global(h1) {
		margin-block: 0.67em;
	}
	.post :global(:is(h2, h3, h4, h5)) {
		margin-top: 1.5em;
		margin-bottom: 18px;
	}
	.post :global(p) {
		margin-block: 1em;
	}
	.post :global(ul),
	.post :global(ol) {
		margin-block: 1em;
	}
	.post :global(:is(ul, ol) :is(ol, ul)) {
		margin-block: 0;
	}
	.post :global(pre) {
		overflow-x: auto;
		padding: 0.5rem;
	}
	.post :global(blockquote) {
		border-left: 0.5rem solid var(--color-primary);
		display: flex;
		padding-inline: min(4vw, 2rem);
		background-color: color-mix(in srgb, var(--color-primary) 10%, white);
	}
	.post :global(table) {
		overflow-x: auto;
		width: 100%;
		max-width: 100%;
		border-collapse: collapse;
	}
	.post :global(thead) {
		display: table-header-group;
		vertical-align: middle;
	}
	.post :global(tr) {
		display: table-row;
		vertical-align: inherit;
	}
	.post :global(th) {
		vertical-align: bottom;
		border-bottom: 2px solid #dee2e6;
		text-align: inherit;
	}
	.post :global(th),
	.post :global(td) {
		vertical-align: top;
		padding: 0.75rem;
		border-top: 1px solid #dee2e6;
	}
</style>
