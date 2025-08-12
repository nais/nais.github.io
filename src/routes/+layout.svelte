<script lang="ts">
	import { browser } from "$app/environment";
	import Header from "$lib/Header.svelte";
	import "../styles/app.css";
</script>

<Header />
<slot />
