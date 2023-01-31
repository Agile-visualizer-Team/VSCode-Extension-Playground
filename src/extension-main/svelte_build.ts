import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-40af49c4.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-4b7efa57.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-d3883455.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-073e2371.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-705e6b6a.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-0164f630.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-070df6f0.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-af12d980.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-2036b911.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
return `<!DOCTYPE html>
<html lang="en">
	<head>
<link rel="stylesheet" href="${global_css}">
<link rel="stylesheet" href="${_page_css}">
<link rel="modulepreload" href="${start_js}">
<link rel="modulepreload" href="${index_1_js}">
<link rel="modulepreload" href="${singletons_js}">
<link rel="modulepreload" href="${index_2_js}">
<link rel="modulepreload" href="${layout_svelte_js}">
<link rel="modulepreload" href="${_layout_ts_js}">
<link rel="modulepreload" href="${_layout_js}">
</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">


<textarea id="code" class="svelte-1dimsne"></textarea>

<select class=" svelte-1dimsne" name="template"><option value="none">Settings</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>

<button id="save-btn" title="Save the template file for the current visualization." style="display:none">Save Template File</button>



<div class=" svelte-1dimsne"><center class="svelte-slyfrv"><h1 class="svelte-slyfrv">Settings</h1></center>

<div class="svelte-slyfrv"><button title="Creates default folder for extension to work." type="button" id="folder-btn" class="svelte-slyfrv">Create extension folder</button></div>
<div class="svelte-slyfrv"><button title="Run the extension using the parameters saved in config.json" type="button" id="run-btn" class="svelte-slyfrv">Run using config file</button></div>
<div class="svelte-slyfrv"><button title="Create a gif using the images inside the GIF folder." type="button" id="gif-btn" class="svelte-slyfrv">Convert image sequence to gif</button></div>

<form id="form-div" class="svelte-slyfrv"><div class="svelte-slyfrv"><button title="Save configuration parameters inside config.json" class=" svelte-slyfrv" id="config-btn" type="submit">Save Configuration File</button>
		<textarea id="config-ta" rows="10" class="svelte-slyfrv"></textarea></div>

	<h2 class="svelte-slyfrv"># of Answer Sets</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="svelte-slyfrv"><input id="sol-in" type="number" min="1" value="1" required class="svelte-slyfrv"></div>

	<h2 class="svelte-slyfrv">Solver path</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="svelte-slyfrv"><textarea id="solver-ta" required class="svelte-slyfrv"></textarea>
		<button title="The DLV Solver file path." type="button" id="solver-btn" class="svelte-slyfrv">Solver Executable</button></div>

	<h2 class="svelte-slyfrv">Program file</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="svelte-slyfrv"><textarea id="program-ta" required class="svelte-slyfrv"></textarea>
		<button title="The ASP program file path." type="button" id="program-btn" class="svelte-slyfrv">Program Path</button></div>

	<h2 class="svelte-slyfrv">Output Directory</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="svelte-slyfrv"><textarea id="output-ta" required class="svelte-slyfrv"></textarea>
		<button title="The path in which output files will be saved." type="button" id="output-btn" class="svelte-slyfrv">Output Directory</button></div>

	<h2 class="svelte-slyfrv">Chrome Executable</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="svelte-slyfrv"><textarea id="chrome-ta" required class="svelte-slyfrv"></textarea>
		<button title="The path for the Chromium Browser executable." type="button" id="chrome-btn" class="svelte-slyfrv">Chromium Based Browser Executable</button></div>

	<h2 class="svelte-slyfrv">Template file</h2>
	<h5 class="svelte-slyfrv">required</h5>

	<div class="split svelte-slyfrv"><textarea id="template-ta" required class="svelte-slyfrv"></textarea>
		<button title="The path for the ASP Visualizer configuration file. (Tip: Generate it through the extension panel)" type="button" id="template-btn" class="svelte-slyfrv">Template File</button>
		
		<button type="button" class="svelte-slyfrv">Create a Template
		</button></div>

	<h2 class="svelte-slyfrv">Image Directory</h2>
	<h5 class="svelte-slyfrv">image matrix, optional</h5>

	<div class="svelte-slyfrv"><button title="The path for the images that will be used for the Matrix(Image) visualization." type="button" id="image-btn" class="svelte-slyfrv">Image Resources Directory</button>
		<textarea id="image-ta" class="svelte-slyfrv"></textarea></div>
</form>
</div>


		<script type="module" data-sveltekit-hydrate="1rwzqv5">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"assets":"","base":""},
				target: document.querySelector('[data-sveltekit-hydrate="1rwzqv5"]').parentNode,
				version: "1675182942340",
				hydrate: {
					node_ids: [0, 2],
					data: [null,null],
					form: null,
					error: null
				}
			});
		</script>
	</div>
	<script src="${main_js}"></script></body>
</html>
`;}