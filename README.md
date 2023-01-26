# Visualizer ASP Extension User Manual
This extension allows you to convert your **ASP answer sets** into various **visualizations**. The available visualizations are:
* **Graph** - a graph representation of the answer set
* **Table** - a table representation of the answer set
* **Matrix** - a matrix representation of the answer set
* **Image** - a image representation of the answer set
* **Gif** - a gif representation of the image answer set

The visualizations have some customizations available, such as the ability to change the **color** of the nodes and edges, the **theme**, the **color** of the table, and the ability to choose to use images or colors for AS visualization.

## Installation dependencies
In order to use this extension, you need to have the following installed:
* [DLV Solver](https://dlv.demacs.unical.it/home)
* A Chromium-based browser (Google Chrome, Microsoft Edge, etc.)
* [FFMPEG](https://ffmpeg.org/) (optional for GIF creation)

# Getting Started:
## Extension Folder
At the start of the extension, you will be required to **create a folder for the extension's files**. This folder will be used to store the *configuration files* to run the extension with the same setting every time. 

[Screen pop-up]

## Initial configuration
After creating the folder for the extension's files, the extension will look like this:
[Screen initial setup] 

All the **mandatory** settings are marked with the *required* keyword. In particular, you need to set the following:

* \# of Answer Sets: the number of answer sets to be visualized
* Solver Path: the path to the DLV solver based on the operating system you are using. 
* Program File: the path to the ASP program file that contains the rules and facts to be visualized
* Output directory: the path to the folder where the visualizations will be saved
* Chrome Executable: the path to the Chrome executable file based on the Chromium-based browser you are using.
* Template file: the path to the file containing the mapping for the execution to be runned. It's suggested to **generate the file using the extension** appropriate menu.
    * The first dropdown menu allows you to choose the type of visualization you want to generate. 
    * Clicking **Save template file** will ask you a name for the json file that will be saved in the extension's folder. 
    * You can select this file in the dropdown menu to use it as a template for the execution.
    
    [Gif template file]
* Image Directory: the path to the folder containing the images to be used in the image visualization. It's suggested to name the files in the folder with the same name of the node in the ASP program in order to have an easier configuration.
    
After all of this you are ready to run the extension with the template file you just created. 


# Features:
The extension is capable of generating various visualizations, each with its own features. 

## Graph
In the **Graph** menu it's possible to *Add* or *Remove* nodes and edges from the visualization.

It's is possible to set the **name of the atom** and, for each atom, add or remove **arguments**.

For each node, it's possible to style it with different color for:
* Root node
* Leaves node
* Non root node

For each edge, you can set the **atom name** and the **attributes** for each edge. It's possible to setup the color of the edges and to choose if the edge is **oriented or not**.

[Screen graph]
## Table

In the **Table** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

In the Table Mapping section, it's possible to setup the columns of the table and set a name for each coulmn.

It's possible to style the table with:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

[Screen table]
## Matrix

In the **Matrix** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

Here is added the possiblity to choose the **number of answer sets to compute**.

It's possible to style the matrix with:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

[Screen matrix]


## Matrix Image

In the **Matrix Image** menu it's possible to *Add* or *Remove* cells from the visualization. It's mandatory to map the cells to the atoms in the ASP program.

Here is added the possiblity to choose the **number of answer sets to compute**.

It's possible to choose to use images or colors for the visualization.

 If you choose to use images, you need to set the **image directory** in the initial configuration. Plus, you need to set the **image name** for each attribute.

 If you choose to use colors, you need to set the **color** for each attribute.

It's possible to style the matrix changing:
* The color of the table's header
* The font size
* The font family
* The font weight
* Choose to use dark mode or not

It's possible to **check** the *Make image sequence* checkbox to prepare the files for the gif creation.

[Matrix images screen]


# Common issues 
Un poco
