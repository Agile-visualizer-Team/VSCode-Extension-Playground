<script lang="ts">
	import { onMount } from 'svelte';
	import { COLORS, graph } from '../../store';
	import Help from '../Help.svelte';

	export let idx: number;

	onMount(() => {
		write();
	});

	$: if (name || variables || color) write();

	let name: string = 'node';
	let variables: string[] = ['arg1'];
	let color: { root: string; leaves: string; nonRoot: string } = {
		root: 'yellow',
		leaves: 'fuchsia',
		nonRoot: 'blue'
	};

	function addArg() {
		variables = [...variables, 'arg' + (variables.length + 1)];
	}

	function remove(elem: number) {
		variables.splice(elem, 1);
		variables = [...variables];
	}

	function write() {
		graph.update((graph) => {
			if (graph.nodes[idx]) {
				graph.nodes[idx].atom.name = name;
				graph.nodes[idx].atom.variables = variables;
				graph.nodes[idx].style.color = color;
				return graph;
			} else {
				graph.nodes.push({
					atom: { name, variables },
					style: { color }
				});
				return graph;
			}
		});

		// console.log($graph);
	}
</script>

<div class="atom-name">
	<p>Atom Name</p>
	<input type="text" name="name" bind:value={name} />
</div>
<button on:click={addArg}>Increment Arity</button>
{#if variables.length > 0}
	<div class="header">
		<h3>Arguments</h3>
		<Help content="Note: If color is specified in the argouments, it will have the maximum priority and override all other color properties." />
	</div>
	{#each variables as arg, index}
		<div class="arg">
			<input type="text" name="variable" bind:value={arg} />
			<button on:click={() => remove(index)}>remove</button>
		</div>
	{/each}
{/if}

<h3>Node Styling</h3>
<div class="color-palette">
	<div>
		<div>
			<label for="root">root</label>
			<div class="color" style="background-color: {color.root};" />
		</div>
		<select name="root" bind:value={color.root}>
			{#each COLORS as color}
				<option value={color}>{color}</option>
			{/each}
		</select>
	</div>
	<div>
		<div>
			<label for="leaves">leaves</label>
			<div class="color" style="background-color: {color.leaves};" />
		</div>
		<select name="leaves" bind:value={color.leaves}>
			{#each COLORS as color}
				<option value={color}>{color}</option>
			{/each}
		</select>
	</div>
	<div>
		<div>
			<label for="nonroot">Non Root</label>
			<div class="color" style="background-color: {color.nonRoot};" />
		</div>
		<select name="nonroot" bind:value={color.nonRoot}>
			{#each COLORS as color}
				<option value={color}>{color}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	.atom-name {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 1rem;
	}

	.atom-name p {
		min-width: fit-content;
	}

	.arg {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		margin-bottom: 10px;
	}

	.arg button {
		width: 20%;
	}

	.color-palette {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.color-palette > div {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.color-palette > div > div {
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.color-palette select {
		width: 70%;
	}

	.color {
		width: 25px;
		height: 25px;
		border: black solid 1px;
		border-radius: 100%;
		transition: all 0.15s linear;
	}
</style>
