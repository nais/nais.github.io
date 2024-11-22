import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

web.chat.postMessage({
	channel: "nais-test-announcements",
	text: "Hello from github action!",
});
