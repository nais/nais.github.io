<script lang="ts">
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

</script>

{#each data.posts as post}
<a href="{post.route}"><h1>{post.metadata.title}</h1></a>
	<p>{post.metadata.description}</p>
{/each}
