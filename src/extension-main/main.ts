import path = require("path");
import * as vscode from "vscode";
import MatrixCreator from "./matrix_module";
import { callNode } from "../visualizer-integrator/visualizer";
process = require("process");

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, "ASP Visualizer" is now active!');

  //create a new env variable CHROME_PATH used for puppeteer to save the matrix
  process.env.CHROME_PATH = path.join(
    "C:",
    "Program Files",
    "Google",
    "Chrome",
    "Application",
    "chrome.exe"
  );
  console.log(process.env.CHROME_PATH);

  const watcher = vscode.workspace.createFileSystemWatcher("**/*matrix_0.png");
  watcher.onDidCreate((uri) => {
    console.log(`File ${uri} has been created`);
    vscode.commands.executeCommand("vscode.open", uri, { preview: false });
  });

  let disposable = vscode.commands.registerCommand("asp-vis.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World");
  });

  let time = vscode.commands.registerCommand("asp-vis.time.current", () => {
    //show a popup box with the current time
    var date = new Date();
    var time = date.toLocaleTimeString();
    vscode.window.showWarningMessage("The time is " + time);
  });

  let wrapper = vscode.commands.registerCommand("asp-vis.wrapper", () => {
    let solver_path: string;
    let program: string;
    let as_number: number = 1;
    let out_template: string;
    let out_dir: string;

    const base_path = path.join(
      "D:",
      "AlexFazio64",
      "Dev",
      "js",
      "VSCode-Extension-Playground",
      "src",
      "sample-files"
    );

    solver_path = path.join(base_path, "dlv2_win.exe");
    program = path.join(base_path, "3col.asp");
    out_dir = base_path;

    callNode("", program, solver_path, as_number, out_dir);
  });

  let matrix = vscode.commands.registerCommand("asp-vis.cmd", () =>
    //save an image to Downloads folder
    new MatrixCreator().run_script()
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(time);
  context.subscriptions.push(matrix);
  context.subscriptions.push(wrapper);
}

export function deactivate() {
  console.log("deactivated");
}
