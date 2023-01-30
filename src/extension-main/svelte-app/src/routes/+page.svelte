<script lang="ts">
	import Graph from '../components/Graph/Graph.svelte';
	import Matrix from '../components/Matrix/Matrix.svelte';
	import Table from '../components/Table/Table.svelte';
	import Images from '../components/Image/Images.svelte';
	import Welcome from '../components/Welcome.svelte';
	import { edgeArgsUnique, graph, matrix, nodeArgsUnique } from '../store';

	let template = 'none';
	let ta: string = '';
	let showBlink = false;

	$: if (template) {
		graph.set({
			template: 'graph',
			nodes: [],
			edges: []
		});
		matrix.set({
			template: 'matrix',
			maxNumOfAnswerSetToConvert: 4,
			cell: [],
			style: {
				header_color: 'white',
				header_font_size: 20,
				header_font_family: 'Arial',
				header_font_weight: 'bold',
				dark_mode: true
			}
		});
	}

	function blink() {
		showBlink = true;
		setTimeout(() => (showBlink = false), 1500);
	}

	$: if ($graph || $matrix) compile();

	function compile(change: boolean = false) {
		if (template === 'none') return;

		if (template === 'graph') {
			ta = JSON.stringify($graph, null, 4);
		} else {
			ta = JSON.stringify($matrix, mapExtractor, 4);
		}

		console.log(ta);
		let isUniqueRespected = true;

		//Check if at least one value in the map $edgeArgsUnique is false
		//If so, then the template is not valid
		$edgeArgsUnique.forEach((value, key) => {
			if (!value) isUniqueRespected = false;
		});

		//Check if at least one value in the map $nodeArgsUnique is false
		$nodeArgsUnique.forEach((value, key) => {
			if (!value) isUniqueRespected = false;
		});

		if (change && isUniqueRespected) template = 'none';
	}

	function mapExtractor(key: string, value: any) {
		if (value instanceof Map) return Object.fromEntries(value);
		return value;
	}
</script>

<textarea id="code" bind:value={ta} />

<select class={showBlink ? 'blinker' : ''} name="template" bind:value={template}>
	<option value="none">Settings</option>
	<option value="graph">Graph</option>
	<option value="table">Table</option>
	<option value="matrix">Matrix</option>
	<option value="images">Matrix (images)</option>
</select>

<button
	id="save-btn"
	title="Save the template file for the current visualization."
	on:click={() => compile(true)}
	style="display:{template !== 'none' ? 'block' : 'none'}">Save Template File</button
>

{#if template === 'graph'}
	<Graph />
{:else if template === 'table'}
	<Table />
{:else if template === 'matrix'}
	<Matrix />
{:else if template === 'images'}
	<Images />
{/if}

<div class={template == 'none' ? '' : 'hidden'}>
	<Welcome on:blink={blink} />
</div>

<style>
	.hidden {
		display: none;
	}

	#code {
		position: absolute;
		top: -200%;
	}

	select {
		width: 100%;
		height: 2rem;
		text-align: center;
		margin-bottom: 10px;
	}

	.blinker {
		color: #aba671;
		border: 2px solid transparent;
		background-color: #242830;
		animation: blinking 0.25s linear infinite;
	}

	@keyframes blinking {
		0% {
			border-color: #aba671;
			box-shadow: 0 0 10px #aba671;
		}
		50% {
			border-color: #aba671;
			box-shadow: 0 0 20px #aba671;
		}
		100% {
			border-color: #aba671;
			box-shadow: 0 0 10px #aba671;
		}
	}
</style>
