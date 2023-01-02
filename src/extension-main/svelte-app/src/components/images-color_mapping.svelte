<script lang="ts">
	import { onMount } from 'svelte';
	import { images } from '../store';

	let colors_binding: { wall: string; floor: string; man: string } = {
		wall: '#FF0000',
		floor: '#00FF00',
		man: '#0000FF'
	};

	onMount(() => {
		write();
	});

	$: if (colors_binding.wall || colors_binding.floor || colors_binding.man) {
		write();
	}

	function write() {
		images.update((image) => {
			image.colors_binding = colors_binding;
			return image;
		});
		// console.log($images);
	}
</script>

<h2>Color Mapping</h2>

<div class="color-palette">
	<div>
		<label for="col_wall">wall</label>
		<input type="color" name="col_wall" id="col_wall" bind:value={colors_binding.wall} />
	</div>
	<div>
		<label for="col_floor">floor</label>
		<input type="color" name="col_floor" id="col_floor" bind:value={colors_binding.floor} />
	</div>
	<div>
		<label for="col_man">man</label>
		<input type="color" name="col_man" id="col_man" bind:value={colors_binding.man} />
	</div>
</div>

<style>
	input {
		margin-bottom: 10px;
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
</style>
