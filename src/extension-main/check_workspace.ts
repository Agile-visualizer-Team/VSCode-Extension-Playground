import fs = require("fs");
import path = require("path");
import process = require("process");
import * as vscode from "vscode";

export function check_workspace() {
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

export function check_folder() {
  if (vscode.workspace.workspaceFolders !== undefined) {
    let folder = vscode.workspace.workspaceFolders[0];
    let folder_path = folder.uri.fsPath;
    let asp_vis_folder = path.join(folder_path, "asp-vis");

    if (!fs.existsSync(asp_vis_folder)) {
      handle_folder_creation(asp_vis_folder);
    }
  }
}

export function read_config() {
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
