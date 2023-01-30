<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';

	let table_field_mapping: Map<string, string> = new Map();
	let col_name: string[] = ['column name 1', 'column name 2'];

	onMount(() => {
		write();
	});

	$: if (col_name) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			table_field_mapping = new Map();
			for (let i = 0; i < col_name.length; i++) {
				table_field_mapping.set(i.toString(), col_name[i]);
			}
			
			cell.table_field_mapping = table_field_mapping;
			return cell;
		});

		// console.log($matrix);
	}

	function addEntry() {
		col_name = [...col_name, 'column name ' + (col_name.length + 1)];
	}

	function removeColumn(idx: number) {
		//We do not have this constraint
		/* if (col_name.length == 1) return; */

		col_name.splice(idx, 1);
		col_name = [...col_name];
	}
</script>

<h2>Table Mapping</h2>
<button on:click={addEntry}>Add column</button>

{#each col_name as name, index}
	<div class="entry">
		<input type="text" name="col_idx" disabled bind:value={index} />
		<input type="text" name="col_name" placeholder="column name" bind:value={col_name[index]} />
		<button on:click={() => removeColumn(index)}>remove</button>
	</div>
{/each}

<style>
	button,
	input {
		margin-bottom: 10px;
	}

	div > input:first-child {
		width: 20%;
		text-align: center;
	}

	div > button {
		width: 20%;
	}

	.entry {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
