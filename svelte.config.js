import adapter from "@sveltejs/adapter-static";
import path from "path";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkRelativeImages from "mdsvex-relative-images";
import remarkCustomEmojis from "./remark-custom-emojis.js";

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
			remarkPlugins: [remarkCustomEmojis, remarkRelativeImages],
			layout: {
				log: "/src/routes/(pages)/log/post.svelte",
				logposts: "/src/routes/(pages)/log/posts/layout.svelte",
				blog: "/src/routes/(pages)/blog/posts/layout.svelte",
				_: "/src/routes/(pages)/blog/posts/layout.svelte",
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
