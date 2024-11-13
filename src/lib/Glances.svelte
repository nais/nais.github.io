<script>
	import Glance from '$lib/Glance.svelte';
	import {
		BulletListIcon,
		CogRotationIcon,
		HandShakeHeartIcon,
		RocketIcon,
		SealCheckmarkIcon,
		VitalsIcon
	} from '@nais/ds-svelte-community/icons';
</script>

<div class="glances">
	<Glance heading="Utrulling" --color="#FF9100">
		<RocketIcon slot="icon" />
		<p slot="text">Nais tar ideene dine raskt fra kode til produksjon, uten nedetid.</p>
	</Glance>
	<Glance heading="Automatisering" --color="#634689">
		<CogRotationIcon slot="icon" />
		<p slot="text">Du sier hva du trenger, så setter Nais opp infrastrukturen automatisk.</p>
	</Glance>
	<Glance heading="Full oversikt" --color="#3380A5">
		<BulletListIcon slot="icon" />
		<p slot="text">
			Ha kontroll på det du har kjørende, hva det koster og hvor godt du utnytter det.
		</p>
	</Glance>
	<Glance heading="Innsikt" --color="#939E00">
		<VitalsIcon slot="icon" />
		<p slot="text">Verktøyene du trenger for å få innsikt i hvordan systemene dine oppfører seg.</p>
	</Glance>
	<Glance heading="Sikkerhet" --color="#06893A">
		<SealCheckmarkIcon slot="icon" />
		<p slot="text">
			Nais kommer med solide standardinnstillinger ut av boksen, og gir deg det du trenger for å
			sikre systemene dine.
		</p>
	</Glance>
	<Glance heading="Et Nais fellesskap" --color="#DE2E2E">
		<HandShakeHeartIcon slot="icon" />
		<p slot="text">Vi er mange som bruker og utvikler Nais, og vi hjelper hverandre.</p>
	</Glance>
</div>

<style>
	.glances {
		font-size: 1.15rem;
		padding: 8vw 4vw;
		max-width: var(--content-max-width);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 4rem;
		justify-content: center;
		margin: auto;
		position: relative;
		overflow-x: clip;
	}
	.glances::after {
		position: absolute;
		content: '';
		height: 300px;
		width: 500px;
		left: 0;
		top: 0;
		border-radius: 100%;
		filter: blur(100px);
		z-index: -1;
	}
	.glances::after {
		background: linear-gradient(to right, #ff910012, #f7689012);
	}
</style>
