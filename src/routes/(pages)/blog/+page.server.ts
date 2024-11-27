export const trailingSlash = "ignore";
export async function load() {
	const markdownFiles = import.meta.glob<{
		metadata: {
			date: string;
			title: string;
			author: string;
			description: string;
		};
	}>("./posts/*/+page.md", { eager: true });

	return {
		posts: Object.entries(markdownFiles)
			.map(([path, { metadata }]) => ({ metadata, slug: path.split("/").slice(2, 3).join("/") }))
			.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()),
	};
}
