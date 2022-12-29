(function () {
  const vscode = acquireVsCodeApi();
  const oldState = vscode.getState() || { count: 0 };

  for (let i = 0; i < oldState.count; i++) {
    greet({ value: "pong!" });
  }

  document.querySelector(".add-color-button").addEventListener("click", () => {
    sayHello();
  });

  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.type) {
      case "pong": {
        greet(message);
        break;
      }
    }
  });

  function greet(message) {
    const p = document.createElement("p");
    p.textContent = message.value;
    document.body.appendChild(p);
    oldState.count++;
    vscode.setState({ count: oldState.count });
  }

  function sayHello() {
    vscode.postMessage({ type: "ping", value: "hellooooooo!" });
  }
})();
