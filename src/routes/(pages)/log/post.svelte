<script lang="ts">
	import type { Snippet } from "svelte";
	interface Props {
		title?: string;
		author?: string;
		date?: string;
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

{@render children()}
