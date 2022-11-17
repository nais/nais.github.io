<script lang="ts">
	const words = ["run", "observe", "monitor", "debug", "test", "deploy"];

	const speed = 100;
	const wordPause = 1000;
	let wordIndex = 0;
	let word = words[wordIndex];
	let reverse = true;
	let pause = false;

	function tick() {
		if (pause) {
			return;
		}

		if (reverse) {
			backspace();
		} else {
			type();
		}
	}

	function type() {
		if (word.length < words[wordIndex].length) {
			word = words[wordIndex].slice(0, word.length + 1);
		} else {
			reverse = true;
			pause = true;
			setTimeout(() => {
				pause = false;
			}, wordPause);
		}
	}

	function nextWord() {
		wordIndex = (wordIndex + 1) % words.length;
	}

	function backspace() {
		if (word.length > 0) {
			word = word.slice(0, -1);
			if (word.length === 0) {
				reverse = false;
				nextWord();
			}
		} else {
			reverse = false;
		}
	}

	function run() {
		const interval = setInterval(tick, speed);
		return {
			destroy() {
				clearInterval(interval);
			},
		};
	}
</script>

<div use:run>
	<span class="sr-only">{words.slice(0, -1).join(", ")} and {words.slice(-1)[0]}</span>
	<span aria-hidden="true">{word}</span>
	<span aria-hidden="true" class="cursor">|</span>
</div>

<style lang="postcss">
	.cursor {
		opacity: 1;
		font-weight: 100;
		animation: blink 0.7s infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
