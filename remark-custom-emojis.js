import { findAndReplace } from "mdast-util-find-and-replace";
import { get as getEmoji } from "node-emoji";
import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

console.log("Fetching custom emojis from Slack...");

const customEmojis = await web.emoji
	.list()
	.then((res) => {
		const { emoji = {} } = res;

		const map = new Map();
		const getSrc = (url) => (url?.startsWith("alias:") ? getSrc(emoji[url.split(":")[1]]) : url);

		Object.entries(emoji).forEach(([name, url]) => {
			const src = getSrc(url);
			if (src) {
				map.set(`:${name}:`, {
					type: "html",
					value: `<img src='${src.replace(
						/'/gu,
						"%27",
					)}' style='height: 1em;display:inline;' title='${name.replace(/'/gu, "&apos;")}' alt='${name.replace(/'/gu, "&apos;")}'/>`,
				});
			}
		});

		return map;
	})
	.catch((e) => {
		console.error(e);
		return new Map();
	});

const plugin = () => {
	const replaceEmoji = (match) => customEmojis.get(match) ?? getEmoji(match) ?? false;

	const transformer = (tree) => findAndReplace(tree, [[/:\+1:|:-1:|:[\w-]+:/g, replaceEmoji]]);

	return transformer;
};

export default plugin;
