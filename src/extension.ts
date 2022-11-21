import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, "hello-extension" is now active!');

  const watcher = vscode.workspace.createFileSystemWatcher("**/*matrix_0.png");
  watcher.onDidCreate((uri) => {
    console.log(`File ${uri} has been created`);
    vscode.commands.executeCommand("vscode.open", uri, { preview: false });
  });

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

  let matrix = vscode.commands.registerCommand("hello-extension.cmd", () => {
    vscode.tasks.executeTask(
      new vscode.Task(
        { type: "shell" },
        vscode.TaskScope.Workspace,
        "hello-extension",
        "Rendering Matrix",
        new vscode.ShellExecution(
          "node D:\\AlexFazio64\\Dev\\js\\VSCode-Extension-Playground\\src\\script.js"
        )
      )
    );
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(time);
  context.subscriptions.push(matrix);
}

export function deactivate() {
  console.log("deactivated");
}
