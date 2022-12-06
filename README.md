# Answer Set Programming Visualizer Extension

This extension allows you to visualize answer sets of ASP programs in VS Code.

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

from the root directory of the __module__

check the `package.json` file for the test scripts

### TODO
