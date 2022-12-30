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
        case "ping": {
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
    // Local path to scripts run in the webview
    const start_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "start-8f259a8e.js"
      )
    );

    const index_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "chunks",
        "index-b39776cc.js"
      )
    );

    const singletons_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "chunks",
        "singletons-8e60f9f9.js"
      )
    );

    const layout_svelte_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "components",
        "layout.svelte-031b767c.js"
      )
    );

    const _layout_ts_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
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
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "chunks",
        "_layout-025914ab.js"
      )
    );

    const _page_svelte_js = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "_app",
        "immutable",
        "components",
        "pages",
        "_page.svelte-fc64316c.js"
      )
    );

    // Local path to css styles
    const global = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "src",
        "extension-main",
        "res",
        "build",
        "global.css"
      )
    );

    // Use a nonce to only allow specific scripts to be run
    // const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="${global}" />
        <meta name="viewport" content="width=device-width" />
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
    
    
    <select name="template" id="template"><option value="graph" selected>graph</option><option value="table">table</option><option value="matrix">matrix</option><option value="images">matrix images</option></select>
    
    <h1>Graph</h1>
    
    <button>Add Node</button>
    <button>Add Edge</button>
    
    <div>
            <div><h2>Node:</h2>
        <div><p>name</p>
            <input type="text" name="name" value="node">
            <button>+</button>
            <p>Arguments</p>
                <div><input type="text" name="variable" value="arg1">
                        <button>remove</button>    
                    </div></div>
        <div><div><label for="root">root</label><input type="color" name="root" value="#FF0000"></div>
            <div><label for="leaves">leaves</label><input type="color" name="leaves" value="#00FF00"></div>
            <div><label for="nonroot">Non Root</label><input type="color" name="non" value="#0000FF"></div></div></div>
        </div>
        
    <div>
            <div><h2>Edge</h2>
        <div><p>name</p>
            <input type="text" name="name" value="edge">
            <button>+</button>
            <p>Arguments</p>
                <div><input type="text" name="variable" value="arg1">
                        <button>remove</button>    
                    </div></div>
        <div><div><label for="root">root</label><input type="color" name="root" value="#FF0000"></div>
            <div><label for="oriented">oriented?</label><input type="checkbox" name="oriented"></div></div></div>
        </div>
    
    
        <script type="module" data-sveltekit-hydrate="8mm6q6">
          import { start } from "${start_js}";
    
          start({
            env: {},
            paths: {"base":"","assets":""},
            target: document.querySelector('[data-sveltekit-hydrate="8mm6q6"]').parentNode,
            version: "1672375087509",
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

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}