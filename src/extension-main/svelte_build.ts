import * as vscode from 'vscode';
export function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {const global_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, 'global.css'));const _page_css = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'assets', '_page-a5c114d0.css'));const start_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'start-37ba24ac.js'));const index_1_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-cfceb4e3.js'));const singletons_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'singletons-3ec860b4.js'));const index_2_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', 'index-d4076a17.js'));const layout_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'layout.svelte-6a995481.js'));const _layout_ts_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'modules', 'pages', '_layout.ts-55770e65.js'));const _layout_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'chunks', '_layout-025914ab.js'));const _page_svelte_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, '_app', 'immutable', 'components', 'pages', '_page.svelte-d6618ce5.js'));const main_js = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "main.js"));
return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="./favicon.png" />
		<link rel="stylesheet" href="./global.css" />
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="content-security-policy" content="">
		<link href="./_app/immutable/assets/_page-a5c114d0.css" rel="stylesheet">
		<link rel="modulepreload" href="./_app/immutable/start-37ba24ac.js">
		<link rel="modulepreload" href="./_app/immutable/chunks/index-cfceb4e3.js">
		<link rel="modulepreload" href="./_app/immutable/chunks/singletons-3ec860b4.js">
		<link rel="modulepreload" href="./_app/immutable/chunks/index-d4076a17.js">
		<link rel="modulepreload" href="./_app/immutable/components/layout.svelte-6a995481.js">
		<link rel="modulepreload" href="./_app/immutable/modules/pages/_layout.ts-55770e65.js">
		<link rel="modulepreload" href="./_app/immutable/chunks/_layout-025914ab.js">
		<link rel="modulepreload" href="./_app/immutable/components/pages/_page.svelte-d6618ce5.js">
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">


<textarea id="code" class="svelte-8ve48e"></textarea>

<select name="template" id="template" class="svelte-8ve48e"><option value="none" selected>Choose a template</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>

<button id="render" style="display: none;">Render Answer Set</button>

<center><h2 class="svelte-6teu96">Select a template to start</h2>
</center>


		<script type="module" data-sveltekit-hydrate="1d3ju54">
			import { start } from "./_app/immutable/start-37ba24ac.js";

			start({
				env: {},
				paths: {"base":"","assets":""},
				target: document.querySelector('[data-sveltekit-hydrate="1d3ju54"]').parentNode,
				version: "1672648342508",
				hydrate: {
					node_ids: [0, 2],
					data: [null,null],
					form: null
				}
			});
		</script>
	</div>
	</body>
</html>
`;}