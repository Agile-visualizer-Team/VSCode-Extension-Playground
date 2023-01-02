<script lang="ts">
	import { onMount } from 'svelte';
	import { images } from '../store';

	let images_binding: { wall: string; floor: string; man: string } = {
		wall: '/path/to/wall.png',
		floor: '/path/to/floor.png',
		man: '/path/to/man.png'
	};

	onMount(() => {
		write();
	});

	$: if (images_binding.wall || images_binding.floor || images_binding.man) {
		write();
	}

	function write() {
		images.update((image) => {
			image.images_binding = images_binding;
			return image;
		});
		// console.log($images);
	}
</script>

<h2>Images Mapping</h2>

<input type="text" name="img_wall" id="img_wall" bind:value={images_binding.wall} />
<input type="text" name="img_floor" id="img_floor" bind:value={images_binding.floor} />
<input type="text" name="img_man" id="img_man" bind:value={images_binding.man} />

<style>
	input {
		margin-bottom: 10px;
	}
</style>
