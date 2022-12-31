<script lang="ts">
	import TableCell from './table-cell.svelte';
	import TableMapping from './table-mapping.svelte';
	let maxNumOfAnswerSetToConvert: number = 4;
</script>

<center>
	<h1>Table</h1>
</center>

<div id="ctrl">
	<h3>Answer Sets to compute</h3>
	<input type="number" name="maxas" id="maxAS" bind:value={maxNumOfAnswerSetToConvert} min="0" />
</div>

<h2>Rendered Cells</h2>
<TableCell />
<TableMapping />

<style>
	#maxAS {
		margin-bottom: 10px;
	}

	#ctrl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: baseline;
	}
</style>
