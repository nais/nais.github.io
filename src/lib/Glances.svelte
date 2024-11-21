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
		<RocketIcon slot="icon" />
		<div slot="text">Nais tar ideene dine raskt fra kode til produksjon, uten nedetid.</div>
	</Glance>
	<Glance heading="Automatisering" --color="#634689">
		<CogRotationIcon slot="icon" />
		<div slot="text">Du sier hva du trenger, så setter Nais opp infrastrukturen automatisk.</div>
	</Glance>
	<Glance heading="Full oversikt" --color="#3380A5">
		<BulletListIcon slot="icon" />
		<div slot="text">
			Ha kontroll på det du har kjørende, hva det koster og hvor godt du utnytter det.
		</div>
	</Glance>
	<Glance heading="Innsikt" --color="#939E00">
		<VitalsIcon slot="icon" />
		<div slot="text">
			Verktøyene du trenger for å få innsikt i hvordan systemene dine oppfører seg.
		</div>
	</Glance>
	<Glance heading="Sikkerhet" --color="#06893A">
		<SealCheckmarkIcon slot="icon" />
		<div slot="text">
			Nais kommer med solide standardinnstillinger ut av boksen, og gir deg det du trenger for å
			sikre systemene dine.
		</div>
	</Glance>
	<Glance heading="Et Nais fellesskap" --color="#DE2E2E">
		<HandShakeHeartIcon slot="icon" />
		<div slot="text">Vi er mange som bruker og utvikler Nais, og vi hjelper hverandre.</div>
	</Glance>
</div>

<style>
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
		background: linear-gradient(to right, #ff91001d, #f768911a);
	}
</style>
