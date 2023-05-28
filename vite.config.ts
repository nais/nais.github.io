import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		fs: {
			// Allow serving files outside of the project root
			allow: ["./images/news"],
		},
	},
};

export default config;
