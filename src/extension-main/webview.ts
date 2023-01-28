import * as vscode from "vscode";
import { getHtmlForWebview } from "./svelte_build";
import path = require("path");
import { readFileSync, existsSync } from "fs";
import { createFolder } from "./check_workspace";
export class WebviewView implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(readonly _extensionUri: vscode.Uri) { }

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


        case "folder":
          console.log("folder");
          if (vscode.workspace.workspaceFolders !== undefined) {
            let folder = vscode.workspace.workspaceFolders[0];
            let folder_path = folder.uri.fsPath;
            let asp_vis_folder = path.join(folder_path, "asp-vis");

            //If already exists, does nothing
            createFolder(asp_vis_folder);


            this._view?.webview.postMessage({
              type: "folder_check",
              value: existsSync(asp_vis_folder),
            });

          }
          break;

        case "read_config":
          let config = JSON.parse("{}");

          //Reading config json to setup the inputs as marked
          if (vscode.workspace.workspaceFolders !== undefined) {
            let folder = vscode.workspace.workspaceFolders[0];
            let folder_path = folder.uri.fsPath;
            let asp_vis_folder = path.join(folder_path, "asp-vis");
            let config_file = path.join(asp_vis_folder, "config.json");
            config = JSON.parse(readFileSync(config_file, "utf8"));
          }

          this._view?.webview.postMessage({
            type: "config_value",
            value: config,
          });

          break;

        case "gif":
          const wsf = vscode.workspace.workspaceFolders;
          if (!wsf) {
            return;
          }
          vscode.commands.executeCommand("asp-vis.ffmpeg", wsf[0].uri);
          return;

        case "save":
        case "config":   
          vscode.commands.executeCommand("asp-vis." + data.type, data.value);
        
          break;

        case "run":
          //handle errors
          try {
            await vscode.commands.executeCommand("asp-vis.execute");
          } catch (error: any) {
            vscode.window.showErrorMessage(error.message);
          }

          //Alex code I do not remove it because I don't want to get in fight with him
          //vscode.commands.executeCommand("asp-vis.execute");
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
