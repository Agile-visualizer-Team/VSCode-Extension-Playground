<script lang="ts">
	import { graph, COLORS, edgeArgsUnique } from '../../store';
	import { onMount } from 'svelte';
	import Help from '../Help.svelte';
	export let idx: number;

	let areArgsUnique = false;

	onMount(() => {
		write();
	});

	$: if (name || variables || color || oriented) write();

	let name: string = 'edge';
	let variables: string[] = ['from', 'to', 'arg1'];
	let color: string = 'yellow';
	let oriented: boolean = false;

	function addArg() {
		variables = [...variables, 'arg' + (variables.length + 1)];
	}

	function remove(elem: number) {
		if ((variables.at(elem) == 'from' || variables.at(elem) == 'to') && elem <= 1) return;
		variables.splice(elem, 1);
		variables = [...variables];
	}

	function write() {
		areArgsUnique = true;
		edgeArgsUnique.update((nodeArgsUnique: Map<number, boolean>) => {
			nodeArgsUnique.set(idx, areArgsUnique);
			return nodeArgsUnique;
		});
		let uniques = variables.filter((v, i, a) => a.indexOf(v) === i);
		if (uniques.length !== variables.length) {
			areArgsUnique = false;
			edgeArgsUnique.update((nodeArgsUnique: Map<number, boolean>) => {
				nodeArgsUnique.set(idx, areArgsUnique);
				return nodeArgsUnique;
			});
		}

		graph.update((graph) => {
			if (graph.edges[idx]) {
				graph.edges[idx].atom.name = name;
				graph.edges[idx].atom.variables = variables;
				graph.edges[idx].style.color = color;
				graph.edges[idx].style.oriented = oriented;
				return graph;
			} else {
				graph.edges.push({
					atom: { name, variables },
					style: { color, oriented }
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
		<Help
			content="Note: If color is specified in the argouments, it will have the maximum priority and override all other color properties."
		/>
	</div>
	{#if !areArgsUnique}
		<p class="warn">Arguments must be unique</p>
	{/if}
	{#each variables as arg, index}
		{#if (arg == 'from' || arg == 'to') && index <= 1}
			<div class="arg">
				<input type="text" name="variable" bind:value={arg} disabled />
			</div>
		{:else}
			<div class="arg">
				<input type="text" name="variable" bind:value={arg} />
				<button on:click={() => remove(index)}>remove</button>
			</div>
		{/if}
	{/each}
{/if}

<h3>Edge Styling</h3>
<div class="color-palette">
	<div>
		<div>
			<label for="root">root</label>
			<div class="color" style="background-color: {color};" />
		</div>
		<select name="root" bind:value={color}>
			{#each COLORS as col}
				<option value={col}>{col}</option>
			{/each}
		</select>
	</div>
	<div>
		<span>
			<label for="oriented">oriented?</label>
			<input type="checkbox" name="oriented" bind:checked={oriented} />
		</span>
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

	input[type='checkbox'] {
		align-self: center;
	}

	span {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
