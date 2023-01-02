<script lang="ts">
	import { onMount } from 'svelte';
	import { table } from '../store';

	let table_field_mapping: { '0': string; '1': string; '2': string } = {
		0: 'row to map',
		1: 'column',
		2: 'value'
	};

	onMount(() => {
		write();
	});

	$: if (table_field_mapping[0] || table_field_mapping[1] || table_field_mapping[2]) {
		write();
	}

	function write() {
		table.update((cell) => {
			cell.table_field_mapping = table_field_mapping;
			return cell;
		});
		// console.log($table);
	}
</script>

<h2>Table Mapping</h2>

<input type="text" name="a" id="a" bind:value={table_field_mapping[0]} />
<input type="text" name="b" id="b" bind:value={table_field_mapping[1]} />
<input type="text" name="c" id="c" bind:value={table_field_mapping[2]} />

<style>
	input {
		margin-bottom: 10px;
	}
</style>
