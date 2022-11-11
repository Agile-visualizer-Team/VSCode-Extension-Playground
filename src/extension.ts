import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, "hello-extension" is now active!');
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
