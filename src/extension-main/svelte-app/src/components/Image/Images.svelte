<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';
	import Cells from '../Matrix/matrix-cell.svelte';
	import MatrixStyle from '../Matrix/matrix-style.svelte';
	import ImagesMapping from './images_mapping.svelte';
	import ColorMapping from './color_mapping.svelte';

	let maxNumOfAnswerSetToConvert: number = 4;
	let useImages: boolean = false;

	onMount(() => {
		write();
	});

	$: if (maxNumOfAnswerSetToConvert) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			cell.maxNumOfAnswerSetToConvert = maxNumOfAnswerSetToConvert;
			return cell;
		});
	}
</script>

<center>
	<h1>Matrix with Images</h1>
</center>

<div id="ctrl">
	<h3>Answer Sets to compute</h3>
	<input type="number" name="maxas" id="maxAS" bind:value={maxNumOfAnswerSetToConvert} min="1" />
</div>

<h2>Rendered Cells</h2>
<Cells />

<div class="use-img">
	<label for="useimg">use images?</label>
	<input type="checkbox" name="useimg" bind:checked={useImages} />
</div>

{#if useImages}
	<ImagesMapping />
	{:else}
	<ColorMapping />
{/if}

<MatrixStyle />

<style>
	#maxAS {
		margin-bottom: 10px;
	}

	#ctrl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: baseline;
	}

	.use-img {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
