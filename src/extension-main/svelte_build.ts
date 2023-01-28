import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-09d466c8.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-cf64942f.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-a4312605.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-b1c344f7.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-3d9826ae.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-f1d076ff.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-070df6f0.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-af12d980.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-812a340f.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
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


<textarea id="code" class="svelte-8ve48e"></textarea>

<select name="template" class="svelte-8ve48e"><option value="none">Settings</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>

<button id="save-btn" title="Save the template file for the current visualization." style="display:none">Save Template File</button>

<center class="svelte-1p2fghn"><h1 class="svelte-1p2fghn">Settings</h1></center>


<div class="svelte-1p2fghn"><button title="Creates default folder for extension to work." type="button" id="folder-btn" class="svelte-1p2fghn">Create extension folder</button></div>
<div class="svelte-1p2fghn"><button title="Run the extension using the parameters saved in config.json" type="button" id="run-btn" class="svelte-1p2fghn">Run using config file</button></div>
<div class="svelte-1p2fghn"><button title="Create a gif using the images inside the GIF folder." type="button" id="gif-btn" class="svelte-1p2fghn">Convert image sequence to gif</button></div>

<form id="form-div" class="svelte-1p2fghn"><div class="svelte-1p2fghn"><button title="Save configuration parameters inside config.json" class=" svelte-1p2fghn" id="config-btn" type="submit">Save Configuration File</button>
		<textarea id="config-ta" rows="10" class="svelte-1p2fghn"></textarea></div>

	<h2 class="svelte-1p2fghn"># of Answer Sets</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><input id="sol-in" type="number" min="1" value="1" required class="svelte-1p2fghn"></div>

	<h2 class="svelte-1p2fghn">Solver path</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><textarea id="solver-ta" required class="svelte-1p2fghn"></textarea>
		<button title="The DLV Solver file path." type="button" id="solver-btn" class="svelte-1p2fghn">Solver Executable</button></div>

	<h2 class="svelte-1p2fghn">Program file</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><textarea id="program-ta" required class="svelte-1p2fghn"></textarea>
		<button title="The ASP program file path." type="button" id="program-btn" class="svelte-1p2fghn">Program Path</button></div>

	<h2 class="svelte-1p2fghn">Output Directory</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><textarea id="output-ta" required class="svelte-1p2fghn"></textarea>
		<button title="The path in which output files will be saved." type="button" id="output-btn" class="svelte-1p2fghn">Output Directory</button></div>

	<h2 class="svelte-1p2fghn">Chrome Executable</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><textarea id="chrome-ta" required class="svelte-1p2fghn"></textarea>
		<button title="The path for the Chromium Browser executable." type="button" id="chrome-btn" class="svelte-1p2fghn">Chromium Based Browser Executable</button></div>

	<h2 class="svelte-1p2fghn">Template file</h2>
	<h5 class="svelte-1p2fghn">required</h5>

	<div class="svelte-1p2fghn"><textarea id="template-ta" required class="svelte-1p2fghn"></textarea>
		<button title="The path for the ASP Visualizer configuration file. (Tip: Generate it through the extension panel)" type="button" id="template-btn" class="svelte-1p2fghn">Template File</button></div>

	<h2 class="svelte-1p2fghn">Image Directory</h2>
	<h5 class="svelte-1p2fghn">image matrix, optional</h5>

	<div class="svelte-1p2fghn"><button title="The path for the images that will be used for the Matrix(Image) visualization." type="button" id="image-btn" class="svelte-1p2fghn">Image Resources Directory</button>
		<textarea id="image-ta" class="svelte-1p2fghn"></textarea></div>
</form>


		<script type="module" data-sveltekit-hydrate="1qv1kuq">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"assets":"","base":""},
				target: document.querySelector('[data-sveltekit-hydrate="1qv1kuq"]').parentNode,
				version: "1674925389964",
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