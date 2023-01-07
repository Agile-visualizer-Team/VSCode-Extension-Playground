<center>
	<h1>Settings</h1>
</center>

<form on:submit|preventDefault>
	<div>
		<button id="run-btn" type="button">Run using config file</button>
	</div>

	<div>
		<button id="config-btn" type="submit">Save Configuration File</button>
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
		<button type="button" id="solver-btn">Solver Executable</button>
		<textarea id="solver-ta" required />
	</div>

	<h2>Program file</h2>
	<h5>required</h5>

	<div>
		<button type="button" id="program-btn">Program Path</button>
		<textarea id="program-ta" required />
	</div>

	<h2>Output Directory</h2>
	<h5>required</h5>

	<div>
		<button type="button" id="output-btn">Output Directory</button>
		<textarea id="output-ta" required />
	</div>

	<h2>Chrome Executable</h2>
	<h5>required</h5>

	<div>
		<button type="button" id="chrome-btn">Chromium Based Browser Executable</button>
		<textarea id="chrome-ta" required />
	</div>

	<h2>Template file</h2>
	<h5>required</h5>

	<div>
		<button type="button" id="template-btn">Template File</button>
		<textarea id="template-ta" required />
	</div>

	<h2>Image Directory</h2>
	<h5>image matrix, optional</h5>

	<div>
		<button type="button" id="image-btn">Image Resources Directory</button>
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
</style>
