<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';
	import Cells from '../Matrix/matrix-cell.svelte';
	import MatrixStyle from '../Matrix/matrix-style.svelte';
	import ImagesMapping from './images_mapping.svelte';
	import ColorMapping from './color_mapping.svelte';
	import Help from '../Help.svelte';

	let maxNumOfAnswerSetToConvert: number = 4;
	let useImages: boolean = false;
	let gif: boolean = false;

	onMount(() => {
		write();
	});

	$: if (maxNumOfAnswerSetToConvert || gif || useImages) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			cell.template = gif ? 'gif' : 'matrix_images';
			cell.maxNumOfAnswerSetToConvert = maxNumOfAnswerSetToConvert;
			cell.useImages = useImages;
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

<div class="header">
	<h2>Rendered Cells</h2>
	<Help content="Note: If 'Make image sequence?' is checked, atoms should have arity 4."/>
</div>

<Cells />

<div class="use-img">
	<label for="useimg">use images?</label>
	<input
		title="Activated: Use imags to show the answer sets solutions. Deactivated: Use colors to show answer sets solutions."
		type="checkbox"
		name="useimg"
		bind:checked={useImages}
	/>
	<label for="gif">make image sequence?</label>
	<input
		title="Activated: Create multiple images for the answers sets solutions including timing. Deactivated: Create a static image for the answer set solution."
		type="checkbox"
		name="gif"
		bind:checked={gif}
	/>
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
	.header{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
