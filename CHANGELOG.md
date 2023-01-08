# Change Log

All notable changes to "ASP Visualizer Extension" will be documented in this file.

## [Unreleased]

- Addition of keybindings for the commands
- Remotion of unused commands
- Cleaning of the code

## [1.0]

- Added UI for the creation of config files and running of the extension
- A bug has been found when trying to run the extension immediately after creating a config file. The extension will run after opening the UI again. This is due to sveltekit and will be fixed in a future release.
- It is still possible to run the extension without the UI by Running the command `ASP Visualizer: Run using config file` via the command palette.

## [0.4]

- Added config files for the extension
- Added check for existence of a workspace active in vscode
- Added creation of a local folder for the extension

## [0.3]

- Experimental version of matrix_visualization.ts integrated into the extension
- Removed node dependency for end users

## [0.2]

- Integrated external script to render the answersets as images using node.

## [0.1]

- Added a new command 'time.current' to display the current time.
