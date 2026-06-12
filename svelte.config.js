import adapter from "@sveltejs/adapter-static";
import path from "path";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkRelativeImages from "mdsvex-relative-images";
import remarkCustomEmojis from "./remark-custom-emojis.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const theme = "github-dark";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript", "yaml", "bash", "ts", "elm", "sh", "shell", "kotlin", "json", "svelte"],
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
				log: join(__dirname, "/src/routes/(pages)/log/post.svelte"),
				blog: join(__dirname, "/src/routes/(pages)/blog/posts/mdsvex_layout.svelte"),
				_: join(__dirname, "/src/routes/(pages)/blog/posts/mdsvex_layout.svelte"),
			},
			highlight: {
				highlighter: async (code, lang = "text") => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme, tabindex: -1 }));
					return `{@html \`${html}\` }`;
				},
			},
		}),
	],

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "404.html",
		}),

		alias: {
			$lib: path.resolve(".", "src", "lib"),
		},
	},
};

export default config;
