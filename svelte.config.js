import adapter from "@sveltejs/adapter-static";
import path from "path";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkRelativeImages from "mdsvex-relative-images";

const theme = "github-dark";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript", "yaml", "bash", "ts", "elm", "sh", "shell"],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: [".svelte", ".svx", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md", ".mdx"],
			remarkPlugins: [remarkRelativeImages],
			layout: {
				log: "/src/routes/log/post.svelte",
				blog: "/src/routes/blog/posts/layout.svelte",
				_: "/src/routes/blog/posts/layout.svelte",
			},
			highlight: {
				highlighter: async (code, lang = "text") => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
					return `{@html \`${html}\` }`;
				},
			},
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
