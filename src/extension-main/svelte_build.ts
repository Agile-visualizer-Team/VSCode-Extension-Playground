import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-8524ad72.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-fad165cd.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-49265d02.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-a9475e05.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-c188d1c0.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-bb0e45f4.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-070df6f0.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-af12d980.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-f8423727.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
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



<div class=" svelte-1dimsne"><center class="svelte-1ozlydo"><h1 class="svelte-1ozlydo">Settings</h1></center>

<div class="svelte-1ozlydo"><button title="Creates default folder for extension to work." type="button" id="folder-btn" class="svelte-1ozlydo">Create extension folder</button></div>
<div class="svelte-1ozlydo"><button title="Run the extension using the parameters saved in config.json" type="button" id="run-btn" class="svelte-1ozlydo">Run using config file</button></div>
<div class="svelte-1ozlydo"><button title="Create a gif using the images inside the GIF folder." type="button" id="gif-btn" class="svelte-1ozlydo">Convert image sequence to gif</button></div>

<form id="form-div" class="svelte-1ozlydo"><div class="svelte-1ozlydo"><button title="Save configuration parameters inside config.json" class=" svelte-1ozlydo" id="config-btn" type="submit">Save Configuration File</button>
		<textarea id="config-ta" rows="10" class="svelte-1ozlydo"></textarea></div>

	<h2 class="svelte-1ozlydo"># of Answer Sets</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="svelte-1ozlydo"><input id="sol-in" type="number" min="1" value="1" required class="svelte-1ozlydo"></div>

	<h2 class="svelte-1ozlydo">Solver path</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="svelte-1ozlydo"><textarea id="solver-ta" required class="svelte-1ozlydo"></textarea>
		<button title="The DLV Solver file path." type="button" id="solver-btn" class="svelte-1ozlydo">Solver Executable</button></div>

	<h2 class="svelte-1ozlydo">Program file</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="svelte-1ozlydo"><textarea id="program-ta" required class="svelte-1ozlydo"></textarea>
		<button title="The ASP program file path." type="button" id="program-btn" class="svelte-1ozlydo">Program Path</button></div>

	<h2 class="svelte-1ozlydo">Output Directory</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="svelte-1ozlydo"><textarea id="output-ta" required class="svelte-1ozlydo"></textarea>
		<button title="The path in which output files will be saved." type="button" id="output-btn" class="svelte-1ozlydo">Output Directory</button></div>

	<h2 class="svelte-1ozlydo">Chrome Executable</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="svelte-1ozlydo"><textarea id="chrome-ta" required class="svelte-1ozlydo"></textarea>
		<button title="The path for the Chromium Browser executable." type="button" id="chrome-btn" class="svelte-1ozlydo">Chromium Based Browser Executable</button></div>

	<h2 class="svelte-1ozlydo">Template file</h2>
	<h5 class="svelte-1ozlydo">required</h5>

	<div class="split svelte-1ozlydo"><textarea id="template-ta" required class="svelte-1ozlydo"></textarea>
		<button title="The path for the ASP Visualizer configuration file. (Tip: Generate it through the extension panel)" type="button" id="template-btn" class="svelte-1ozlydo">Template File</button>
		
		<button type="button" class="svelte-1ozlydo">Create a Template
		</button></div>

	<h2 class="svelte-1ozlydo">Image Directory</h2>
	<h5 class="svelte-1ozlydo">image matrix, optional</h5>

	<div class="svelte-1ozlydo"><button title="The path for the images that will be used for the Matrix(Image) visualization." type="button" id="image-btn" class="svelte-1ozlydo">Image Resources Directory</button>
		<textarea id="image-ta" class="svelte-1ozlydo"></textarea></div>
</form>
</div>


		<script type="module" data-sveltekit-hydrate="oi63hb">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"base":"","assets":""},
				target: document.querySelector('[data-sveltekit-hydrate="oi63hb"]').parentNode,
				version: "1675214251433",
				hydrate: {
					node_ids: [0, 2],
					data: [null,null],
					form: null
				}
			});
		</script>
	</div>
	<script src="${main_js}"></script></body>
</html>
`;}