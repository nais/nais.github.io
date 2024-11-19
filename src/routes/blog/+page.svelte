<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<ul class="list">
		{#each data.posts as post}
			<li class="item">
				<h2 class="heading">
					<a class="link" href={`/blog/posts/${post.slug}`}>
						{post.metadata.title}
					</a>
				</h2>
				<div class="byline">
					{format(post.metadata.date, "MMMM d, yyyy")} by {post.metadata.author}
				</div>
				<div class="description">{post.metadata.description}</div>
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
		margin: 0;
		font-size: 1.125rem;
		list-style: none;
		max-width: 67ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0;
	}
	.heading {
		margin: 0;
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
