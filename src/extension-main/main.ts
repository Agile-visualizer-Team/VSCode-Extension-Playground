import path = require("path");
import * as vscode from "vscode";
import process = require("process");
import { WebviewView } from "./webview";
import { callNode } from "../visualizer-integrator/visualizer";
import { check_folder, check_workspace, read_config } from "./check_workspace";

export function activate(context: vscode.ExtensionContext) {
  if (!check_workspace()) {
    return;
  }
  check_folder();

  console.log('Congratulations, "ASP Visualizer" is now active!');

  let config = vscode.commands.registerCommand("asp-vis.config", (arg) => {
    if (vscode.workspace.workspaceFolders) {
      const folder = vscode.workspace.workspaceFolders[0];
      const path = vscode.Uri.joinPath(folder.uri, "asp-vis", "config.json");
      const data = Buffer.from(arg, "utf8");

      console.log(data);

      vscode.workspace.fs.writeFile(path, data).then(() => {
        vscode.window.showInformationMessage(
          "Config file saved at " + path.fsPath
        );
      });
    }
  });

  let save = vscode.commands.registerCommand("asp-vis.save", (arg) => {
    let template: string = "";
    let config = JSON.parse(arg);
    template = config["template"];

    let validArgs = true;

    if (template === "graph") {
      config.nodes.forEach((node: any) => {
        if (!checkUniqueness(node!.atom.variables)) {
          vscode.window.showErrorMessage(
            "The variables of the nodes must be unique"
          );
          validArgs = false;
        }
      });
      config.edges.forEach((edge: any) => {
        if (!checkUniqueness(edge!.atom.variables)) {
          vscode.window.showErrorMessage(
            "The variables of the edges must be unique"
          );
          validArgs = false;
        }
      });
    }

    if (validArgs) {
      vscode.window
        .showInputBox({
          prompt: "Enter the filename of the template file",
          placeHolder: template + ".json",
          value: template + ".json",
        })
        .then((value) => {
          if (value && vscode.workspace.workspaceFolders) {
            const folder = vscode.workspace.workspaceFolders[0];
            const path = vscode.Uri.joinPath(folder.uri, "asp-vis", value);
            const data = Buffer.from(arg, "utf8");

            vscode.workspace.fs.writeFile(path, data);
          }
          vscode.commands.executeCommand("workbench.view.explorer");
        });
    }
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

  let convert = vscode.commands.registerCommand("asp-vis.ffmpeg", () => {
    read_config();

    if (!process.env.OUT_DIR) {
      vscode.window.showErrorMessage("No output directory specified");
      return "";
    }

    const wsf = vscode.workspace.workspaceFolders;
    if (!wsf) {
      return "";
    }

    const cmd = process.platform === "win32" ? "gif.ps1" : "gif.sh";

    const task = new vscode.Task(
      { type: "ffmpeg" },
      vscode.TaskScope.Workspace,
      "convert",
      "ffmpeg",
      new vscode.ShellExecution(path.join(wsf[0].uri.fsPath, "asp-vis", cmd), {
        cwd: path.join(process.env.OUT_DIR, "gif"),
      })
    );

    vscode.tasks.executeTask(task).then(() => {
      vscode.window.showInformationMessage(
        "GIF created at: " + path.join(process.env.OUT_DIR || "", "gif")
      );
    });

    return path.join(process.env.OUT_DIR || "", "gif");
  });

  const webview_provider = new WebviewView(
    vscode.Uri.joinPath(context.extensionUri, "dist", "svelte")
  );

  const webview = vscode.window.registerWebviewViewProvider(
    "asp-vis.webview",
    webview_provider
  );

  context.subscriptions.push(save, config, convert, exec, webview);
}

export function deactivate() {
  console.log("deactivated");
}

function checkUniqueness(args: string[]) {
  let uniques: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (!uniques.includes(args[i])) {
      uniques.push(args[i]);
    }
  }
  console.log(uniques, args);

  return args.length === uniques.length;
}
