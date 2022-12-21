import path = require("path");
import process = require("process");
import * as vscode from "vscode";
import { callNode } from "../visualizer-integrator/visualizer";

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
        prompt: "Enter the tyep of visualization you want to see",
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

  context.subscriptions.push(disposable);
  context.subscriptions.push(time);
  context.subscriptions.push(wrapper);
}

export function deactivate() {
  console.log("deactivated");
}
