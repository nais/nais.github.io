/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				"hero-sm": "1fr 2fr",
			},
		},
	},
	presets: [require("@navikt/ds-tailwind")],
};
