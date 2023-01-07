<script lang="ts">
	import Graph from '../components/Graph/Graph.svelte';
	import Matrix from '../components/Matrix/Matrix.svelte';
	import Table from '../components/Table/Table.svelte';
	import Images from '../components/Image/Images.svelte';
	import Welcome from '../components/Welcome.svelte';
	import { graph, matrix } from '../store';

	let template = 'none';
	let ta: string = '';

	$: if (template) {
		graph.set({
			template: 'graph',
			nodes: [],
			edges: []
		});
		matrix.set({
			template: 'matrix',
			maxNumOfAnswerSetToConvert: 4,
			cell: [''],
			style: {
				header_color: '',
				header_font_size: 0,
				header_font_family: '',
				header_font_weight: '',
				dark_mode: true
			}
		});
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
		if (change) template = 'none';
	}

	function mapExtractor(key: string, value: any) {
		if (value instanceof Map) return Object.fromEntries(value);
		return value;
	}
</script>

<textarea id="code" bind:value={ta} />

<select name="template" bind:value={template}>
	<option value="none">Settings</option>
	<option value="graph">Graph</option>
	<option value="table">Table</option>
	<option value="matrix">Matrix</option>
	<option value="images">Matrix (images)</option>
</select>

<button
	id="save-btn"
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
{:else}
	<Welcome />
{/if}

<style>
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
</style>
