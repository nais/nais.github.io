export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["amplitude.min.js","events.js","favicon.png","images/deployment_frequency.png","slsakeys/nais.pub","slsakeys/navikt.pub"]),
	mimeTypes: {".js":"application/javascript",".png":"image/png",".pub":"application/x-mspublisher"},
	_: {
		entry: {"file":"_app/immutable/start-7854e3aa.js","imports":["_app/immutable/start-7854e3aa.js","_app/immutable/chunks/index-594bee64.js","_app/immutable/chunks/singletons-90749863.js"],"stylesheets":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
