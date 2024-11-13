(function (e, t) {
	var r = e.amplitude || { _q: [], _iq: {} };
	var n = t.createElement("script");
	n.type = "text/javascript";
	n.integrity = "sha384-6T8z7Vvm13muXGhlR32onvIziA0TswSKafDQHgmkf6zD2ALZZeFokLI4rPVlAFyK";
	n.crossOrigin = "anonymous";
	n.async = true;
	n.src = "./amplitude.min.js";
	n.onload = function () {
		if (!e.amplitude.runQueuedFunctions) {
			console.log("[Amplitude] Error: could not load SDK");
		}
	};
	var s = t.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(n, s);
	function i(e, t) {
		e.prototype[t] = function () {
			this._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
			return this;
		};
	}
	var o = function () {
		this._q = [];
		return this;
	};
	var a = [
		"add",
		"append",
		"clearAll",
		"prepend",
		"set",
		"setOnce",
		"unset",
		"preInsert",
		"postInsert",
		"remove",
	];
	for (var c = 0; c < a.length; c++) {
		i(o, a[c]);
	}
	r.Identify = o;
	var u = function () {
		this._q = [];
		return this;
	};
	var p = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
	for (var l = 0; l < p.length; l++) {
		i(u, p[l]);
	}
	r.Revenue = u;
	var d = [
		"init",
		"logEvent",
		"logRevenue",
		"setUserId",
		"setUserProperties",
		"setOptOut",
		"setVersionName",
		"setDomain",
		"setDeviceId",
		"enableTracking",
		"setGlobalUserProperties",
		"identify",
		"clearUserProperties",
		"setGroup",
		"logRevenueV2",
		"regenerateDeviceId",
		"groupIdentify",
		"onInit",
		"logEventWithTimestamp",
		"logEventWithGroups",
		"setSessionId",
		"resetSessionId",
		"setLibrary",
		"setTransport",
	];
	function v(e) {
		function t(t) {
			e[t] = function () {
				e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
			};
		}
		for (var r = 0; r < d.length; r++) {
			t(d[r]);
		}
	}
	v(r);
	r.getInstance = function (e) {
		e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(r._iq, e)) {
			r._iq[e] = { _q: [] };
			v(r._iq[e]);
		}
		return r._iq[e];
	};
	e.amplitude = r;
})(window, document);

const config = {
	apiEndpoint: "amplitude.nav.no/collect",
	saveEvents: false,
	includeUtm: true,
	includeReferrer: true,
	platform: window.location.toString(),
	trackingOptions: {
		city: false,
		ip_address: false,
	},
};

isLive = document.domain === "nais.io";

function amplitudeLogEvent(eventName, eventData) {
	amplitude
		.getInstance()
		.init(
			isLive ? "16d1ee2fd894ca2562eeebb5095dbcf0" : "04203d48401492bda4620a74acf85a5b",
			undefined,
			config,
		);

	if (!eventData) {
		eventData = {};
	}

	if (!isLive)
		console.log("amplitudeLogEvent(" + eventName + ", " + JSON.stringify(eventData) + ")");

	eventDataDefault = {
		sidetittel: window.location.pathname,
		domene: window.location.host,
		tjeneste: "nais-io",
	};

	amplitude.getInstance().logEvent(eventName, { ...eventDataDefault, ...eventData });
}

document.addEventListener("DOMContentLoaded", function () {
	/* Log initial page load */
	if (!isLive) console.log("DOMContentLoaded");
	amplitudeLogEvent("sidevisning");
});
