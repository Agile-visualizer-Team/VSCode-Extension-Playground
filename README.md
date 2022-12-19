# Answer Set Programming Visualizer Extension

This extension allows you to visualize answer sets of ASP programs in VS Code.

### HOW TO
How to use pipeline:
- Create a pull request
  - Create a branch from master
  - Make changes
  - If you want to merge with master the last commit before push must be like this:
    git commit -m"This is a commit pull_request{
      title=title test:
      body=body pull request:
      reviewer=instafiore
    }"
    (All field are optional)
    or:
      git commit -m"This is a commit pull_request"
    for a default pull_request
    
    If you create a pull request manually you will have problem with publishing the new version on Github Packages.
    So: don't do this guys !!!

- Increment a specific package version
  If you want to bump a specific version on your project the commit message of merge action must be like this:
    - update_package_[ major | minor | patch ]
  Example:
    update_package_minor -> from 2.0.0 to 2.1.0
  The default action is ' update_package_patch ' 

  That's all. Ciao e buona giornata

## Requirements

- VS Code
- Node.js
- NPM

## Installation

```bash
git clone https://github.com/Agile-visualizer-Team/visualizer-asp.git
cd visualizer-asp
npm i
```

### Installing a single module

from the root directory of the project:

```bash
npm run i:<module-name>
```

### Installing all the modules

from the root directory of the project:

```bash
npm run install:all
```

## Building

All the compiled modules will be built (excluding test files) in the `dist` folder.

### Building the extension

from the root directory of the project:

```bash
npm run compile
```

or

```bash
npm run watch
```

### Building a single module

from the root directory of the project:

```bash
npm run b:<module-name>
```

### Building all the modules

from the root directory of the project:

```bash
npm run build:all
```

## Running the extension

- Build the extension using the instructions above
- Open `/src/main.ts` in the editor
- Press **F5** to start a new VSCode Development Window with the extension already loaded
- **CTRL+SHIFT+P** to open the command palette
- Write out the following commands to test it out:
  - *Hello World*
  - *Time*
- **CTRL+SHIFT+I** to open the VSCode developer console and see the output

## Testing the modules

from the root directory of the **module**

check the `package.json` file for the test scripts

### TODO

