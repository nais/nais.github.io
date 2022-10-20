<script lang="ts">
	const words = ["run", "observe", "monitor", "debug", "test", "deploy"];
	let word = words[0];

	function tick() {}

	function run(_node: HTMLElement) {
		const interval = setInterval(tick, 300);
		return {
			destroy() {
				clearInterval(interval);
			},
		};
	}
</script>

<div use:run>{word}</div>
