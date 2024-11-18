interface Post {
	route: string;
	metadata: {
		title: string;
		date: string;
		description: string;
		tags: string[];
		author: string;
	};
}
export async function load() {
	const postFiles = import.meta.glob<boolean, string, Post>("./posts/*/+page.md");
	let posts = await Promise.all(
		Object.entries(postFiles).map(async ([path, post]) => {
			const { metadata } = await post();
            const route = "/blog/" + path.split("/").slice(1, 3).join("/");
			return { metadata, route } as Post;
		}),
	);
    posts = posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
	return { posts };
}
