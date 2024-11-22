const core = require("@actions/core");
const github = require("@actions/github");
const { WebClient } = require("@slack/web-api");

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

web.chat.postMessage({
	channel: "nais-test-announcements",
	text: `Hello from js github action! ${JSON.stringify(github.context.payload, undefined, 2)}`,
});
