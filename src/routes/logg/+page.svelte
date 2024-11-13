<div class="message">
	<div class="header">
		<img
			class="avatar"
			src="https://avatars.slack-edge.com/2018-01-17/299539799744_5a5acf81f8b9a8533457_72.jpg"
			alt="User Avatar"
		/>
		<div>
			<div class="username">foo.troen (foo bar)</div>
			<div class="timestamp">Timestamp: 1728392909.028429</div>
		</div>
	</div>
	<div class="content">
		<p>
			🚀 🕺 🔒 <span class="bold"
				>Endringer i Github Action - <span class="code">nais/docker-build-push</span></span
			>
		</p>
		<p>
			Vi har gjort noen endringer så <span class="code">nais/docker-build-push</span> er mer robust
			ifm med rate-limiting (<span class="code">TOO_MANY_REQUESTS</span>) ved generering av SBOM.
			Dette betyr forhåpentligvis at dette steget ikke skal feile lenger (som rapportert fra flere i
			<span class="channel">#nais</span> kanalen).
		</p>
		<p>
			I tillegg har vi gjort endringer som skal gjøre dette steget en god del raskere enn før! 🎉
		</p>
		<p><span class="bold">Hva må dere gjøre?</span> Ingenting, bare deploye som før!</p>
		<p><span class="bold">For de som lurer på hva vi har gjort:</span></p>
		<ul>
			<li>
				Innført github cache i <span class="code">nais/attest-sign</span> for det Trivy kaller
				<span class="code">trivy-java-db</span> - alle kjøringer etter at cachen er satt bør bli en del
				raskere!
			</li>
			<li>
				Støtter fallback i Trivy for flere repositories for <span class="code">trivy-java-db</span>,
				skal da sørge for at bygget ikke feiler om du blir rate limita på første forsøk
			</li>
			<li>
				Satt opp en “passthrough cache” i GAR (google) som speiler/cacher Trivy sitt github repo
				(som også bør hjelpe på rate limiting)
			</li>
		</ul>
		<p>
			Si gjerne ifra i <span class="channel">#nais</span> om ting ikke fungerer som forventet!
		</p>
	</div>
	<div class="reactions">
		<div class="reaction">🏆 41</div>
		<div class="reaction">😻 5</div>
	</div>
</div>

<style>
	.message {
		font-family: Arial, sans-serif;
		border: 1px solid #ddd;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		max-width: 900px;
		margin: 64px auto;
	}
	.header {
		display: flex;
		align-items: center;
	}
	.avatar {
		border-radius: 50%;
		width: 40px;
		height: 40px;
		margin-right: 10px;
	}
	.username {
		font-weight: bold;
	}
	.timestamp {
		color: #888;
		font-size: 0.9em;
	}
	.content {
		margin-top: 10px;
	}
	.reactions {
		margin-top: 10px;
	}
	.reaction {
		display: inline-block;
		margin-right: 10px;
	}
	.bold {
		font-weight: bold;
	}
	.code {
		font-family: monospace;
		background-color: #f4f4f4;
		padding: 2px 4px;
		border-radius: 3px;
	}
</style>
