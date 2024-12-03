<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";
	import { nb } from "date-fns/locale";

	let { data }: { data: PageData } = $props();
</script>

<ul class="list">
	{#each data.posts as post}
		<li class="item">
			<h2 class="heading">
				<a class="link" href={`/blog/posts/${post.slug}`}>
					{post.metadata.title}
				</a>
			</h2>
			<div class="byline">
				{post.metadata.language === "en"
					? `${format(post.metadata.date, "MMMM d, yyyy")} by ${post.metadata.author}`
					: `${format(post.metadata.date, "d. MMMM yyyy", { locale: nb })} av ${post.metadata.author}`}
			</div>
			<div class="description">{post.metadata.description}</div>
		</li>
	{/each}
</ul>

<style>
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.list {
		margin: 0;
		margin-top: 1.34em;
		list-style: none;
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
