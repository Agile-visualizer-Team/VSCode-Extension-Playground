(function () {
  const vscode = acquireVsCodeApi();

  const gif = document.getElementById("gif-btn");
  const save = document.getElementById("save-btn");
  const code_ta = document.getElementById("code");
  const sol_in = document.getElementById("sol-in");
  const solver_ta = document.getElementById("solver-ta");
  const program_ta = document.getElementById("program-ta");
  const output_ta = document.getElementById("output-ta");
  const chrome_ta = document.getElementById("chrome-ta");
  const image_ta = document.getElementById("image-ta");
  const template_ta = document.getElementById("template-ta");
  const config_ta = document.getElementById("config-ta");

  gif.addEventListener("click", () => {
    vscode.postMessage({ type: "gif" });
  });

  save.addEventListener("click", () => {
    vscode.postMessage({ type: "save", value: code_ta.value });
  });

  document.getElementById("run-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "run" });
  });

  document.getElementById("solver-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "solver" });
  });

  document.getElementById("program-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "program" });
  });

  document.getElementById("output-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "output" });
  });

  document.getElementById("chrome-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "chrome" });
  });

  document.getElementById("image-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "image" });
  });

  document.getElementById("template-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "template" });
  });

  document.getElementById("config-btn").addEventListener("click", () => {
    vscode.postMessage({ type: "config", value: config_ta.value });
  });

  sol_in.addEventListener("change", (_e) => {
    update();
  });

  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.type) {
      case "solver-back":
        solver_ta.value = message.value;
        break;
      case "program-back":
        program_ta.value = message.value;
        break;
      case "output-back":
        output_ta.value = message.value;
        break;
      case "chrome-back":
        chrome_ta.value = message.value;
        break;
      case "image-back":
        image_ta.value = message.value;
        break;
      case "template-back":
        template_ta.value = message.value;
        break;
    }

    if (message.type.endsWith("-back")) {
      update();
    }
  });

  function update() {
    let res = {};
    res["sol_num"] = sol_in.value;
    res["solver"] = solver_ta.value;
    res["template"] = template_ta.value;
    res["program"] = program_ta.value;
    res["out_dir"] = output_ta.value;
    res["img_dir"] = image_ta.value;
    res["chrome"] = chrome_ta.value;
    config_ta.value = JSON.stringify(res, null, 2);
  }
})();
