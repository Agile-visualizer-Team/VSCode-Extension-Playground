<script lang="ts">
	import { matrix } from '../../store';
	import { onMount } from 'svelte';
	import MatrixCell from './matrix-cell.svelte';
	
	const template = "matrix";
	let maxNumOfAnswerSetToConvert: number = 4;

	onMount(() => {
		write();
	});

	$: if (maxNumOfAnswerSetToConvert) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			cell.template = template;
			cell.maxNumOfAnswerSetToConvert = maxNumOfAnswerSetToConvert;
			return cell;
		});
	}
</script>

<center>
	<h1>Matrix</h1>
</center>

<div id="ctrl">
	<h3>Answer Sets to compute</h3>
	<input type="number" name="maxas" id="maxAS" bind:value={maxNumOfAnswerSetToConvert} min="0" />
</div>

<h2>Rendered Cells</h2>
<MatrixCell />

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
