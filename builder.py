import os
import shutil

print("Copying Browser Files...")

shutil.rmtree(os.path.join(os.path.dirname(__file__), 'dist'), ignore_errors=True)
shutil.copytree(os.path.join(os.path.dirname(__file__), 'src', 'visualizer-graph', 'src',
                'cytoscape-snapper', 'browser'), os.path.join(os.path.dirname(__file__), 'dist', 'browser'))

if os.path.exists(os.path.join(os.path.dirname(__file__), "dist", "svelte")):
    shutil.rmtree(os.path.join(os.path.dirname(__file__), "dist", "svelte"))

shutil.copytree(
    os.path.join(os.path.dirname(__file__), "src","extension-main", "svelte-app", "build"),
    os.path.join(os.path.dirname(__file__), "dist", "svelte"),
)

shutil.copyfile(
    os.path.join(os.path.dirname(__file__), "src","extension-main", "main.js"),
    os.path.join(os.path.dirname(__file__), "dist", "svelte", "main.js"),
)

for root, dirs, files in os.walk(
    os.path.join(os.path.dirname(__file__), "dist", "svelte")
):
    for file in files:
        if file.endswith(".png") or file.endswith(".json"):
            os.remove(os.path.join(root, file))

globalcss = os.path.join(
    os.path.dirname(__file__), "dist", "svelte", "global.css"
)
with open(globalcss, "r+") as f:
    data = f.read()
    lines = data.splitlines()
    lines = lines[6:]
    data = " ".join(lines)

    f.seek(0)
    f.write(data)
    f.truncate()
