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

    webviewView.webview.html = getHtmlForWebview(
      webviewView.webview,
      this._extensionUri
    );

    webviewView.webview.onDidReceiveMessage(async (data) => {
      let value: vscode.Uri[] | undefined;

      switch (data.type) {
        case "gif":
          const wsf = vscode.workspace.workspaceFolders;
          if (!wsf) {
            return;
          }

          vscode.commands
            .executeCommand("asp-vis.ffmpeg", wsf[0].uri)
            .then((a) => {
              vscode.window.showInformationMessage("GIF created at: " + a);
            });

        case "save":
        case "config":
          console.log(data.value);
          vscode.commands.executeCommand("asp-vis." + data.type, data.value);
          break;

        case "run":
          vscode.commands.executeCommand("asp-vis.execute");
          break;

        case "output":
        case "image":
          value = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: false,
            canSelectFolders: true,
            openLabel: "Select directory",
          });

          if (value) {
            this._view?.webview.postMessage({
              type: data.type + "-back",
              value: value[0].fsPath,
            });
          }
          break;

        default:
          value = await vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: true,
            canSelectFolders: false,
            openLabel: "Select a file",
          });

          if (value) {
            this._view?.webview.postMessage({
              type: data.type + "-back",
              value: value[0].fsPath,
            });
          }
          break;
      }
    });
  }
}
