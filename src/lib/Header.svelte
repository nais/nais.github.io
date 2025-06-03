<script>
	import { page } from "$app/stores";
	import NaisPride from "./icons/NaisPride.svelte";
	import Nais from "./icons/Nais.svelte";

	const isActive = (/** @type {string} */ path) => $page.url.pathname.startsWith(`/${path}`);
	let isOpen = $state(false);
</script>

<header class="header">
	<a class="home" href="/">
		<NaisPride />
		<span class="name">Nais</span>
	</a>
	<button class="main-menu-toggle" class:isOpen onclick={() => (isOpen = !isOpen)}>
		<svg
			class="open-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 24 24"
			role="img"
			aria-labelledby="open-icon-title">
			<title id="open-icon-title">Åpne meny</title>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6m0 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1-.75-.75m.75 5.25a.75.75 0 0 0 0 1.5h17a.75.75 0 0 0 0-1.5z"
				clip-rule="evenodd">
			</path>
		</svg>
		<svg
			class="close-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 24 24"
			role="img"
			aria-labelledby="close-icon-title">
			<title id="close-icon-title">Lukk meny</title>
			<path
				fill="currentColor"
				d="M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94z">
			</path>
		</svg>
	</button>
	<nav class="main-menu" class:isOpen>
		<ul class="main-menu-list">
			<li><a class="main-menu-item" class:isActive={isActive("blog")} href="/blog">Artikler</a></li>
			<li><a class="main-menu-item" href="https://docs.nais.io">Dokumentasjon</a></li>
			<li><a class="main-menu-item" class:isActive={isActive("log")} href="/log">Logg</a></li>
			<li><a class="main-menu-item" href="mailto:nais@nav.no">Kontakt oss</a></li>
		</ul>
		<a class="github-link" href="https://github.com/nais">
			<svg
				width="1em"
				height="1em"
				viewBox="0 0 98 98"
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby="github-icon-title"
				role="img">
				<title id="github-icon-title">Nais på Github</title>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
					fill="currentColor" />
			</svg>
		</a>
	</nav>
</header>

<style>
	.header {
		display: grid;
		grid-template-areas:
			"home button"
			"menu menu";
		align-items: center;
		padding-inline: min(4vw, 3.6rem);
		position: relative;
	}
	.header::before,
	.header::after {
		position: absolute;
		content: "";
		height: 300px;
		width: 500px;
		left: 50%;
		top: 0;
		border-radius: 100%;
		filter: blur(100px);
		z-index: -1;
	}
	.header::before {
		transform: translate(-75%, -60%);
		background: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-spectrum-1) 14%, transparent),
			color-mix(in srgb, var(--color-spectrum-2) 14%, transparent),
			color-mix(in srgb, var(--color-spectrum-3) 14%, transparent)
		);
	}
	.header::after {
		transform: translate(0, -60%);
		background: linear-gradient(
			to right,
			color-mix(in srgb, var(--color-spectrum-4) 14%, transparent),
			color-mix(in srgb, var(--color-spectrum-5) 14%, transparent)
		);
	}
	.home {
		text-decoration: none;
		transition: color 50ms;
		color: var(--color-primary);
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px;
		align-items: baseline;
		font-size: 2rem;
	}
	.name {
		font-size: 2.3rem;
		color: var(--color-black);
		font-weight: bold;
	}
	.main-menu-toggle {
		grid-area: button;
		background: none;
		border: none;
		cursor: pointer;
		justify-self: end;
		font-size: 2rem;
		padding: 4px;
		border-radius: 4px;
	}
	.main-menu-toggle:hover {
		background-color: #d8d8d8;
	}
	.main-menu-toggle:active {
		background-color: #adadad;
	}
	.main-menu-toggle > .close-icon {
		display: none;
	}
	.main-menu-toggle.isOpen > .close-icon {
		display: block;
	}
	.main-menu-toggle.isOpen > .open-icon {
		display: none;
	}
	.main-menu {
		grid-area: menu;
		display: none;
	}
	.main-menu.isOpen {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: start;
	}
	.main-menu-list {
		margin: 0;
		list-style: none;
		padding: 0.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.main-menu-item {
		color: inherit;
		text-decoration: none;
		font-size: 1.15rem;
	}
	.main-menu-item:hover {
		color: var(--color-primary);
	}
	.main-menu-item.isActive {
		transition: color 50ms;
		color: var(--color-primary);
		text-decoration: underline;
	}
	.github-link {
		color: inherit;
		font-size: 1.5rem;
		padding-block: 2px;
	}
	@media (min-width: 768px) {
		.header {
			grid-template-areas: "home menu github";
			grid-template-columns: auto 1fr auto;
			justify-items: center;
			max-width: var(--content-max-width);
			margin: auto;
			padding-block: 16px;
		}
		.main-menu-toggle {
			display: none;
		}
		.main-menu,
		.main-menu.isOpen {
			display: contents;
		}
		.main-menu-list {
			display: flex;
			flex-direction: row;
			gap: 1.7rem;
		}
		.github-link {
			font-size: 1.5rem;
			padding: 0;
		}
	}
</style>
