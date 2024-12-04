<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";
	import { nb } from "date-fns/locale";

	let { data }: { data: PageData } = $props();
</script>

<div class="articles">
	{#each data.posts as post}
		<article lang={post.metadata.language}>
			<h1 class="heading">
				<a class="link" href={`/blog/posts/${post.slug}`}>
					{post.metadata.title}
				</a>
			</h1>
			<div class="byline">
				{post.metadata.language === "en"
					? `${format(post.metadata.date, "MMMM d, yyyy")} by ${post.metadata.author}`
					: `${format(post.metadata.date, "d. MMMM yyyy", { locale: nb })} av ${post.metadata.author}`}
			</div>
			<div class="description">{post.metadata.description}</div>
		</article>
	{/each}
</div>

<style>
	.byline {
		font-style: italic;
		font-size: 1rem;
	}
	.articles {
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
	article {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.4rem;
	}
</style>
