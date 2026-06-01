<script>
	import Nais from "$lib/icons/Nais.svelte";
</script>

<div class="centered">
	<Nais class="logo" />
	<span class="text404">404</span>
</div>

<style>
	.centered {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	:global(.logo) {
		height: 170px;
		width: auto;
	}

	.text404 {
		font-size: 6rem;
		font-weight: 700;
		line-height: 1;
	}
</style>
