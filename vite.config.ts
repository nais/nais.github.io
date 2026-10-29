import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import adapter from "@sveltejs/adapter-static";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkRelativeImages from "mdsvex-relative-images";
import { join } from "path";

const theme = "github-dark";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript", "yaml", "bash", "ts", "elm", "sh", "shell", "kotlin", "json"],
});

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: [".svelte", ".svx", ".md"],
			preprocess: [
				mdsvex({
					extensions: [".svx", ".md", ".mdx"],
					remarkPlugins: [remarkRelativeImages],
					layout: {
						log: join(import.meta.dirname, "/src/routes/(pages)/log/post.svelte"),
						blog: join(import.meta.dirname, "/src/routes/(pages)/blog/posts/mdsvex_layout.svelte"),
						_: join(import.meta.dirname, "/src/routes/(pages)/blog/posts/mdsvex_layout.svelte"),
					},
					highlight: {
						highlighter: async (code, lang = "text") => {
							const html = escapeSvelte(
								highlighter.codeToHtml(code, { lang, theme, tabindex: -1 }),
							);
							return `{@html \`${html}\` }`;
						},
					},
				}),
			],
			adapter: adapter({ pages: "build", assets: "build", fallback: "404.html" }),
		}),
	],
});
