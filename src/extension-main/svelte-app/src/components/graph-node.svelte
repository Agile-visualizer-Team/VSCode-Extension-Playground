<script lang="ts">
	import { graph } from '../store';
	import { onMount } from 'svelte';

	export let idx: number;

	onMount(() => {
		write();
	});

	$: if (name || variables || color) write();

	let name: string = 'node';
	let variables: string[] = ['arg1'];
	let color: { root: string; leaves: string; nonRoot: string } = {
		root: '#FF0000',
		leaves: '#00FF00',
		nonRoot: '#0000FF'
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
	<h3>Arguments</h3>
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
		<label for="root">root</label>
		<input type="color" name="root" bind:value={color.root} />
	</div>
	<div>
		<label for="leaves">leaves</label>
		<input type="color" name="leaves" bind:value={color.leaves} />
	</div>
	<div>
		<label for="nonroot">Non Root</label>
		<input type="color" name="non" bind:value={color.nonRoot} />
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
		align-items: center;
		justify-content: space-around;
	}

	.color-palette div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 365px) {
		.color-palette div {
			flex-direction: column;
			gap: initial;
		}
	}

	input[type='color'] {
		padding: 0;
		margin: 0;
		border: none !important;
		height: 40px;
		width: 40px;
	}
</style>
