import fs = require("fs");
import path = require("path");
import process = require("process");
import * as vscode from "vscode";
import { callNode } from "../visualizer-integrator/visualizer";

function check_workspace() {
  if (vscode.workspace.workspaceFolders !== undefined) {
    return true;
  } else {
    vscode.window
      .showErrorMessage("No workspace opened", "open folder", "cancel")
      .then((val) => {
        switch (val) {
          case "open folder":
            vscode.commands.executeCommand("vscode.openFolder");
            break;
          case "cancel":
            vscode.window.showErrorMessage(
              "ASP Visualizer cannot work without a workspace"
            );
            return false;
        }
        return check_workspace();
      });
  }
}

function handle_folder_creation(asp_vis_folder: string) {
  vscode.window
    .showInformationMessage(
      "ASP Visualizer folder not found",
      "create folder",
      "ignore"
    )
    .then((val) => {
      switch (val) {
        case "create folder":
          fs.mkdirSync(asp_vis_folder);
          read_config();
          break;
        case "ignore":
          vscode.window.showErrorMessage(
            "ASP Visualizer will not work without a local folder"
          );
          break;
      }
    });
}

function check_folder() {
  if (vscode.workspace.workspaceFolders !== undefined) {
    let folder = vscode.workspace.workspaceFolders[0];
    let folder_path = folder.uri.fsPath;
    let asp_vis_folder = path.join(folder_path, "asp-vis");

    if (!fs.existsSync(asp_vis_folder)) {
      handle_folder_creation(asp_vis_folder);
    }
  }
}

function read_config() {
  //check to see if it exists a .config file
  if (vscode.workspace.workspaceFolders === undefined) {
    return; // altrimenti caca il cazzo
  }

  let folder = vscode.workspace.workspaceFolders[0];
  let folder_path = folder.uri.fsPath;
  let config_file = path.join(folder_path, "asp-vis", "config.json");

  if (fs.existsSync(config_file)) {
    // read the config file and set the variables
    let config = JSON.parse(fs.readFileSync(config_file, "utf8"));
    process.env.SOL_NUM = config.sol_num;
    process.env.SOLVER = config.solver;
    process.env.TEMPLATE = config.template;
    process.env.PROGRAM = config.program;
    process.env.OUT_DIR = config.out_dir;
    process.env.IMG_DIR = config.img_dir;
    process.env.CHROME_PATH = config.chrome;
  } else {
    // write a json file with the default values
    let base = path.join(folder_path, "asp-vis");
    let default_config = {
      sol_num: 1,
      solver: path.join(base, "dlv2_win.exe"),
      template: path.join(base, "template.json"),
      program: path.join(base, "program.asp"),
      out_dir: path.join(base, "out"),
      img_dir: path.join(base, "images"),
      chrome: path.join(
        "c:\\",
        "Program Files",
        "Google",
        "Chrome",
        "Application",
        "chrome.exe"
      ),
    };
    fs.writeFileSync(config_file, JSON.stringify(default_config));
  }
}

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

  context.subscriptions.push(disposable);
  context.subscriptions.push(convert);
  context.subscriptions.push(wrapper);
  context.subscriptions.push(cfg);
}

export function deactivate() {
  console.log("deactivated");
}
