<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";

	const { data }: { data: PageData } = $props();
</script>

<div class="content">
	{#each data.posts as { metadata, default: Post }}
		<h2 class="heading">{metadata.title}</h2>
		<p class="byline">{format(metadata.date, "MMMM d, yyyy")} by {metadata.author}</p>
		<div class="post">
			<Post />
		</div>
	{/each}
</div>

<style>
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
</style>
