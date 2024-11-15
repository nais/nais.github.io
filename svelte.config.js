import adapter from "@sveltejs/adapter-static";
import path from "path";
import { mdsvex } from "mdsvex";
import remarkRelativeImages from "mdsvex-relative-images";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: [".svelte", ".svx", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md", ".mdx"],
			remarkPlugins: [remarkRelativeImages],
			layout: "/src/routes/blog/posts/layout.svelte",
		}),
	],

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
		}),

		alias: {
			$lib: path.resolve(".", "src", "lib"),
		},
	},
};

export default config;

// import adapter from "@sveltejs/adapter-auto";
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://svelte.dev/docs/kit/integrations
// 	// for more information about preprocessors
// 	preprocess: vitePreprocess(),

// 	kit: {
// 		adapter: adapter(),
// 		outDir: "build",
// 	},
// };

// export default config;
