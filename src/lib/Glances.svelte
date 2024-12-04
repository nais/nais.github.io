<script>
	import Glance from "$lib/Glance.svelte";
	import {
		BulletListIcon,
		CogRotationIcon,
		HandShakeHeartIcon,
		RocketIcon,
		SealCheckmarkIcon,
		VitalsIcon,
	} from "@nais/ds-svelte-community/icons";
</script>

<div class="glances">
	<Glance heading="Utrulling" --color="#FF9100">
		<div slot="icon">
			<RocketIcon />
		</div>
		<p slot="text">Nais tar ideene dine raskt fra kode til produksjon, uten nedetid.</p>
	</Glance>
	<Glance heading="Automatisering" --color="#634689">
		<div slot="icon">
			<CogRotationIcon />
		</div>
		<p slot="text">Du sier hva du trenger, så setter Nais opp infrastrukturen automatisk.</p>
	</Glance>
	<Glance heading="Full oversikt" --color="#3380A5">
		<div slot="icon">
			<BulletListIcon />
		</div>
		<p slot="text">
			Ha kontroll på det du har kjørende, hva det koster og hvor godt du utnytter det.
		</p>
	</Glance>
	<Glance heading="Innsikt" --color="#939E00">
		<div slot="icon">
			<VitalsIcon />
		</div>
		<p slot="text">Verktøyene du trenger for å få innsikt i hvordan systemene dine oppfører seg.</p>
	</Glance>
	<Glance heading="Sikkerhet" --color="#06893A">
		<div slot="icon">
			<SealCheckmarkIcon />
		</div>
		<p slot="text">
			Nais kommer med solide standardinnstillinger ut av boksen, og gir deg det du trenger for å
			sikre systemene dine.
		</p>
	</Glance>
	<Glance heading="Et Nais fellesskap" --color="#DE2E2E">
		<div slot="icon">
			<HandShakeHeartIcon />
		</div>
		<p slot="text">Vi er mange som bruker og utvikler Nais, og vi hjelper hverandre.</p>
	</Glance>
</div>

<style>
	p {
		margin: 0;
	}
	.glances {
		font-size: 1.15rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 4rem;
		justify-content: center;
		position: relative;
	}
	.glances::after {
		position: absolute;
		content: "";
		height: 300px;
		width: 500px;
		left: 0;
		top: 0;
		border-radius: 100%;
		filter: blur(100px);
		z-index: -1;
	}
	.glances::after {
		background: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-spectrum-1) 11%, transparent),
			color-mix(in srgb, var(--color-spectrum-2) 11%, transparent)
		);
	}
</style>
