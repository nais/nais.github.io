<div class="table-wrapper"><table><slot /></table></div>

<style>
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
	}
	table {
		border-collapse: collapse;
	}
	table :global(th) {
		border-bottom: 2px solid #dee2e6;
		text-align: inherit;
	}
	table :global(th),
	table :global(td) {
		padding: 0.75rem;
		border-top: 1px solid #dee2e6;
	}
</style>
