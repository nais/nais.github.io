<script lang="ts">
</script>

<div class="wrapper">
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		font-size: 1.125rem;
		padding: min(4vw, 3.6rem);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.content {
		max-width: 67ch;
		width: 100%;
	}
</style>
