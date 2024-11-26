<main>
	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
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
