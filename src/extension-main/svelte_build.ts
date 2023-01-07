import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-e6abbf30.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-ffa697c1.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-4864de32.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-f241056d.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-ca760e77.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-bddc0508.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-070df6f0.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-af12d980.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-ecdfd314.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
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

<select name="template" class="svelte-8ve48e"><option value="none" selected>Settings</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>

<button id="save-btn" style="display: none;">Save Template File</button>

<center><h1>Settings</h1></center>

<form class="svelte-vj96q"><div class="svelte-vj96q"><button id="run-btn" type="submit">Run using config file</button></div>

	<h2># of Answer Sets</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><input id="sol-in" type="number" min="1" value="1" required class="svelte-vj96q"></div>

	<h2>Solver path</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><button id="solver-btn">Solver Executable</button>
		<textarea id="solver-ta" required class="svelte-vj96q"></textarea></div>

	<h2>Program file</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><button id="program-btn">Program Path</button>
		<textarea id="program-ta" required class="svelte-vj96q"></textarea></div>

	<h2>Output Directory</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><button id="output-btn">Output Directory</button>
		<textarea id="output-ta" required class="svelte-vj96q"></textarea></div>

	<h2>Chrome Executable</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><button id="chrome-btn">Chromium Based Browser Executable</button>
		<textarea id="chrome-ta" required class="svelte-vj96q"></textarea></div>

	<h2>Template file</h2>
	<h5 class="svelte-vj96q">required</h5>

	<div class="svelte-vj96q"><button id="template-btn">Template File</button>
		<textarea id="template-ta" required class="svelte-vj96q"></textarea></div>

	<h2>Image Directory</h2>
	<h5 class="svelte-vj96q">image matrix, optional</h5>

	<div class="svelte-vj96q"><button id="image-btn">Image Resources Directory</button>
		<textarea id="image-ta" class="svelte-vj96q"></textarea></div>

	<div class="svelte-vj96q"><button id="config-btn" type="submit" class="svelte-vj96q">Save Configuration File</button>
		<textarea id="config-ta" rows="10" class="svelte-vj96q"></textarea></div>
</form>


		<script type="module" data-sveltekit-hydrate="1g46jzg">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"base":"","assets":""},
				target: document.querySelector('[data-sveltekit-hydrate="1g46jzg"]').parentNode,
				version: "1673084728384",
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