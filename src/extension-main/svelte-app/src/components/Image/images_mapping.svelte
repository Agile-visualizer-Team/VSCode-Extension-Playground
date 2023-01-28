<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';

	let images_binding: Map<string, string> = new Map();
	let img_name: string[] = ['attr1', 'attr2'];
	let img_path: string[] = ['filename', 'filename'];

	onMount(() => {
		write();
	});

	$: if (img_name || img_path) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			images_binding = new Map();
			for (let i = 0; i < img_name.length; i++) {
				images_binding.set(img_name[i], img_path[i]);
			}
			cell.images_binding = images_binding;
			return cell;
		});
	}

	function addEntry() {
		img_name = [...img_name, 'attr' + (img_name.length + 1)];
		img_path = [...img_path, 'filename' + (img_path.length + 1)];
	}
</script>

<h2>Images Mapping</h2>
<button title="Add new entry to map" on:click={addEntry}>Add Entry</button>

{#each img_name as name, index}
	<div class="entry">
		<input type="text" name="img_name" placeholder="attribute name" bind:value={img_name[index]} />
		<input type="text" name="img_wall" placeholder="image name" bind:value={img_path[index]} />
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
