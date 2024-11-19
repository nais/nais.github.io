import type { Component } from "svelte";

export async function load() {
	const markdownFiles = import.meta.glob<{
		default: Component;
		metadata: {
			date: string;
			title: string;
			author: string;
		};
	}>("./posts/*.md", { eager: true });

	return {
		posts: Object.values(markdownFiles).sort(
			(a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
		),
	};
}
