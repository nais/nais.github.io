import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const text = `Hello from github action! ${process.env.GITHUB_CONTEXT}, ${process.env.VARS_CONTEXT}`;

console.log(text);

web.chat.postMessage({
	channel: "nais-test-announcements",
	text,
});
