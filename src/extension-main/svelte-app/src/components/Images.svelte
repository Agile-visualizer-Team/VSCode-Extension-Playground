<script lang="ts">
	import { onMount } from 'svelte';
	import { images } from '../store';
	import ImageCell from './images-cell.svelte';
	import ImageStyle from './images-style.svelte';
	let maxNumOfAnswerSetToConvert: number = 4;

	onMount(() => {
		write();
	});

	$: if (maxNumOfAnswerSetToConvert) {
		write();
	}

	function write() {
		images.update((images) => {
			images.maxNumOfAnswerSetToConvert = maxNumOfAnswerSetToConvert;
			return images;
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
<ImageCell />
<ImageStyle />

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
