(function () {
  const vscode = acquireVsCodeApi();
  // const oldState = vscode.getState() || { count: 0 };

  document.getElementById("render").addEventListener("click", () => {
    // TODO: fix concurrency issue
    sayHello(document.getElementById("code").value);
  });

  function sayHello(msg) {
    vscode.postMessage({ type: "hello", value: msg });
  }
})();
