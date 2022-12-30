(function () {
  const vscode = acquireVsCodeApi();
  // const oldState = vscode.getState() || { count: 0 };

  // TODO find a way to link this script to sveltekit for interop
  document.querySelector(".add-color-button").addEventListener("click", () => {
    sayHello();
  });

  function sayHello() {
    vscode.postMessage({ type: "hello", value: "Hello from the webview" });
  }
})();
