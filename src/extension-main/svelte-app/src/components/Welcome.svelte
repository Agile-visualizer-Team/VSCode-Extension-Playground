<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	let changed = false;
	const dispatch = createEventDispatcher();

	function blinkSelect() {
		dispatch('blink');
	}

	function hasChanged() {
		changed = true;
	}

	function saveConfig() {
		document.getElementById('config-btn')?.classList.remove('changed');
	}
</script>

<center>
	<h1>Settings</h1>
</center>

<div>
	<button title="Creates default folder for extension to work." type="button" id="folder-btn"
		>Create extension folder</button
	>
</div>
<div>
	<button
		title="Run the extension using the parameters saved in config.json"
		type="button"
		id="run-btn">Run using config file</button
	>
</div>
<div>
	<button title="Create a gif using the images inside the GIF folder." type="button" id="gif-btn"
		>Convert image sequence to gif</button
	>
</div>

<form id="form-div" on:change={() => hasChanged()} on:submit|preventDefault={() => saveConfig()}>
	<div>
		<button
			title="Save configuration parameters inside config.json"
			class={changed ? 'changed' : ''}
			id="config-btn"
			type="submit">Save Configuration File</button
		>
		<textarea id="config-ta" rows="10" />
	</div>

	<h2># of Answer Sets</h2>
	<h5>required</h5>

	<div>
		<input id="sol-in" type="number" min="1" value="1" required />
	</div>

	<h2>Solver path</h2>
	<h5>required</h5>

	<div>
		<textarea id="solver-ta" required />
		<button title="The DLV Solver file path." type="button" id="solver-btn"
			>Solver Executable</button
		>
	</div>

	<h2>Program file</h2>
	<h5>required</h5>

	<div>
		<textarea id="program-ta" required />
		<button title="The ASP program file path." type="button" id="program-btn">Program Path</button>
	</div>

	<h2>Output Directory</h2>
	<h5>required</h5>

	<div>
		<textarea id="output-ta" required />
		<button title="The path in which output files will be saved." type="button" id="output-btn"
			>Output Directory</button
		>
	</div>

	<h2>Chrome Executable</h2>
	<h5>required</h5>

	<div>
		<textarea id="chrome-ta" required />
		<button title="The path for the Chromium Browser executable." type="button" id="chrome-btn"
			>Chromium Based Browser Executable</button
		>
	</div>

	<h2>Template file</h2>
	<h5>required</h5>

	<div class="split">
		<textarea id="template-ta" required />
		<button
			title="The path for the ASP Visualizer configuration file. (Tip: Generate it through the extension panel)"
			type="button"
			id="template-btn">Template File</button
		>
		<button
			type="button"
			on:click={() => {
				window.scrollTo(0, 0);
				blinkSelect()
			}}>Create a Template</button
		>
	</div>

	<h2>Image Directory</h2>
	<h5>image matrix, optional</h5>

	<div>
		<button
			title="The path for the images that will be used for the Matrix(Image) visualization."
			type="button"
			id="image-btn">Image Resources Directory</button
		>
		<textarea id="image-ta" />
	</div>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-rows: 1fr auto;
		align-items: center;
	}

	h5 {
		color: gray;
	}

	div {
		grid-column: 1 / 3;
	}

	input[type='number'] {
		text-align: center;
	}

	textarea {
		position: relative;
		width: 50vw;
		height: 1vh;
		z-index: -1;
		opacity: 0;
	}

	button {
		margin-bottom: 10px;
	}

	input:valid {
		background-color: green;
		color: white;
	}

	textarea:valid ~ button {
		background-color: green;
		color: white;
	}

	.changed {
		background-color: #242830;
		color: #aba671;
		animation: blinking 1s infinite alternate;
		border: 1px solid #aba671;
	}

	.invisible {
		position: relative;
		width: 50vw;
		height: 1vh;
		z-index: -1;
		opacity: 1;
	}

	@keyframes blinking {
		from {
			background-color: #323842;
		}
		to {
			background-color: #242830;
		}
	}

	:disabled {
		cursor: not-allowed;
		background-color: unset;
	}

	:disabled:hover {
		background-color: unset;
	}
</style>
