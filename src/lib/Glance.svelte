<script lang="ts">
	export let heading: string;
</script>

<div class="glance">
	<div class="icon">
		<slot name="icon" />
	</div>
	<div>
		<h2>{heading}</h2>
		<slot name="text" />
	</div>
</div>

<style>
	.glance {
		display: grid;
		grid-template-columns: 60px 1fr;
		align-items: start;
		gap: 1.25rem;
	}
	.icon {
		border: 1px solid #000;
		border-radius: 10px;
		padding: 5px;
		font-size: 3rem;
		color: var(--color);
		border-color: var(--color);
		box-shadow:
			color-mix(in srgb, var(--color) 35%, transparent) 0px 0px 0px 1px,
			color-mix(in srgb, var(--color) 30%, transparent) 0px 20px 25px -5px,
			color-mix(in srgb, var(--color) 30%, transparent) 0px 8px 10px -6px;
		background: linear-gradient(
			to bottom right,
			color-mix(in srgb, var(--color) 25%, white),
			color-mix(in srgb, var(--color) 50%, white)
		);
	}
	h2 {
		line-height: 1.3;
		margin-bottom: 0.4rem;
	}
</style>
