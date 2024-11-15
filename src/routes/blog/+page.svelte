<script lang="ts">
	import { format } from "date-fns";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<ul class="list">
	{#each data.posts as post}
		<li class="item">
			<a class="link" href={post.route}>
				<h2 class="heading">{post.metadata.title}</h2>
			</a>
			<p class="description">{post.metadata.description}</p>
			<p>{format(post.metadata.date, "MMMM d, yyyy")}</p>
		</li>
	{/each}
</ul>

<style>
	.list {
		list-style: none;
		padding: min(4vw, 3.6rem);
		max-width: 67ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.link {
		display: inline-block;
		color: var(--color-primary);
	}
	.link:hover {
		text-decoration: none;
	}
	.item {
		display: grid;
		gap: 0.2rem;
	}
	.description {
		font-size: 1.2rem;
	}
</style>
