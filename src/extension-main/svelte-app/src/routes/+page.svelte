<script lang="ts">
	import Graph from '../components/Graph.svelte';
	import Matrix from '../components/Matrix.svelte';
	import Table from '../components/Table.svelte';
	import Images from '../components/Images.svelte';
	import Welcome from '../components/Welcome.svelte';
	import { graph, matrix, table, images } from '../store';

	let template = 'images';
	let ta: HTMLTextAreaElement;

	$: if (template) {
		graph.set({ template: template, nodes: [], edges: [] });
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
		table.set({
			template: 'table',
			maxNumOfAnswerSetToConvert: 4,
			cell: [''],
			table_field_mapping: {
				0: 'row to map',
				1: 'column',
				2: 'value'
			},
			style: {
				header_color: '',
				header_font_size: 0,
				header_font_family: '',
				header_font_weight: '',
				dark_mode: true
			}
		});
		images.set({});
	}

	function compile() {
		switch (template) {
			case 'graph':
				ta.value = JSON.stringify($graph);
				break;
			case 'table':
				ta.value = JSON.stringify($table);
				break;
			case 'matrix':
				ta.value = JSON.stringify($matrix);
				break;
			case 'images':
				ta.value = JSON.stringify($images);
				break;
			default:
				break;
		}
		console.log(ta.value);
	}
</script>

<textarea id="code" bind:this={ta} />

<select
	name="template"
	id="template"
	on:change={(event) => {
		template = event.currentTarget.value;
	}}
>
	<option value="none">Choose a template</option>
	<option value="graph">Graph</option>
	<option value="table">Table</option>
	<option value="matrix">Matrix</option>
	<option value="images" selected>Matrix (images)</option>
</select>

{#if template !== 'none'}
	<button id="render" on:click={compile}>Render Answer Set</button>
{/if}

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
		display: none;
	}

	select {
		width: 100%;
		height: 2rem;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
