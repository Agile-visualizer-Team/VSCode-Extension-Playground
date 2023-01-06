<script lang="ts">
	import { onMount } from 'svelte';
	import { matrix } from '../../store';

	let images_binding: Map<string, string> = new Map();
	let img_name: string[] = ['img1', 'img2'];
	let img_path: string[] = ['path/to/img1', 'path/to/img2'];

	onMount(() => {
		write();
	});

	$: if (img_name || img_path) {
		write();
	}

	function write() {
		matrix.update((cell) => {
			images_binding = new Map();
			for (const name of img_name) {
				images_binding.set(name, 'path/to/image');
			}
			cell.images_binding = images_binding;
			return cell;
		});
	}

	function addEntry() {
		img_name = [...img_name, 'img' + (img_name.length + 1)];
		img_path = [...img_path, 'path/to/img' + (img_path.length + 1)];
	}
</script>

<h2>Images Mapping</h2>
<button on:click={addEntry}>Add Entry</button>

{#each img_name as name, index}
	<div class="entry">
		<input type="text" name="img_name" placeholder="image name" bind:value={img_name[index]} />
		<input type="text" name="img_wall" placeholder="image path" bind:value={img_path[index]} />
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
