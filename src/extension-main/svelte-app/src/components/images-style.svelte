<script lang="ts">
	import { images } from '../store';
	import { onMount } from 'svelte';

	onMount(() => {
		write();
	});

	$: if (style) write();

	let style: {
		header_color: string;
		header_font_size: number;
		header_font_family: string;
		header_font_weight: string;
		dark_mode: boolean;
	} = {
		header_color: '#b41b22',
		header_font_size: 20,
		header_font_family: 'Arial',
		header_font_weight: 'bold',
		dark_mode: true
	};

	function write() {
		images.update((images) => {
			images.style = style;
			return images;
		});
		// console.log($images);
	}
</script>

<h3>Cell Styling</h3>

<div class="style-arg">
	<label for="hsize">Font Size</label>
	<input type="number" name="hsize" bind:value={style.header_font_size} />
</div>
<div class="style-arg">
	<label for="hfam">Font Family</label>
	<input type="text" name="hfam" bind:value={style.header_font_family} />
</div>
<div class="style-arg">
	<label for="hwei">Font Weight</label>
	<input type="text" name="hwei" bind:value={style.header_font_weight} />
</div>

<div class="color-palette">
	<div>
		<label for="hcol">Header color</label>
		<input type="color" name="hcol" bind:value={style.header_color} />
	</div>
	<div>
		<label for="dark">dark mode?</label>
		<input type="checkbox" name="dark" bind:checked={style.dark_mode} />
	</div>
</div>

<style>
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

	.style-arg {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 1rem;
		margin-bottom: 10px;
	}
</style>
