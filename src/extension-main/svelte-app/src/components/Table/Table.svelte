<script lang="ts">
	import { matrix } from '../../store';
	import { onMount } from 'svelte';
	import TableMapping from "./table_mapping.svelte";
	import TableStyle from "../Matrix/matrix-style.svelte";

	let maxNumOfAnswerSetToConvert: number = 4;
	let cells: string[] = ['cell1'];

	onMount(() => {
		write();
	});

	$: if (maxNumOfAnswerSetToConvert || cells) {
		write();
	}

	function addCell() {
		cells = [...cells, 'cell' + (cells.length + 1)];
	}

	function remove(elem: number) {
		if (cells.length == 1) return;
		cells.splice(elem, 1);
		cells = [...cells];
	}

	function write() {
		matrix.update((cell) => {
			cell.maxNumOfAnswerSetToConvert = maxNumOfAnswerSetToConvert;
			cell.cell = cells;
			return cell;
		});
	}
</script>

<center>
	<h1>Table</h1>
</center>

<div id="ctrl">
	<h3>Answer Sets to compute</h3>
	<input type="number" name="maxas" id="maxAS" bind:value={maxNumOfAnswerSetToConvert} min="0" />
</div>

<h2>Rendered Cells</h2>
<button class="add" on:click={addCell}>Add new Cell</button>
{#if cells.length > 0}
	{#each cells as arg, index}
		<div class="var">
			<input type="text" name="variable" bind:value={arg} />
			<button on:click={() => remove(index)}>remove</button>
		</div>
	{/each}
{/if}
<TableMapping />
<TableStyle />

<style>
	.var {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		margin-bottom: 10px;
	}

	.var button {
		width: 20%;
	}

	.add {
		margin-bottom: 10px;
	}

	#maxAS {
		margin-bottom: 10px;
	}

	#ctrl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: baseline;
	}
</style>
