(function () {
  const vscode = acquireVsCodeApi();

  document.getElementById("render").addEventListener("click", () => {
    sayHello(document.getElementById("code").value);
  });

  function sayHello(msg) {
    vscode.postMessage({ type: "hello", value: msg });
  }
})();
