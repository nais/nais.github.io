import { Feed } from "feed";
import fs from "fs";
import parseMD from "parse-md";

const feed = new Feed({
	title: "Nais log",
	description:
		"Her poster Nais-teamet informasjon om nyheter, endringer eller hendelser i plattformen.",
	id: "https://nais.io/log/",
	link: "https://nais.io/log/",
	language: "no",
	copyright: `Copyright ${new Date().getFullYear().toString()}, nais.io`,
	feedLinks: {
		rss: "https://nais.io/log/rss.xml",
	},
	ttl: 60,
});
const path = "./src/routes/(pages)/log/posts";
const items = fs.readdirSync(path);
const feedItem = [];
for (const filename of items) {
	if (filename.endsWith(".md")) {
		const fileContents = fs.readFileSync(`${path}/${filename}`, "utf8");
		const { metadata, content } = parseMD(fileContents);
		feedItem.push({ metadata, content, link: `https://nais.io/log#${filename.split(".md")[0]}` });
	}
}
// sort feedItems by date
feedItem.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));

feedItem.forEach(({ metadata, content, link }) => {
	feed.addItem({
		title: metadata.title,
		content: content,
		link: link,
		date: new Date(metadata.date),
		author: [
			{
				name: metadata.author,
			},
		],
	});
});

fs.mkdirSync("build/log", { recursive: true });
fs.writeFileSync("build/log/rss.xml", feed.rss2());
