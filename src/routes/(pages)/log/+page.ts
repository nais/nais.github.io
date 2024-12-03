import type { Component } from "svelte";

export async function load() {
	const markdownFiles = import.meta.glob<{
		default: Component;
		metadata: {
			date: string;
			title: string;
			author: string;
			language?: string;
		};
	}>("./posts/*.md", { eager: true });

	return {
		posts: Object.entries(markdownFiles)
			.map(([path, post]) => ({
				slug: path.match(/([^\/]+)\.md$/)?.[1],
				...post,
			}))
			.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()),
	};
}
