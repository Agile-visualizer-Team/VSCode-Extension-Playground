import * as vscode from "vscode";
import { getHtmlForWebview } from "./svelte_build";

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

    webviewView.webview.html = getHtmlForWebview(webviewView.webview, this._extensionUri);

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
}
