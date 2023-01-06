<script lang="ts">
	import GraphNode from './graph-node.svelte';
	import GraphEdge from './graph-edge.svelte';
	import { REMOVE_NODE, REMOVE_EDGE, graph } from '../../store';

	let nodes: string[] = ['0'];
	let edges: string[] = ['0'];

	function addNode() {
		nodes = [...nodes, nodes.length.toString()];
	}

	function addEdge() {
		edges = [...edges, edges.length.toString()];
	}

	function removeNode(elem: number) {
		if (nodes.length == 1) return;

		nodes.splice(elem, 1);
		nodes = [...nodes];

		REMOVE_NODE(elem);
		// console.log($graph);
	}

	function removeEdge(elem: number) {
		if (edges.length == 1) return;

		edges.splice(elem, 1);
		edges = [...edges];

		REMOVE_EDGE(elem);
		// console.log($graph);
	}
</script>

<center>
	<h1>Graph</h1>
</center>

<div id="ctrl">
	<button on:click={() => addNode()}>Add Node</button>
	<button on:click={() => addEdge()}>Add Edge</button>
</div>

{#each nodes as node, idx}
	<div class="item-ctrl">
		<h2>Rendered Node</h2>
		{#if nodes.length > 1}
			<button on:click={() => removeNode(idx)}>Remove Node</button>
		{:else}
			<button disabled>Remove Node</button>
		{/if}
	</div>
	<GraphNode {idx} />
{/each}

{#each edges as edge, idx}
	<div class="item-ctrl">
		<h2>Rendered Edge</h2>
		{#if edges.length > 1}
			<button on:click={() => removeEdge(idx)}>Remove Edge</button>
		{:else}
			<button disabled>Remove Edge</button>
		{/if}
	</div>
	<GraphEdge {idx} />
{/each}

<style>
	h1 {
		text-align: center;
	}

	#ctrl {
		display: flex;
		justify-content: center;
		gap: 5%;
		margin-bottom: 10px;
	}

	.item-ctrl {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		align-content: space-between;
		justify-content: space-between;
	}
</style>
