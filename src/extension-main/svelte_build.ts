import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-a5c114d0.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-37ba24ac.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-cfceb4e3.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-3ec860b4.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-d4076a17.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-6a995481.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-55770e65.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-025914ab.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-d6618ce5.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
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

<select name="template" id="template" class="svelte-8ve48e"><option value="none" selected>Choose a template</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>

<button id="render" style="display: none;">Render Answer Set</button>

<center><h2 class="svelte-6teu96">Select a template to start</h2>
</center>


		<script type="module" data-sveltekit-hydrate="1d3ju54">
			import { start } from "${start_js}";

			start({
				env: {},
				paths: {"base":"","assets":""},
				target: document.querySelector('[data-sveltekit-hydrate="1d3ju54"]').parentNode,
				version: "1672653330198",
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