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
        "start-de539c50.js"
      )
    );

    const index_js_1 = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "index-0e60804f.js"
      )
    );

    const index_js_2 = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "index-0cfed5b3.js"
      )
    );

    const singletons_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "chunks",
        "singletons-01081e7b.js"
      )
    );

    const layout_svelte_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "components",
        "layout.svelte-42b03c3f.js"
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
        "_page.svelte-df2fc0e3.js"
      )
    );

    const _page_css = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "_app",
        "immutable",
        "assets",
        "_page-12e27aba.css"
      )
    );

    const global = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "global.css")
    );

    const main_js = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "main.js")
    );

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="content-security-policy" content="">
        <link rel="stylesheet" href="${global}" />
        <link rel="stylesheet" href="${_page_css}">
        <link rel="modulepreload" href="${start_js}">
        <link rel="modulepreload" href="${index_js_1}">
        <link rel="modulepreload" href="${index_js_2}">
        <link rel="modulepreload" href="${singletons_js}">
        <link rel="modulepreload" href="${layout_svelte_js}">
        <link rel="modulepreload" href="${_layout_ts_js}">
        <link rel="modulepreload" href="${_layout_js}">
        <link rel="modulepreload" href="${_page_svelte_js}">
      </head>
      <body data-sveltekit-preload-data="hover">
        <div style="display: contents">
    
    
    <textarea id="code" class="svelte-19vus7a"></textarea>
    
    <select name="template" id="template" class="svelte-19vus7a"><option value="none">Choose a template</option><option value="graph">Graph</option><option value="table">Table</option><option value="matrix">Matrix</option><option value="images" selected>Matrix (images)</option></select>
    
    <button id="render">Render Answer Set</button>
    
    <p>Matrix with Images</p>
    
    
        <script type="module" data-sveltekit-hydrate="zq4bav">
          import { start } from "${start_js}";
    
          start({
            env: {},
            paths: {"base":"","assets":""},
            target: document.querySelector('[data-sveltekit-hydrate="zq4bav"]').parentNode,
            version: "1672457619525",
            hydrate: {
              node_ids: [0, 2],
              data: [null,null],
              form: null
            }
          });
        </script>
        <script src="${main_js}"></script>
      </div>
      </body>
    </html>`;
  }
}
