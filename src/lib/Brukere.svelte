<script>
	import Navlogo from "./icons/Navlogo.svelte";
	import SsblogoFull from "./icons/SsblogoFull.svelte";
</script>

<div class="section">
	<div class="text">Nais brukes av utviklingsteam hos</div>
	<div class="users">
		<Navlogo />
		<SsblogoFull />
	</div>
	<div class="text">
		<a class="mail" href="mailto:nais@nav.no">Snakk med oss</a>
		om Nais kan passe hos dere
	</div>
</div>

<style>
	.text {
		text-wrap: balance;
	}
	.section {
		font-size: 18px;
		text-align: center;
		display: grid;
		gap: 1.5rem;
		margin: auto;
		position: relative;
	}
	.section::after {
		position: absolute;
		content: "";
		height: 300px;
		width: 500px;
		left: 40%;
		top: 0;
		border-radius: 100%;
		filter: blur(100px);
		z-index: -1;
	}
	.section::after {
		background: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-spectrum-4) 11%, transparent),
			color-mix(in srgb, var(--color-spectrum-5) 11%, transparent)
		);
	}
	.users {
		font-size: 3rem;
		display: flex;
		flex-wrap: wrap;
		column-gap: 2rem;
		row-gap: 1rem;
		align-items: center;
		justify-content: center;
	}
	.mail {
		color: var(--color-primary);
		font-weight: bold;
	}
</style>
