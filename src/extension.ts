import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // CTRL + SHIFT + I to open the developer tools
  console.log('Congratulations, "hello-extension" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The command parameter must match the command field and the onCommand field in package.json 
  let disposable = vscode.commands.registerCommand(
    "hello-extension.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World");
    }
  );
  let time = vscode.commands.registerCommand(
    "hello-extension.time.current",
    () => {
      //show a popup box with the current time
      var date = new Date();
      var time = date.toLocaleTimeString();
      vscode.window.showWarningMessage("The time is " + time);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(time);
}

export function deactivate() {
  console.log("deactivated");
}
