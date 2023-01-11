import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-5ff138dd.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-54fda38d.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-ab7f3f50.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-c5682e71.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-226f0dfd.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-756d04dc.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-070df6f0.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-af12d980.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-7b79e486.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
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

<button id="save-btn" style="display:none">Save Template File</button>

<center><h1>Settings</h1></center>

<div class="svelte-1rjg5gt"><button type="button" id="run-btn" class="svelte-1rjg5gt">Run using config file</button></div>
<div class="svelte-1rjg5gt"><button type="button" id="gif-btn" class="svelte-1rjg5gt">Convert image sequence to gif</button></div>

<form class="svelte-1rjg5gt"><div class="svelte-1rjg5gt"><button id="config-btn" type="submit" class="svelte-1rjg5gt">Save Configuration File</button>
		<textarea id="config-ta" rows="10" class="svelte-1rjg5gt"></textarea></div>

	<h2># of Answer Sets</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><input id="sol-in" type="number" min="1" value="1" required class="svelte-1rjg5gt"></div>

	<h2>Solver path</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><textarea id="solver-ta" required class="svelte-1rjg5gt"></textarea>
		<button type="button" id="solver-btn" class="svelte-1rjg5gt">Solver Executable</button></div>

	<h2>Program file</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><textarea id="program-ta" required class="svelte-1rjg5gt"></textarea>
		<button type="button" id="program-btn" class="svelte-1rjg5gt">Program Path</button></div>

	<h2>Output Directory</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><textarea id="output-ta" required class="svelte-1rjg5gt"></textarea>
		<button type="button" id="output-btn" class="svelte-1rjg5gt">Output Directory</button></div>

	<h2>Chrome Executable</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><textarea id="chrome-ta" required class="svelte-1rjg5gt"></textarea>
		<button type="button" id="chrome-btn" class="svelte-1rjg5gt">Chromium Based Browser Executable</button></div>

	<h2>Template file</h2>
	<h5 class="svelte-1rjg5gt">required</h5>

	<div class="svelte-1rjg5gt"><textarea id="template-ta" required class="svelte-1rjg5gt"></textarea>
		<button type="button" id="template-btn" class="svelte-1rjg5gt">Template File</button></div>

	<h2>Image Directory</h2>
	<h5 class="svelte-1rjg5gt">image matrix, optional</h5>

	<div class="svelte-1rjg5gt"><button type="button" id="image-btn" class="svelte-1rjg5gt">Image Resources Directory</button>
		<textarea id="image-ta" class="svelte-1rjg5gt"></textarea></div>
</form>


		<script type="module" data-sveltekit-hydrate="16dt1li">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"base":"","assets":""},
				target: document.querySelector('[data-sveltekit-hydrate="16dt1li"]').parentNode,
				version: "1673458502557",
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