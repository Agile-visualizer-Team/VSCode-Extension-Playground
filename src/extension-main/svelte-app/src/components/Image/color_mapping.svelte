<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';

	let colors_mapping: Map<string, string> = new Map();
	let atom_name: string[] = ['wall', 'floor', 'man'];
	let col_value: string[] = ['#b41b22', '#FFFFFF', '#000000'];

	onMount(() => {
		write();
	});

	$: if (atom_name || col_value) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			colors_mapping = new Map();
			for (let i = 0; i < atom_name.length; i++) {
				colors_mapping.set(atom_name[i], col_value[i]);
			}
			cell.colors_binding = colors_mapping;
			return cell;
		});
	}

	function addEntry() {
		atom_name = [...atom_name, 'atom' + (atom_name.length + 1)];
		col_value = [...col_value, '#b41b22'];
	}
</script>

<h2>Colors Mapping</h2>
<button title="Add a new entry to map." on:click={addEntry}>Add Entry</button>

{#each atom_name as name, index}
	<div class="entry">
		<input type="text" name="atom_name" placeholder="atom name" bind:value={atom_name[index]} />
		<input type="color" name="color_value" bind:value={col_value[index]} />
	</div>
{/each}

<style>
	button, input {
		margin-bottom: 10px;
	}

	.entry {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
