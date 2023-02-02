import fs = require("fs");
import path = require("path");
import * as vscode from "vscode";
import process = require("process");
import { WebviewView } from "./webview";
import { callNode } from "../visualizer-integrator/visualizer";
import {
  check_folder,
  check_workspace,
  create_gif_script,
  read_config,
} from "./check_workspace";
import { spawn } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  if (!check_workspace()) {
    return;
  }
  check_folder();

  const config = vscode.commands.registerCommand("asp-vis.config", (arg) => {
    if (vscode.workspace.workspaceFolders) {
      const folder = vscode.workspace.workspaceFolders[0];
      const path = vscode.Uri.joinPath(folder.uri, "asp-vis", "config.json");
      const data = Buffer.from(arg, "utf8");

      vscode.workspace.fs.writeFile(path, data).then(() => {
        vscode.window.showInformationMessage(
          "Configuration file saved\n" + path.fsPath
        );
      });
    }
  });

  const save = vscode.commands.registerCommand("asp-vis.save", (arg) => {
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
        });
    }
  });

  const exec = vscode.commands.registerCommand("asp-vis.execute", () => {
    read_config();

    let template: string = process.env.TEMPLATE || "";
    let program: string = process.env.PROGRAM || "";
    let solver: string = process.env.SOLVER || "";
    let sol: number = Number.parseInt(process.env.SOL_NUM || "1", 10);
    let out: string = process.env.OUT_DIR || "";
    let img: string = process.env.IMG_DIR || "";

    callNode(template, program, solver, sol, out, img);
  });

  const convert = vscode.commands.registerCommand("asp-vis.ffmpeg", () => {
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
    const script = path.join(wsf[0].uri.fsPath, "asp-vis", cmd);

    if (!fs.existsSync(script)) {
      if (vscode.workspace.workspaceFolders !== undefined) {
        let folder = vscode.workspace.workspaceFolders[0];
        let folder_path = folder.uri.fsPath;
        let asp_vis_folder = path.join(folder_path, "asp-vis");

        create_gif_script(asp_vis_folder);
      }
    }

    let child;

    // run a script to create a gif with child_process
    if (process.platform === "win32") {
      child = spawn("powershell.exe", ["-Command", script], {
        cwd: path.join(process.env.OUT_DIR, "gif"),
      });
    } else {
      child = spawn(script, {
        cwd: path.join(process.env.OUT_DIR, "gif"),
      });
    }

    child.on("close", (code) => {
      if (code === 0) {
        vscode.window.showInformationMessage("Gif created");
      } else {
        vscode.window.showErrorMessage("Something went wrong");
      }
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

  return args.length === uniques.length;
}
