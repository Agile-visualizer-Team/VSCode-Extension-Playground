<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';

	let colors_mapping: Map<string, string> = new Map();
	let atom_name: string[] = ['atom1', 'atom2'];
	let col_value: string[] = ['#b41b22', '#b41b22'];

	onMount(() => {
		write();
	});

	$: if (atom_name || col_value) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			colors_mapping = new Map();
			for (const name of atom_name) {
				colors_mapping.set(name, '#b41b22');
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
<button on:click={addEntry}>Add Entry</button>

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
