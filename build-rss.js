import { Feed } from "feed";
import fs from "fs";
import parseMD from "parse-md";

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
const path = "./src/routes/(pages)/log/posts";
const items = fs.readdirSync(path);
const files = [];
for (const filename of items) {
	if (filename.endsWith(".md")) {
		const fileContents = fs.readFileSync(`${path}/${filename}`, "utf8");
		const { metadata, content } = parseMD(fileContents);

		feed.addItem({
			title: metadata.title,
			description: metadata.title,
			link: `https://nais.io/log#${filename.match(/([^\/]+)\.md$/)?.[1]}`,
			date: new Date(metadata.date),
			author: [
				{
					name: metadata.author,
				},
			],
		});
	}
}

fs.mkdirSync("build/log", { recursive: true });
fs.writeFileSync("build/log/rss.xml", feed.rss2());
