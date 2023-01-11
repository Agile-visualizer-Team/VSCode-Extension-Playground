import os
import re
import shutil

print("Compiling Svelte App...")

links = []
code = []
names = []

index = os.path.join(os.path.dirname(__file__), "svelte-app", "build", "index.html")
with open(index, "r") as f:
    data = f.read()
    links = re.findall(r'href="(.+?)"', data)
    links.pop(0)

count = 1
for link in links:
    template = "const <name> = webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, <path-arr>));"
    path_arr = link.split("/")
    path_arr.pop(0)

    if ".js" in path_arr[-1]:
        name = re.sub(r"-.+\.js$", ".js", path_arr[-1])
    elif ".css" in path_arr[-1]:
        name = re.sub(r"-.+\.css$", ".css", path_arr[-1])
    name = name.replace(".", "_")

    if "index" in name:
        name = name.replace("index", f"index_{count}")
        count += 1

    names.append("{" + name + "}")
    code.append(
        template.replace("<name>", name).replace(
            "<path-arr>", str(path_arr).replace("[", "").replace("]", "")
        )
    )

code.append(template.replace("<name>", "main_js").replace("<path-arr>", '"main.js"'))

replaced = ""
with open(index, "r+") as f:
    data = re.sub(r'<link rel="icon" href=".+?">', "", data)
    import_pattern = r'import { start } from "([^"]*)"'
    data = re.sub(import_pattern, r'import { start } from "${start_js}"', data)
    data = re.sub(r"</body>", r'<script src="${main_js}"></script></body>', data)
    data = re.sub("<head>.*?</head>", "<head>\n</head>", data, flags=re.DOTALL)
    names.pop()

    for name in names:
        if "css" in name:
            data = re.sub(
                r"</head>", f'<link rel="stylesheet" href="${name}">\n</head>', data
            )
        elif "js" in name:
            data = re.sub(
                r"</head>", f'<link rel="modulepreload" href="${name}">\n</head>', data
            )
    replaced = data

svelte = os.path.join(os.path.dirname(__file__), "svelte_build.ts")
os.remove(svelte)
with open(svelte, "w+") as f:
    signature = "import * as vscode from 'vscode';\nexport function getHtmlForWebview(webview: vscode.Webview, _extensionUri: vscode.Uri): string {"
    f.write(signature)

    for line in code:
        f.write(line)
    f.write("\nreturn `" + replaced + "`;}")
