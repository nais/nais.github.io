<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import Header from "$lib/Header.svelte";
	import "../styles/app.css";
	import * as amplitude from "@amplitude/analytics-browser";

	if (browser) {
		const getApiKey = () => {
			if (window.location.href.includes("nais.io")) {
				return "16d1ee2fd894ca2562eeebb5095dbcf0"; // prod
			}
			return "04203d48401492bda4620a74acf85a5b"; // dev
		};

		amplitude.init(getApiKey(), {
			serverUrl: "https://amplitude.nav.no/collect",
			serverZone: "EU",
			defaultTracking: true,
		});
	}

	console.log($page.url.pathname);
</script>

<Header />
<slot />
