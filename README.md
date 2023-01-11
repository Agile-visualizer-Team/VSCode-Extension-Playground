# Answer Set Programming Visualizer Extension

This extension allows you to visualize answer sets of ASP programs in VS Code.

## Requirements

- VS Code (1.73.0 and above)
- Node.js (18.13.0 and above)
- NPM (9.1.1)
- Any Chromium Browser (_Chrome recommended for image rendering_)
- Python3 (_integration of the webview with a simple script_)

## Installation

```bash
git clone https://github.com/Agile-visualizer-Team/visualizer-asp.git
cd visualizer-asp
npm i
```

### Installing on Windows

```bash
npm run install:all
```

### Installing on Linux

```bash
./install.sh
```

## Building

All the compiled modules will be built in the `dist` folder of the root.

### Building on Windows

From the root directory

```bash
npm run compile
```

or

```bash
npm run watch
```

### Building on Linux

```bash
./compile.sh
```

## Running the extension

- Build the extension
- Open `/src/main.ts` in the editor
- Press **F5** to start a new VSCode Development Window with the extension already loaded
- **CTRL+SHIFT+P** to open the command palette
- Type _`Hello World`_
  - it should show a popup notification greeting you
- **CTRL+SHIFT+I** to open the VSCode developer console and see the output

## Testing the modules

from the root directory of the **module**

check the `package.json` file for the test scripts

## Pipeline

### Creating a pull request

- Create a branch from master
- Commit any changes

  - If you want to merge with master, the last commit before the push must be like this:

    ```py
    git commit -m "This is a commit pull_request{
    title=title of the request:
    body=pull request body:
    reviewer=instafiore
    }"
    ```

    (All fields are optional)

  - or:

    ```py
    git commit -m"This is a commit pull_request"
    ```

    for a default pull_request.

**DON'T** create a pull requests manually.

### Incrementing versions

If you want to bump a specific version, the _commit message of merge action_ must include one of the following:

- update_package_major
- update_package_minor
- update_package_patch

Example:
update_package_minor -> from 2.0.0 to 2.1.0
The default action is 'update_package_patch'
