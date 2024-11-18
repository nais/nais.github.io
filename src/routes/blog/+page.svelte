<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<ul class="list">
		{#each data.posts as post}
			<li class="item">
				<a class="link" href={post.route}>
					<h2 class="heading">{post.metadata.title}</h2>
				</a>
				<p class="byline">{format(post.metadata.date, "MMMM d, yyyy")} by {post.metadata.author}</p>
				<p class="description">{post.metadata.description}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	.wrapper {
		font-size: 1.125rem;
		padding: min(4vw, 3.6rem);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.description {
		max-width: 60ch;
	}
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.list {
		font-size: 1.125rem;
		list-style: none;
		max-width: 67ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0;
	}
	.link {
		display: inline-block;
		color: var(--color-primary);
	}
	.link:hover {
		text-decoration: none;
	}
	.item {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.4rem;
	}
</style>
