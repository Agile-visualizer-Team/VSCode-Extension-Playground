<script lang="ts">
	import { matrix } from '../../store';
	import { onMount } from 'svelte';

	onMount(() => {
		write();
	});

	$: if (cells) write();

	let cells: string[] = ['cell1'];

	function addCell() {
		cells = [...cells, 'cell' + (cells.length + 1)];
	}

	function remove(elem: number) {
		if (cells.length == 1) return;
		cells.splice(elem, 1);
		cells = [...cells];
	}

	function write() {
		matrix.update((store) => {
			store.cell = cells;
			return store;
		});
	}
</script>

<button title="Add a new cell to map." class="add" on:click={addCell}>Add new Cell</button>
{#if cells.length > 0}
	{#each cells as arg, index}
		<div class="arg">
			<input type="text" name="variable" bind:value={arg} />
			<button on:click={() => remove(index)}>remove</button>
		</div>
	{/each}
{/if}

<style>
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

	.add {
		margin-bottom: 10px;
	}
</style>
