import { spawn, spawnSync } from "child_process";
import path = require("path");
import process = require("process");
import * as vscode from "vscode";
import { callNode } from "../visualizer-integrator/visualizer";
import { check_workspace, check_folder, read_config } from "./check_workspace";
import { WebviewView } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  if (!check_workspace()) {
    return;
  }
  check_folder();
  console.log('Congratulations, "ASP Visualizer" is now active!');

  let disposable = vscode.commands.registerCommand("asp-vis.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World");
  });

  let config = vscode.commands.registerCommand("asp-vis.config", (arg) => {
    if (vscode.workspace.workspaceFolders) {
      const folder = vscode.workspace.workspaceFolders[0];
      const path = vscode.Uri.joinPath(folder.uri, "asp-vis", "config.json");
      const data = Buffer.from(arg, "utf8");

      vscode.workspace.fs.writeFile(path, data).then(() => {
        vscode.window.showInformationMessage("Config file saved at " + path);
      });
    }
  });

  let save = vscode.commands.registerCommand("asp-vis.save", (arg) => {
    let template: string = "";
    template = JSON.parse(arg)["template"];

    vscode.window
      .showInputBox({
        prompt: "Enter the filename of the template file",
        placeHolder: template + ".json",
      })
      .then((value) => {
        if (value && vscode.workspace.workspaceFolders) {
          const folder = vscode.workspace.workspaceFolders[0];
          const path = vscode.Uri.joinPath(folder.uri, "asp-vis", value);
          const data = Buffer.from(arg, "utf8");

          vscode.workspace.fs.writeFile(path, data).then(() => {
            vscode.window.showInformationMessage("Template saved at " + path);
          });
        }
      });
  });

  let exec = vscode.commands.registerCommand("asp-vis.execute", () => {
    read_config();

    let template: string = process.env.TEMPLATE || "";
    let program: string = process.env.PROGRAM || "";
    let solver: string = process.env.SOLVER || "";
    let sol: number = Number.parseInt(process.env.SOL_NUM || "1", 10);
    let out: string = process.env.OUT_DIR || "";
    let img: string = process.env.IMG_DIR || "";

    callNode(template, program, solver, sol, out, img);
  });

  let wrapper = vscode.commands.registerCommand("asp-vis.wrapper", () => {
    const base = path.join(__dirname, "..", "src", "sample-files");

    let sol_num: number = 1;
    let template: string = "";
    let program: string = "";
    let solver: string = path.join(base, "dlv2_win.exe");
    let out_dir: string = path.join(__dirname, "..", "out");
    let img_dir: string = path.join(base, "images");

    // show an input field from vscode and check the input
    vscode.window
      .showInputBox({
        prompt: "Enter the type of visualization you want to see",
        placeHolder: "matrix, table, images, graph",
      })
      .then((value) => {
        switch (value) {
          case "matrix":
            template = path.join(base, "matrix.json");
            program = path.join(base, "matrix.asp");
            break;
          case "table":
            template = path.join(base, "table.json");
            program = path.join(base, "matrix.asp");
            break;
          case "images":
            template = path.join(base, "images.json");
            program = path.join(base, "images.asp");
            break;
          case "graph":
            template = path.join(base, "graph.json");
            program = path.join(base, "3col.asp");
            break;
          default:
            console.log("no available visualization for this kind :(");
            return;
        }
        callNode(template, program, solver, sol_num, out_dir, img_dir);
      });
  });

  let convert = vscode.commands.registerCommand("asp-vis.ffmpeg", () => {
    read_config();

    if (!process.env.OUT_DIR) {
      vscode.window.showErrorMessage("No output directory specified");
      return;
    }

    const wsf = vscode.workspace.workspaceFolders;
    if (!wsf) {
      return;
    }

    const task = new vscode.Task(
      { type: "ffmpeg" },
      vscode.TaskScope.Workspace,
      "convert",
      "ffmpeg",
      new vscode.ShellExecution(
        path.join(wsf[0].uri.fsPath, "asp-vis", "gif.ps1"),
        {
          cwd: path.join(process.env.OUT_DIR, "gif"),
        }
      )
    );

    vscode.tasks.executeTask(task);
  });

  const webview_provider = new WebviewView(
    vscode.Uri.joinPath(
      context.extensionUri,
      "src",
      "extension-main",
      "res",
      "build"
    )
  );

  const webview = vscode.window.registerWebviewViewProvider(
    "asp-vis.webview",
    webview_provider
  );

  context.subscriptions.push(
    disposable,
    save,
    config,
    convert,
    wrapper,
    exec,
    webview
  );
}

export function deactivate() {
  console.log("deactivated");
}
