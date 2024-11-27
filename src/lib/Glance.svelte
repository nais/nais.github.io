<script lang="ts">
	export let heading: string;
</script>

<div class="glance">
	<div class="icon">
		<slot name="icon" />
	</div>
	<div>
		<h2 class="heading">{heading}</h2>
		<slot name="text" />
	</div>
</div>

<style>
	.glance {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: 1.25rem;
	}
	.icon {
		border-radius: 10px;
		padding: 8px;
		font-size: 2.25rem;
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
	.heading {
		line-height: 1.3;
		margin-top: 0;
		margin-bottom: 0.4rem;
		font-size: 24px;
	}
</style>
