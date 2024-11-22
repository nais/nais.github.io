import { Feed } from "feed";

export async function GET() {
	const feed = new Feed({
		title: "nais log",
		description:
			"Her poster Naisteamet informasjon om nyheter, endringer eller hendelser i plattformen.",
		id: "https://nais.io/log/",
		link: "https://nais.io/log/",
		language: "no",
		favicon: "https://nais.io/favicon.ico",
		copyright: `Copyright ${new Date().getFullYear().toString()}, nais.io`,
		feedLinks: {
			rss: "https://nais.io/log/rss.xml",
		},
		ttl: 60,
	});

	const markdownFiles = import.meta.glob<{
		metadata: {
			date: string;
			title: string;
			author: string;
		};
	}>("../posts/*.md", { eager: true });

	const posts = Object.entries(markdownFiles)
		.map(([path, post]) => ({
			slug: path.match(/([^\/]+)\.md$/)?.[1],
			...post,
		}))
		.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

	for (const post of posts) {
		feed.addItem({
			title: post.metadata.title,
			description: post.metadata.title,
			link: `https://nais.io/log#${post.slug}`,
			date: new Date(post.metadata.date),
			author: [
				{
					name: post.metadata.author,
				},
			],
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
