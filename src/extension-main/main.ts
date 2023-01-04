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

  let cfg = vscode.commands.registerCommand("asp-vis.execute", () => {
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
    //run a task to convert the images to a video
    const task = new vscode.Task(
      { type: "ffmpeg" },
      vscode.TaskScope.Workspace,
      "convert",
      "ffmpeg",
      new vscode.ShellExecution("ffmpeg -r 1 -i 0_%d.png answer_set.gif -y", {
        cwd: path.join(__dirname, "..", "out", "output_files"),
      })
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

  let pong = vscode.commands.registerCommand(
    "asp-vis.sayHello",
    webview_provider.respond
  );

  context.subscriptions.push(disposable, convert, wrapper, cfg, pong, webview);
}

export function deactivate() {
  console.log("deactivated");
}
