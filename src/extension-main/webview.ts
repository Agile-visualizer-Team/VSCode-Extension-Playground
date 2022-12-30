import * as vscode from "vscode";

export class WebviewView implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "hello": {
          console.log("webview said: " + data.value);
          this.respond();
          break;
        }
      }
    });
  }

  public respond() {
    if (this._view) {
      this._view.webview.postMessage({ type: "pong", value: "pong" });
    }
  }

  getHtmlForWebview(webview: vscode.Webview): string {
    const start_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "start-3a3619f5.js"
      )
    );

    const index_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "index-b39776cc.js"
      )
    );

    const singletons_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "singletons-8e60f9f9.js"
      )
    );

    const layout_svelte_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "components",
        "layout.svelte-031b767c.js"
      )
    );

    const _layout_ts_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "modules",
        "pages",
        "_layout.ts-55770e65.js"
      )
    );

    const _layout_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "_layout-025914ab.js"
      )
    );

    const _page_svelte_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "components",
        "pages",
        "_page.svelte-ca2cae5a.js"
      )
    );

    const _page_css = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "assets",
        "_page-ad855294.css"
      )
    );

    // Local path to css styles
    const global = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "global.css")
    );

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="${global}" />
        <link href="${_page_css}" rel="stylesheet">
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="content-security-policy" content="">
        <link rel="modulepreload" href="${start_js}">
        <link rel="modulepreload" href="${index_js}">
        <link rel="modulepreload" href="${singletons_js}">
        <link rel="modulepreload" href="${layout_svelte_js}">
        <link rel="modulepreload" href="${_layout_ts_js}">
        <link rel="modulepreload" href="${_layout_js}">
        <link rel="modulepreload" href="${_page_svelte_js}">
      </head>
      <body data-sveltekit-preload-data="hover">
        <div style="display: contents">
    <select name="template" id="template" class="svelte-tayc8f"><option value="none" selected>Choose a template</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images">Matrix (images)</option></select>
    <h2 class="svelte-6teu96">Select a template to start</h2>
     <script type="module" data-sveltekit-hydrate="3l9wfh">
          import { start } from "${start_js}";
          start({
            env: {},
            paths: {"base":"","assets":""},
            target: document.querySelector('[data-sveltekit-hydrate="3l9wfh"]').parentNode,
            version: "1672382730925",
            hydrate: {
              node_ids: [0, 2],
              data: [null,null],
              form: null
            }
          });
        </script>
      </div>
      </body>
    </html>`;
  }
}
