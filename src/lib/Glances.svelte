<script>
	import {
		Activity,
		ArrowRightLeft,
		BadgeCheck,
		Cog,
		HeartHandshake,
		Rocket,
	} from "@lucide/svelte";
	import Glance from "#lib/Glance.svelte";
</script>

<div class="glances">
	<Glance heading="Utviklingsfart" --color="#FF9100">
		<div slot="icon">
			<Rocket size="1em" aria-hidden="true" focusable="false" />
		</div>
		<p slot="text">Nais tar ideene dine raskt fra kode til produksjon, uten nedetid.</p>
	</Glance>
	<Glance heading="Automatisering" --color="#634689">
		<div slot="icon">
			<Cog size="1em" aria-hidden="true" focusable="false" />
		</div>
		<p slot="text">Du sier hva du trenger, så setter Nais opp infrastrukturen automatisk.</p>
	</Glance>
	<Glance heading="Oversikt" --color="#3380A5">
		<div slot="icon">
			<Activity size="1em" aria-hidden="true" focusable="false" />
		</div>
		<p slot="text">
			Ha kontroll på det du har kjørende – hvordan det oppfører seg, hva det koster og
			utnyttelsesgraden.
		</p>
	</Glance>
	<Glance heading="Sikkerhet" --color="#06893A">
		<div slot="icon">
			<BadgeCheck size="1em" aria-hidden="true" focusable="false" />
		</div>
		<p slot="text">
			Nais kommer med solide standardinnstillinger ut av boksen, og gir deg full sporbarhet på hvem
			som gjorde hva, når.
		</p>
	</Glance>
	<Glance heading="Suveren og autonom" --color="#0067C5">
		<div slot="icon">
			<ArrowRightLeft size="1em" aria-hidden="true" focusable="false" />
		</div>
		<p slot="text">
			Nais bygger på industristandarder slik at både koden du lager og plattformen du kjører på
			enkelt kan flytte på seg om verden endrer seg.
		</p>
	</Glance>
	<Glance heading="Et Nais fellesskap" --color="#DE2E2E">
		<div slot="icon">
			<HeartHandshake size="1em" aria-hidden="true" focusable="false" />
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
